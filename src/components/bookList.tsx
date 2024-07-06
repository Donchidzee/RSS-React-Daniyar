import React from 'react';
import Book from '../interfaces/book';
import { monthConverter } from '../converters/monthConverter';
import './BookList.css';

type BookListProps = { books: Book[]; isLoading: boolean };

export default class BookList extends React.Component<BookListProps> {
  render() {
    if (this.props.isLoading == true) {
      return (
        <div className="loader-wrapper">
          <div className="loader"></div>
        </div>
      );
    } else {
      return (
        <div className="bookList">
          {this.props.books.map((book, index) => (
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
  }
}
