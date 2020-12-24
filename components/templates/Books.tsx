import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import AddIcon from "@material-ui/icons/Add";
import LinkIcon from "@material-ui/icons/Link";
import BookAccordion from "$organisms/BookAccordion";
import SortSelect from "$atoms/SortSelect";
import SearchTextField from "$atoms/SearchTextField";
import { Book } from "types/book";
import useContainerStyles from "styles/container";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4),
  },
  line: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    "& > *": {
      marginRight: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
  },
  title: {
    marginBottom: theme.spacing(4),
    "& > *": {
      marginRight: theme.spacing(1),
    },
  },
  icon: {
    marginRight: theme.spacing(0.5),
  },
}));

type Props = {
  books: Book[];
  onBookClick(book: Book): void;
  onBookNewClick(): void;
};

export default function Books(props: Props) {
  const { books, onBookClick, onBookNewClick } = props;
  const handleTopicClick = (book: Book) => () => onBookClick(book);
  const handleBookNewClick = () => onBookNewClick();
  const classes = useStyles();
  const containerClasses = useContainerStyles();
  return (
    <Container
      classes={containerClasses}
      className={classes.container}
      maxWidth="md"
    >
      <Typography className={classes.title} variant="h4" gutterBottom={true}>
        マイブック
        <Button size="small" color="primary" onClick={handleBookNewClick}>
          <AddIcon className={classes.icon} />
          ブックの作成
        </Button>
        <Button size="small" color="primary">
          <LinkIcon className={classes.icon} />
          LTIリンク「〇〇」と連携
        </Button>
      </Typography>
      <div className={classes.line}>
        <SortSelect />
        <SearchTextField placeholder="ブック・トピック検索" />
      </div>
      <div>
        {books.map((book) => (
          <BookAccordion
            key={book.id}
            book={book}
            onTopicClick={handleTopicClick(book)}
          />
        ))}
      </div>
    </Container>
  );
}