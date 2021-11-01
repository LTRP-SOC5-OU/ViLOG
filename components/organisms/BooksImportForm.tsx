import { Buffer } from "buffer";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import makeStyles from "@mui/styles/makeStyles";
import { useForm } from "react-hook-form";
import clsx from "clsx";
import TextField from "$atoms/TextField";
import useCardStyles from "styles/card";
import gray from "theme/colors/gray";
import type { AuthorSchema } from "$server/models/author";
import type { BooksImportParams } from "$server/models/booksImportParams";
import AuthorsInput from "$organisms/AuthorsInput";
import { NEXT_PUBLIC_API_BASE_PATH } from "$utils/env";
import { useAuthorsAtom } from "$store/authors";

const useStyles = makeStyles((theme) => ({
  margin: {
    "& > :not(:first-child)": {
      marginTop: theme.spacing(2.5),
    },
  },
  labelDescription: {
    marginLeft: theme.spacing(0.75),
    color: gray[600],
  },
}));

type Props = {
  className?: string;
  onSubmit?: (book: BooksImportParams) => void;
  onAuthorSubmit(author: Pick<AuthorSchema, "email">): void;
};

export default function BooksImportForm(props: Props) {
  const { className, onSubmit = () => undefined } = props;
  const cardClasses = useCardStyles();
  const classes = useStyles();
  const authorsInputProps = useAuthorsAtom();
  const wowzaUrl = "https://www.wowza.com/";
  const providers: { [key: string]: string } = { wowza: wowzaUrl };
  const defaultValues: BooksImportParams = {
    authors: [],
    json: "",
    file: "",
    provider: wowzaUrl,
    wowzaBaseUrl: `${NEXT_PUBLIC_API_BASE_PATH}/api/v2/wowza`,
  };
  const { handleSubmit, register } = useForm<BooksImportParams>({
    defaultValues,
  });

  return (
    <Card
      classes={cardClasses}
      className={clsx(classes.margin, className)}
      component="form"
      onSubmit={handleSubmit((values: BooksImportParams) => {
        values.authors = authorsInputProps.authors;

        if (values?.file?.length) {
          const reader = new FileReader();
          reader.addEventListener(
            "load",
            function () {
              onSubmit({
                ...values,
                file: Buffer.from(reader.result as ArrayBuffer).toString(
                  "base64"
                ),
              });
            },
            false
          );
          reader.readAsArrayBuffer(values.file[0] as unknown as File);
        } else {
          onSubmit({ ...values, file: undefined });
        }
      })}
    >
      <TextField label="file" type="file" inputProps={register("file")} />
      <TextField
        label="動画ファイルをアップロードするサービス"
        select
        defaultValue={defaultValues.provider}
        inputProps={register("provider")}
      >
        {Object.entries(providers).map(([label, value]) => (
          <MenuItem key={value} value={value}>
            {label}
          </MenuItem>
        ))}
      </TextField>
      <AuthorsInput
        {...authorsInputProps}
        onAuthorsUpdate={(authors) => {
          authorsInputProps.updateState({ authors });
        }}
        onAuthorSubmit={props.onAuthorSubmit}
      />
      <Button variant="contained" color="primary" type="submit">
        インポート
      </Button>
    </Card>
  );
}
