import React from 'react';
import { fetchBooksRequest } from './Api';
import { searchBooksRequest } from './Api';
import BookList from './components/BookList';
import './App.css';

export default class App extends React.Component {
  state = { books: [], error: null, searchValue: '' };

  async componentDidMount() {
    try {
      const fetchedBooks = await fetchBooksRequest();
      this.setState({ books: fetchedBooks });
    } catch (error) {
      this.setState({ error: (error as Error).message });
    }
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchValue: (event.target as HTMLInputElement).value });
  };

  async searchBooks() {
    try {
      const fetchedBooks = await searchBooksRequest(this.state.searchValue);
      this.setState({ books: fetchedBooks });
    } catch (error) {
      this.setState({ error: (error as Error).message });
    }
  }

  handleKeyClick = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      this.searchBooks();
    }
  };
  handleSearchButtonClick = () => this.searchBooks();

  render() {
    if (this.state.error) {
      return <div>Error: {this.state.error}</div>;
    }
    return (
      <>
        <div className="search-section">
          <div className="search-section__container">
            <input
              onChange={this.handleChange}
              onKeyDown={this.handleKeyClick}
              type="text"
              placeholder="Which book are you looking for?"
            />
            <button onClick={this.handleSearchButtonClick}>Search</button>
          </div>
        </div>
        <div className="results-section">
          <BookList books={this.state.books} />
        </div>
      </>
    );
  }
}
