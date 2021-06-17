import { ReactNode, MouseEvent } from "react";
import TreeItem from "@material-ui/lab/TreeItem";
import Checkbox from "@material-ui/core/Checkbox";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "$atoms/IconButton";
import SharedIndicator from "$atoms/SharedIndicator";
import useTreeItemStyle from "$styles/treeItem";
import { SectionSchema } from "$server/models/book/section";
import { TopicSchema } from "$server/models/topic";
import { isNamedSection, getOutlineNumber } from "$utils/outline";

const useStyles = makeStyles((theme) => ({
  shared: {
    margin: theme.spacing(0, 0.5),
  },
}));

type SectionProps = {
  bookId: number;
  section: Pick<SectionSchema, "id" | "name" | "topics">;
  sectionIndex: number;
  children: ReactNode;
  onTreeChange?(nodeId: string): void;
  selectedIndexes?: Set<string>;
};

function SectionTree({
  bookId,
  section,
  sectionIndex,
  // TODO: セクション単位での再利用の実装
  // onTreeChange,
  // selectedIndexes,
  children,
}: SectionProps) {
  const treeItemClasses = useTreeItemStyle();
  const nodeId = `${bookId}-${section.id}`;
  /* TODO: セクション単位での再利用の実装
  const handleChange = (handler?: (nodeId: string) => void) => () => {
    handler?.(nodeId);
  };
  */
  if (!isNamedSection(section)) return <>{children}</>;
  return (
    <TreeItem
      nodeId={nodeId}
      classes={treeItemClasses}
      label={
        <>
          {/* TODO: セクション単位での再利用の実装
          onTreeChange && (
            <Checkbox
              checked={selectedIndexes?.has(nodeId)}
              color="primary"
              size="small"
              onChange={handleChange(onTreeChange)}
              onClick={(event) => {
                event.stopPropagation();
              }}
            />
          )*/}
          {getOutlineNumber(section, sectionIndex) + " "}
          {section.name ?? "無名のセクション"}
        </>
      }
    >
      {children}
    </TreeItem>
  );
}

type Props = {
  bookId?: number;
  sections: SectionSchema[];
  onItemClick?(index: ItemIndex): void;
  onItemPreviewClick?(index: ItemIndex): void;
  onItemEditClick?(index: ItemIndex): void;
  onTreeChange?(nodeId: string): void;
  selectedIndexes?: Set<string>;
  isTopicEditable?(topic: TopicSchema): boolean | undefined;
};

export default function BookChildrenTree(props: Props) {
  const {
    bookId = 0,
    sections,
    onItemClick,
    onItemPreviewClick,
    onItemEditClick,
    onTreeChange,
    selectedIndexes,
    isTopicEditable,
  } = props;
  const classes = useStyles();
  const treeItemClasses = useTreeItemStyle();
  return (
    <>
      {sections.map((section, sectionIndex) => (
        <SectionTree
          key={section.id}
          bookId={bookId}
          section={section}
          sectionIndex={sectionIndex}
          onTreeChange={onTreeChange}
        >
          {section.topics.map((topic, topicIndex) => {
            const nodeId = `${bookId}-${section.id}-${topic.id}:${topicIndex}`;
            const handle = (handler?: (index: ItemIndex) => void) => (
              event: MouseEvent<HTMLElement>
            ) => {
              event.stopPropagation();
              handler?.([sectionIndex, topicIndex]);
            };
            const handleChange = (handler?: (nodeId: string) => void) => () => {
              handler?.(nodeId);
            };
            return (
              <TreeItem
                key={nodeId}
                nodeId={nodeId}
                classes={treeItemClasses}
                label={
                  <>
                    {onTreeChange && (
                      <Checkbox
                        checked={selectedIndexes?.has(nodeId)}
                        color="primary"
                        size="small"
                        onChange={handleChange(onTreeChange)}
                        onClick={(event) => {
                          event.stopPropagation();
                        }}
                      />
                    )}
                    {getOutlineNumber(section, sectionIndex, topicIndex) + " "}
                    {topic.name}
                    {topic.shared && (
                      <SharedIndicator className={classes.shared} />
                    )}
                    <IconButton
                      tooltipProps={{ title: "トピックをプレビュー" }}
                      size="small"
                      color="primary"
                      onClick={handle(onItemPreviewClick)}
                    >
                      <VisibilityOutlinedIcon />
                    </IconButton>
                    {isTopicEditable?.(topic) && onItemEditClick && (
                      <IconButton
                        tooltipProps={{ title: "トピックを編集" }}
                        size="small"
                        color="primary"
                        onClick={handle(onItemEditClick)}
                      >
                        <EditOutlinedIcon />
                      </IconButton>
                    )}
                  </>
                }
                onClick={handle(onItemClick)}
              />
            );
          })}
        </SectionTree>
      ))}
    </>
  );
}
