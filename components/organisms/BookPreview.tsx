import { Fragment, useState } from "react";
import clsx from "clsx";
import { format } from "date-fns";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Radio from "@material-ui/core/Radio";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import { makeStyles } from "@material-ui/core/styles";
import Video from "$organisms/Video";
import CourseChip from "$atoms/CourseChip";
import Item from "$atoms/Item";
import BookItemDialog from "$organisms/BookItemDialog";
import useCardStyle from "styles/card";
import { BookSchema } from "$server/models/book";
import { TopicSchema } from "$server/models/topic";
import { primary } from "theme/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
  },
  left: {
    flex: 1,
  },
  right: {
    flexShrink: 0,
    width: "30%",
  },
  title: {
    display: "flex",
    alignItems: "center",
  },
  checkBox: {
    marginLeft: theme.spacing(-1.5),
  },
  chips: {
    "& > *": {
      marginRight: theme.spacing(1.75),
      marginBottom: theme.spacing(1),
    },
  },
  items: {
    "& > *": {
      display: "inline-block",
      marginRight: theme.spacing(1.75),
      marginBottom: theme.spacing(1),
    },
  },
  selected: {
    backgroundColor: primary[50],
  },
}));

type Props = Parameters<typeof Radio>[0] & {
  book: BookSchema;
  onEditClick?: ((book: BookSchema) => void) | false | undefined;
};

export default function BookPreview(props: Props) {
  const cardClasses = useCardStyle();
  const classes = useStyles();
  const { book, onEditClick, checked, ...radioProps } = props;
  const [topic] = useState<TopicSchema | undefined>(
    book.sections[0]?.topics[0]
  );
  const [open, setOpen] = useState(false);
  const handleInfoClick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handle = (handler?: (book: BookSchema) => void) => () => {
    handler?.(book);
  };
  return (
    <Card
      classes={cardClasses}
      className={clsx(classes.root, { [classes.selected]: checked })}
    >
      <div className={classes.left}>
        <Typography variant="h6" className={classes.title}>
          <Radio
            className={classes.checkBox}
            color="primary"
            checked={checked}
            {...radioProps}
          />
          {book.name}
          <IconButton onClick={handleInfoClick}>
            <InfoOutlinedIcon />
          </IconButton>
          {onEditClick && (
            <IconButton color="primary" onClick={handle(onEditClick)}>
              <EditOutlinedIcon />
            </IconButton>
          )}
        </Typography>
        <div className={classes.chips}>
          {book.ltiResourceLinks.map((ltiResourceLink) => (
            <CourseChip
              key={ltiResourceLink.contextId}
              ltiResourceLink={ltiResourceLink}
            />
          ))}
        </div>
        <div className={classes.items}>
          <Item itemKey="作成日" value={format(book.createdAt, "yyyy.MM.dd")} />
          <Item itemKey="更新日" value={format(book.updatedAt, "yyyy.MM.dd")} />
          <Item itemKey="著者" value={book.author.name} />
        </div>
        {book.sections.map((section, sectionIndex) => (
          <Fragment key={section.id}>
            {section.name && (
              <p>
                {sectionIndex + 1} {section.name}
              </p>
            )}
            {section.topics.map((topic, topicIndex) => (
              <p key={topic.id}>
                {sectionIndex + 1}
                {section.name && `.${topicIndex + 1}`} {topic.name}
              </p>
            ))}
          </Fragment>
        ))}
        <Button size="small" color="primary">
          もっと詳しく...
        </Button>
      </div>
      <div className={classes.right}>
        {topic && "providerUrl" in topic.resource && (
          <Video {...topic.resource} />
        )}
      </div>
      {book && <BookItemDialog open={open} onClose={handleClose} book={book} />}
    </Card>
  );
}
