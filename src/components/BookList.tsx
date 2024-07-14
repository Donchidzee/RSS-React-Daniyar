import Book from '../interfaces/book';
import './BookList.css';
import { monthConverter } from '../converters/monthConverter';
import { useSearchParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

type BookListProps = {
  books: Book[];
  isLoading: boolean;
  onClick: React.MouseEventHandler<HTMLDivElement>;
};

export default function BookList(props: BookListProps) {
  const [searchParams] = useSearchParams();

  const handleClick = (event: { stopPropagation: () => void }) => {
    event.stopPropagation();
  };

  if (props.isLoading == true) {
    return (
      <div className="loader-wrapper">
        <div className="loader"></div>
      </div>
    );
  } else {
    return (
      <div id="sidebar" className="bookList" onClick={props.onClick}>
        {props.books.map((book, index) => (
          <div key={book.uid} className="container">
            <div className="index">{index + 1}.</div>
            <NavLink
              onClick={handleClick}
              to={`/books/${book.uid}/?page=${parseInt(searchParams.get('page') || '0', 10)}`}
              className={({ isActive, isPending }) =>
                isActive ? 'link active' : isPending ? 'link pending' : 'link'
              }
            >
              <h2>{book.title}</h2>
            </NavLink>
            <div className="date">
              {monthConverter(book.publishedMonth)} {book.publishedYear}
            </div>
          </div>
        ))}
      </div>
    );
  }
}
