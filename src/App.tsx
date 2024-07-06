import React from 'react';
import { fetchBooksRequest, searchBooksRequest } from './api';
import SearchSection from './components/SearchSection';
import BookList from './components/BookList';
import './App.css';

export default class App extends React.Component {
  state = { books: [], error: null, searchValue: '', isLoading: false };

  async componentDidMount() {
    const lastSearchedValue = localStorage.getItem('lastSearchedValue');
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

  makeRequest = () => {
    if (this.state.searchValue == '') {
      this.getBooks();
      localStorage.setItem('lastSearchedValue', '');
    } else {
      this.searchBooks();
    }
  };

  async getBooks() {
    this.setState({ isLoading: true });
    try {
      const fetchedBooks = await fetchBooksRequest();
      this.setState({ books: fetchedBooks });
    } catch (error) {
      this.setState({ error: (error as Error).message });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  async searchBooks() {
    localStorage.setItem('lastSearchedValue', this.state.searchValue);
    this.setState({ isLoading: true });
    try {
      const fetchedBooks = await searchBooksRequest(this.state.searchValue);
      this.setState({ books: fetchedBooks });
    } catch (error) {
      this.setState({ error: (error as Error).message });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  render() {
    if (this.state.error) {
      return <div>Error: {this.state.error}</div>;
    }
    return (
      <>
        <div className="search-section">
          <SearchSection
            searchValue={this.state.searchValue}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyClick}
            handleClick={this.handleSearchButtonClick}
          />
        </div>
        <div className="results-section">
          <BookList books={this.state.books} isLoading={this.state.isLoading} />
        </div>
      </>
    );
  }
}
