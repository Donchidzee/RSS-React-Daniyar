import React from 'react';
import { fetchBooksRequest, searchBooksRequest } from './api';
import SearchSection from './components/SearchSection';
import BookList from './components/BookList';
import ErrorBoundary from './components/ErrorBoundaries';
import ErrorTest from './components/ErrorTest';
import Book from './interfaces/book';
import './App.css';

export default class App extends React.Component {
  state = {
    books: [],
    searchValue: '',
    isLoading: false,
    isErrorOccurred: false,
  };

  async componentDidMount() {
    const lastSearchedValue = localStorage.getItem('lastSearchedValue')
      ? localStorage.getItem('lastSearchedValue')
      : '';
    await this.setState({ searchValue: lastSearchedValue });

    this.makeRequest();
  }

  handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = (event.target as HTMLInputElement).value;
    await this.setState({ searchValue: value });
  };

  handleKeyClick = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      this.makeRequest();
    }
  };

  handleSearchButtonClick = () => this.makeRequest();

  fakeError = () => {
    this.setState({ isErrorOccurred: true });
  };

  makeRequest = () => {
    this.setState({ searchValue: this.state.searchValue.trim() });
    if (this.state.searchValue == '') {
      this.getBooks({ search: false });
      localStorage.setItem('lastSearchedValue', '');
    } else {
      this.getBooks({ search: true });
    }
  };

  async getBooks({ search = false }: { search: boolean }) {
    this.setState({ isLoading: true });
    try {
      let fetchedBooks: Book[] = [];
      if (search) {
        localStorage.setItem('lastSearchedValue', this.state.searchValue);
        fetchedBooks = await searchBooksRequest(this.state.searchValue);
      } else {
        fetchedBooks = await fetchBooksRequest();
      }
      this.setState({ books: fetchedBooks });
    } catch (error) {
      this.setState({ error: (error as Error).message });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  render() {
    return (
      <ErrorBoundary>
        <div className="search-section">
          <SearchSection
            searchValue={this.state.searchValue}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyClick}
            handleClick={this.handleSearchButtonClick}
          />
          <button onClick={this.fakeError} className="error-button">
            Error
          </button>
        </div>
        <div className="results-section">
          <BookList books={this.state.books} isLoading={this.state.isLoading} />
        </div>
        {this.state.isErrorOccurred && <ErrorTest />}
      </ErrorBoundary>
    );
  }
}
