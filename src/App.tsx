import React from 'react';
import { useState, useEffect } from 'react';
import { searchBooksRequest } from './api';
import SearchSection from './components/SearchSection';
import BookList from './components/BookList';
import ErrorBoundary from './components/ErrorBoundaries';
import ErrorTest from './components/ErrorTest';
import Book from './interfaces/book';
import './App.css';

export default function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchValue, setSearchValue] = useState(() => {
    const lastSearchedValue = localStorage.getItem('lastSearchedValue');
    return lastSearchedValue || '';
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function mountFetch() {
      setLoading(true);
      try {
        const fetchedBooks = await searchBooksRequest(
          localStorage.getItem('lastSearchedValue') || ''
        );
        setBooks(fetchedBooks);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    }
    mountFetch();
  }, []);

  const searchBooks = async () => {
    setLoading(true);
    try {
      localStorage.setItem('lastSearchedValue', searchValue);
      const fetchedBooks = await searchBooksRequest(searchValue);
      setBooks(fetchedBooks);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = (event.target as HTMLInputElement).value;
    setSearchValue(value);
  };

  const handleKeyClick = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      searchBooks();
    }
  };

  const handleSearchButtonClick = () => searchBooks();

  const fakeError = () => {
    setError('Error');
  };

  return (
    <ErrorBoundary>
      <div className="search-section">
        <SearchSection
          searchValue={searchValue}
          onChange={handleChange}
          onKeyDown={handleKeyClick}
          handleClick={handleSearchButtonClick}
        />
        <button onClick={fakeError} className="error-button">
          Error
        </button>
      </div>
      <div className="results-section">
        <BookList books={books} isLoading={loading} />
      </div>
      {error && <ErrorTest />}
    </ErrorBoundary>
  );
}
