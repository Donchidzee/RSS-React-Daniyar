import React from 'react';
import { useState, useEffect } from 'react';
import { searchBooksRequest } from '../api';
import { useLocalStorage } from '../converters/useLocalStorage';
import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import SearchSection from '../components/SearchSection';
import BookList from '../components/BookList';
import ErrorBoundary from '../components/ErrorBoundaries';
import ErrorTest from '../components/ErrorTest';
import Pagination from '../components/Pagination';
import Book from '../interfaces/book';
import './App.css';

export default function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchValue, setSearchValue] = useLocalStorage(
    'lastSearchedValue',
    ''
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState('');
  const [pagination, setPagination] = useState({
    pageNumber: 0,
    pageSize: 20,
    numberOfElements: 20,
    totalElements: 0,
    totalPages: 0,
    firstPage: true,
    lastPage: false,
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const pageNumber = parseInt(searchParams.get('page') || '0', 10);
    setPagination((prev) => ({ ...prev, pageNumber: pageNumber }));

    async function mountFetch() {
      setLoading(true);
      try {
        const [fetchedBooks, page] = await searchBooksRequest(
          localStorage.getItem('lastSearchedValue') || '',
          {
            pageNumber: pageNumber,
            pageSize: 15,
          }
        );
        setBooks(fetchedBooks);
        setPagination(page);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    }
    mountFetch();
  }, [searchParams]);

  const searchBooks = async () => {
    setPagination((prev) => ({ ...prev, pageNumber: 0 }));
    setSearchParams({ page: '0' });

    setLoading(true);
    try {
      const [fetchedBooks, page] = await searchBooksRequest(searchValue, {
        pageNumber: 0,
        pageSize: 15,
      });
      setBooks(fetchedBooks);
      setPagination(page);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (pageNumber: number) => {
    setSearchParams({ page: pageNumber.toString() });
  };

  const closeOutlet = () => {
    navigate(`/?page=${parseInt(searchParams.get('page') || '0', 10)}`, {
      replace: true,
    });
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

  const handleSearchButtonClick = () => {
    localStorage.setItem('lastSearchedValue', searchValue);
    searchBooks();
  };

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
        <BookList books={books} isLoading={loading} onClick={closeOutlet} />
        {!loading && books.length && (
          <div className="pagination-wrapper">
            <Pagination
              pageNumber={pagination.pageNumber}
              totalPages={pagination.totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
        <div id="detail">
          <Outlet />
        </div>
      </div>
      {error && <ErrorTest />}
    </ErrorBoundary>
  );
}
