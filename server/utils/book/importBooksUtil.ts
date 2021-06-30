import fs from "fs";
import path from "path";
import unzipper from "unzipper";
// error  Could not find a declaration file for module 'recursive-readdir-synchronous'.
// './node_modules/recursive-readdir-synchronous/index.js' implicitly has an 'any' type.
// eslint-disable-next-line tsc/config
import recursive from "recursive-readdir-synchronous";
import dateFormat from "dateformat";
import { Buffer } from "buffer";
import scp from "node-scp";

import { validate, ValidationError } from "class-validator";
import { UserSchema } from "$server/models/user";
import { BookSchema } from "$server/models/book";
import {
  BooksImportParams,
  BooksImportResult,
  ImportTopic,
  ImportSection,
  ImportBook,
  ImportBooks,
} from "$server/validators/booksImportParams";
import prisma from "$server/utils/prisma";
import findBook from "./findBook";
import {
  NEXT_PUBLIC_API_BASE_PATH,
  API_BASE_PATH,
  OAUTH_CONSUMER_KEY,
  WOWZA_SCP_HOST,
  WOWZA_SCP_PORT,
  WOWZA_SCP_USERNAME,
  WOWZA_SCP_PASSWORD,
  WOWZA_SCP_SERVER_PATH,
} from "$server/utils/env";

async function importBooksUtil(
  authorId: UserSchema["id"],
  params: BooksImportParams
): Promise<BooksImportResult> {
  const util = new ImportBooksUtil(authorId, params);
  await util.importBooks();
  return util.result();
}

class ImportBooksUtil {
  authorId: UserSchema["id"];
  params: BooksImportParams;
  books: BookSchema[];
  errors: string[];
  timeRequired: number;
  tmpdir?: string;
  unzippedFiles: string[];

  constructor(authorId: UserSchema["id"], params: BooksImportParams) {
    this.authorId = authorId;
    this.params = params;
    this.books = [];
    this.errors = [];
    this.timeRequired = 0;
    this.unzippedFiles = [];
  }

  async importBooks() {
    try {
      const importBooks = ImportBooks.init(await this.parseJsonFromFile());
      if (this.errors.length) return;

      const results = await validate(importBooks, {
        whitelist: true,
        forbidNonWhitelisted: true,
      });
      this.parseError(results);
      if (this.errors.length) return;

      if (this.tmpdir) {
        await this.uploadFiles(importBooks);
      }
      if (this.errors.length) return;

      const transactions = [];
      for (const importBook of importBooks.books) {
        transactions.push(
          prisma.book.create({ data: this.getBookProps(importBook) })
        );
      }
      if (this.errors.length) return;

      for (const book of await prisma.$transaction(transactions)) {
        const res = await findBook(book.id);
        if (res) this.books.push(res as BookSchema);
      }
    } catch (e) {
      console.error(e);
      this.errors.push(...(Array.isArray(e) ? e : [e.toString()]));
    } finally {
      this.cleanUp();
    }
  }

  parseError(results: ValidationError[], parentLabel = "") {
    for (const result of results) {
      const label =
        parentLabel +
        (Number.isNaN(Number(result.property))
          ? parentLabel
            ? `.${result.property}`
            : result.property
          : `[${result.property}]`);
      for (const constraint in result.constraints) {
        if (constraint == "whitelistValidation") {
          this.errors.push(
            `${parentLabel}: 不明なプロパティ "${result.property}" が含まれています。`
          );
        } else if (constraint == "nestedValidation") {
          this.errors.push(`${parentLabel}: ${result.constraints[constraint]}`);
        } else {
          this.errors.push(`${label}: ${result.constraints[constraint]}`);
        }
      }
      if (result.children) {
        this.parseError(result.children, label);
      }
    }
  }

  result() {
    const result: BooksImportResult = {
      books: this.books,
      errors: this.errors,
    };
    return result;
  }

  cleanUp() {
    if (this.tmpdir) {
      fs.rmdirSync(this.tmpdir, { recursive: true });
    }
  }

  async parseJson() {
    if (this.params.file) {
      return await this.parseJsonFromFile();
    }

    try {
      return JSON.parse(this.params.json || "");
    } catch (e) {
      this.errors.push(`入力されたjsonテキストを解釈できません。\n${e}`);
      return {};
    }
  }

  parseJsonFromFile() {
    if (!this.params.file) {
      this.errors.push(`ファイルをアップロードしてください。`);
      return {};
    }

    this.tmpdir = fs.mkdtempSync("/tmp/chibichilo-import-");
    const file = `${this.tmpdir}/file`;
    fs.writeFileSync(file, Buffer.from(this.params.file as string, "base64"));

    return new Promise((resolve) => {
      fs.createReadStream(file)
        .pipe(unzipper.Extract({ path: this.tmpdir }))
        .on("close", () => {
          this.unzippedFiles = recursive(this.tmpdir);
          const jsonfiles: string[] = this.unzippedFiles.filter((filename) =>
            filename.toLowerCase().endsWith(".json")
          );
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const jsons: any[] = [];
          if (jsonfiles.length) {
            for (const jsonfile of jsonfiles) {
              try {
                const json = JSON.parse(fs.readFileSync(jsonfile).toString());
                jsons.push(...(Array.isArray(json) ? json : [json]));
              } catch (e) {
                this.errors.push(
                  `入力されたjsonテキストを解釈できません。\n${e}`
                );
              }
            }
          } else {
            this.errors.push("jsonファイルがありません。");
          }
          if (this.errors.length) {
            resolve({});
          } else {
            resolve(jsons);
          }
        })
        .on("error", (error) => {
          try {
            resolve(JSON.parse(fs.readFileSync(file).toString()));
          } catch (e) {
            this.errors.push(`ファイルがzipではありません。\n${error}`);
            resolve({});
          }
        });
    });
  }

