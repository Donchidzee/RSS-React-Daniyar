import React from 'react';
import Book from '../interfaces/book';
import './BookList.css';
import { monthConverter } from '../converters/monthConverter';
import { useSearchParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectBook, unselectBook } from '../slices/selectedBooksSlice';
import { RootState } from '../store';
import Flyout from './Flyout';
import { useTheme } from '../contexts/useTheme';

type BookListProps = {
  books: Book[];
  isLoading: boolean;
  onClick: React.MouseEventHandler<HTMLDivElement>;
};

export default function BookList(props: BookListProps) {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const selectedBooks = useSelector(
    (state: RootState) => state.selectedBooks.selectedBooks
  );
  const { theme } = useTheme();

  const handleCheckboxChange = (book: Book) => {
    const isSelected = selectedBooks.some(
      (selectedBook) => selectedBook.uid === book.uid
    );
    if (isSelected) {
      dispatch(unselectBook(book));
    } else {
      dispatch(selectBook(book));
    }
  };

  const isBookSelected = (book: Book) => {
    return selectedBooks.some((selectedBook) => selectedBook.uid === book.uid);
  };

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.stopPropagation();
  };

  const setIndex = (index: number) => {
    const page = parseInt(searchParams.get('page') || '0');
    const calculatedIndex = page * 15 + index;
    return calculatedIndex;
  };

  if (props.isLoading) {
    return (
      <div className="loader-wrapper" role="loader">
        <div className="loader"></div>
      </div>
    );
  } else if (props.books.length === 0) {
    return <div style={{ width: '100%' }}>No books found</div>;
  } else {
    return (
      <div id="sidebar" className="bookList" onClick={props.onClick}>
        {props.books.map((book, index) => (
          <div key={book.uid} className="container" role="listitem">
            <input
              type="checkbox"
              className="checkbox"
              checked={isBookSelected(book)}
              onChange={() => handleCheckboxChange(book)}
            />
            <div className="index">{setIndex(index + 1)}.</div>
            <NavLink
              onClick={handleClick}
              to={`/books/${book.uid}/?page=${parseInt(searchParams.get('page') || '0', 10)}`}
              className={({ isActive, isPending }) =>
                isActive
                  ? 'link active'
                  : isPending
                    ? 'link pending'
                    : `link ${theme}`
              }
            >
              <h2>{book.title}</h2>
            </NavLink>
            <div className="date">
              {monthConverter(book.publishedMonth)} {book.publishedYear}
            </div>
          </div>
        ))}
        <div className="flyout-wrapper">
          <Flyout />
        </div>
      </div>
    );
  }
}
