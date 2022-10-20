import type { Dispatch, SetStateAction } from "react";
import TreeItem from "@mui/lab/TreeItem";
import Checkbox from "@mui/material/Checkbox";
import PreviewButton from "$atoms/PreviewButton";
import EditButton from "$atoms/EditButton";
import SharedIndicator from "$atoms/SharedIndicator";
import useTreeItemStyle from "$styles/treeItem";
import type { IsContentEditable } from "$server/models/content";
import type { LtiContextSchema } from "$server/models/ltiContext";
import type { LinkSchema } from "$server/models/link/content";
import type { BookSchema } from "$server/models/book";
import theme from "$theme";
import { useSessionAtom } from "$store/session";
import { isDisplayableBook } from "$utils/displayableBook";

type Props = {
  oauthClientId: string;
  ltiContext: LtiContextSchema;
  links: Array<LinkSchema>;
  selected: Set<string>;
  select: Dispatch<SetStateAction<Set<string>>>;
  onTreeChange?(
    link: Pick<LinkSchema, "oauthClientId" | "ltiContext" | "ltiResourceLink">,
    checked: boolean
  ): void;
  onBookPreviewClick?(book: Pick<BookSchema, "id">): void;
  onBookEditClick?(book: Pick<BookSchema, "id" | "authors">): void;
  isContentEditable?: IsContentEditable;
};

type LinksTreeProps = {
  links: Array<LinkSchema>;
  selected: Set<string>;
  select: Dispatch<SetStateAction<Set<string>>>;
  onTreeChange?(
    link: Pick<LinkSchema, "oauthClientId" | "ltiContext" | "ltiResourceLink">,
    checked: boolean
  ): void;
  onBookPreviewClick?(book: Pick<BookSchema, "id">): void;
  onBookEditClick?(book: Pick<BookSchema, "id" | "authors">): void;
  isContentEditable?: IsContentEditable;
};

function LinksTree({
  links,
  selected,
  select,
  onTreeChange,
  onBookPreviewClick,
  onBookEditClick,
  isContentEditable,
}: LinksTreeProps) {
  const { session } = useSessionAtom();
  return (
    <>
      {links.map((link) => {
        const nodeId = [
          link.oauthClientId,
          link.ltiContext.id,
          link.ltiResourceLink.id,
        ]
          .map(encodeURIComponent)
          .join(":");

        return (
          <TreeItem
            key={nodeId}
            nodeId={nodeId}
            onClick={(event) => {
              event.stopPropagation();
              (
                event.currentTarget?.querySelector(
                  `input[type="checkbox"]`
                ) as HTMLInputElement | null
              )?.click();
            }}
            label={
              <>
                {onTreeChange && (
                  <Checkbox
                    checked={selected.has(JSON.stringify(link))}
                    color="primary"
                    size="small"
                    onClick={(event) => {
                      event.stopPropagation();
                    }}
                    onChange={(event, checked) => {
                      event.stopPropagation();
                      select((selected) => {
                        const json = JSON.stringify(link);
                        if (checked) selected.add(json);
                        else selected.delete(json);
                        return new Set(selected);
                      });
                      onTreeChange(link, checked);
                    }}
                  />
                )}
                {link.ltiResourceLink.title &&
                  `(${link.ltiResourceLink.title}) → `}
                {link.book.name}
                {link.book.shared && (
                  <SharedIndicator sx={{ margin: theme.spacing(-0.5, 0.5) }} />
                )}
                {isDisplayableBook(
                  link.book,
                  isContentEditable,
                  session?.ltiResourceLink ?? undefined
                ) && (
                  <PreviewButton
                    variant="book"
                    onClick={(event) => {
                      event.stopPropagation();
                      onBookPreviewClick?.(link.book);
                    }}
                  />
                )}
                {isContentEditable?.(link.book) && (
                  <EditButton
                    variant="book"
                    onClick={(event) => {
                      event.stopPropagation();
                      onBookEditClick?.(link.book);
                    }}
                  />
                )}
              </>
            }
          />
        );
      })}
    </>
  );
}

export default function CourseTree(props: Props) {
  const {
    oauthClientId,
    ltiContext,
    links,
    selected,
    select,
    onTreeChange,
    onBookPreviewClick,
    onBookEditClick,
    isContentEditable,
  } = props;
  const treeItemClasses = useTreeItemStyle();
  const nodeId = [oauthClientId, ltiContext.id]
    .map(encodeURIComponent)
    .join(":");
  const checked = links.every((link) => selected.has(JSON.stringify(link)));
  const indeterminate =
    !checked && links.some((link) => selected.has(JSON.stringify(link)));

  return (
    <TreeItem
      nodeId={nodeId}
      classes={treeItemClasses}
      label={
        <>
          {onTreeChange && (
            <Checkbox
              checked={checked}
              indeterminate={indeterminate}
              color="primary"
              size="small"
              onClick={(e) => {
                // NOTE: TreeItemの展開をさせない
                e.stopPropagation();
              }}
              onChange={(event, checked) => {
                event.stopPropagation();
                select((selected) => {
                  const jsonl = links.map((link) => JSON.stringify(link));
                  if (checked) jsonl.forEach((json) => selected.add(json));
                  else jsonl.forEach((json) => selected.delete(json));
                  return new Set(selected);
                });
                links.forEach((link) => {
                  onTreeChange(link, checked);
                });
              }}
            />
          )}
          {ltiContext.title}
        </>
      }
    >
      <LinksTree
        links={links}
        selected={selected}
        select={select}
        onTreeChange={onTreeChange}
        onBookPreviewClick={onBookPreviewClick}
        onBookEditClick={onBookEditClick}
        isContentEditable={isContentEditable}
      />
    </TreeItem>
  );
}