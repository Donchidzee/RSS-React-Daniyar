import Book from '../interfaces/book';
import './bookList.css';
import { monthConverter } from '../converters/monthConverter';

interface Props {
  books: Book[];
}

export function BookList(props: Props) {
  return (
    <div className="bookList">
      {props.books.map((book, index) => (
        <div key={book.uid} className="container">
          <div className="index">{index + 1}.</div>
          <h2>{book.title}</h2>
          <div className="date">
            {monthConverter(book.publishedMonth)} {book.publishedYear}
          </div>
        </div>
      ))}
    </div>
  );
}