  async uploadFiles(importBooks: ImportBooks) {
    const uploadroot = fs.mkdtempSync(`${this.tmpdir}/upload-wowza-`);
    // recursive:true が利かない https://github.com/nodejs/node/issues/27293
    const uploaddomain = fs.mkdirSync(`${uploadroot}/${OAUTH_CONSUMER_KEY}`, {
      recursive: true,
    });
    const uploadauthor = fs.mkdirSync(`${uploaddomain}/${this.authorId}`, {
      recursive: true,
    });
    const uploaddir = fs.mkdtempSync(
      `${uploadauthor}/${dateFormat(new Date(), "yyyymmdd-HHMM")}-`
    );
    const uploadsubdir = uploaddir.substring(uploadroot.length);

    const filenames = [];
    for (const importBook of importBooks.books) {
      for (const bookSection of importBook.sections) {
        for (const sectionTopic of bookSection.topics) {
          if (sectionTopic.resource.file) {
            if (sectionTopic.resource.providerUrl != "https://www.wowza.com/") {
              this.errors.push(
                `${sectionTopic.resource.providerUrl} へのアップロードは対応していません。`
              );
            }

            const filename = path.basename(sectionTopic.resource.file);
            if (filenames.indexOf(filename) > -1) {
              this.errors.push(
                `ファイル ${filename} が重複しています。(サブフォルダはまとめられます)`
              );
            }

            const fullpath = this.unzippedFiles.find(
              (element) => path.basename(element) == filename
            );
            if (!fullpath) {
              this.errors.push(`ファイル ${filename} がありません。`);
              continue;
            }

            filenames.push(filename);
            sectionTopic.resource.url = `${NEXT_PUBLIC_API_BASE_PATH}${API_BASE_PATH}/wowza${uploadsubdir}/${filename}`;
            fs.renameSync(fullpath, `${uploaddir}/${filename}`);
          }
        }
      }
    }
    if (this.errors.length) return;

    try {
      // error  This expression is not callable.
      // Type 'typeof import("./node_modules/node-scp/lib/index")' has no call signatures
      // eslint-disable-next-line tsc/config
      const client = await scp({
        host: WOWZA_SCP_HOST,
        port: WOWZA_SCP_PORT,
        username: WOWZA_SCP_USERNAME,
        password: WOWZA_SCP_PASSWORD,
        // privateKey: fs.readFileSync(WOWZA_SCP_PRIVATE_KEY),
        // passphrase: WOWZA_SCP_PASS_PHRASE,
      });
      await client.uploadDir(uploadroot, WOWZA_SCP_SERVER_PATH);
      client.close();
    } catch (e) {
      this.errors.push(`サーバーにアップロードできませんでした。\n${e}`);
    }
  }

  getBookProps(importBook: ImportBook) {
    const sections = [];
    for (const [index, bookSection] of importBook.sections.entries()) {
      sections.push(this.getSection(bookSection, index));
    }

    return {
      ...importBook,
      timeRequired: this.timeRequired,
      author: { connect: { id: this.authorId } },
      publishedAt: new Date(importBook.publishedAt),
      createdAt: new Date(importBook.createdAt),
      updatedAt: new Date(importBook.updatedAt),
      keywords: this.getKeywords(importBook.keywords),
      sections: { create: sections },
      ltiResourceLinks: {},
    };
  }

  getSection(bookSection: ImportSection, order: number) {
    const topicSections = [];
    for (const [index, sectionTopic] of bookSection.topics.entries()) {
      topicSections.push(this.getTopicSection(sectionTopic, index));
    }

    return {
      order,
      name: bookSection.name,
      topicSections: { create: topicSections },
    };
  }

  getTopicSection(sectionTopic: ImportTopic, order: number) {
    this.timeRequired += sectionTopic.timeRequired;

    const video = {
      create: {
        providerUrl: sectionTopic.resource.providerUrl,
        tracks: { create: sectionTopic.resource.tracks },
      },
    };

    const resource = {
      connectOrCreate: {
        create: {
          video,
          url: sectionTopic.resource.url,
          details: sectionTopic.resource.details,
        },
        where: { url: sectionTopic.resource.url },
      },
    };

    const topic = {
      ...sectionTopic,
      creator: { connect: { id: this.authorId } },
      createdAt: new Date(sectionTopic.createdAt),
      updatedAt: new Date(sectionTopic.updatedAt),
      keywords: this.getKeywords(sectionTopic.keywords),
      resource,
    };

    return { order, topic: { create: topic } };
  }

  getKeywords(keywords: string[]) {
    return {
      connectOrCreate: keywords.map((name) => {
        return { create: { name }, where: { name } };
      }),
    };
  }
}

export default importBooksUtil;
