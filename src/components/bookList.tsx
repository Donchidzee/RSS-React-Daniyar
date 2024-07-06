import React from 'react';
import Book from '../interfaces/book';
import { monthConverter } from '../converters/monthConverter';
import './BookList.css';

type BooksProps = { books: Book[] };

export default class BookList extends React.Component<BooksProps> {
  render() {
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
