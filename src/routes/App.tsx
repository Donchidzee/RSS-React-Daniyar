import React, { useState, useEffect } from 'react';
import { useLocalStorage } from '../converters/useLocalStorage';
import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import SearchSection from '../components/SearchSection';
import BookList from '../components/BookList';
import ErrorBoundary from '../components/ErrorBoundaries';
import ErrorTest from '../components/ErrorTest';
import Pagination from '../components/Pagination';
import Book from '../interfaces/book';
import './App.css';
import { useSearchBookMutation } from '../services/booksApi';

export default function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchValue, setSearchValue] = useLocalStorage(
    'lastSearchedValue',
    ''
  );
  const [pagination, setPagination] = useState({
    pageNumber: 0,
    pageSize: 15,
    numberOfElements: 15,
    totalElements: 0,
    totalPages: 0,
    firstPage: true,
    lastPage: false,
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [searchBook, { data, isLoading, error }] = useSearchBookMutation();

  useEffect(() => {
    const pageNumber = parseInt(searchParams.get('page') || '0', 10);
    setPagination((prev) => ({ ...prev, pageNumber }));

    async function mountFetch() {
      try {
        await searchBook({
          body: localStorage.getItem('lastSearchedValue') || '',
          pagination: { pageNumber, pageSize: 15 },
        }).unwrap();
      } catch (e) {
        console.error('Failed to fetch books:', e);
      }
    }

    mountFetch();
  }, [searchParams, searchBook]);

  useEffect(() => {
    if (data) {
      setBooks(data.books);
      setPagination(data.page);
    }
  }, [data]);

  const searchBooks = async () => {
    setPagination((prev) => ({ ...prev, pageNumber: 0 }));
    setSearchParams({ page: '0' });

    try {
      await searchBook({
        body: searchValue,
        pagination: { pageNumber: 0, pageSize: 15 },
      }).unwrap();
    } catch (e) {
      console.error('Failed to search books:', e);
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
    const value = event.target.value;
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

  const [mockError, setMockError] = useState<boolean>(false);
  const fakeError = () => {
    setMockError(true);
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
        <BookList books={books} isLoading={isLoading} onClick={closeOutlet} />
        {!isLoading && books.length > 0 && (
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
      {(mockError || error) && <ErrorTest />}
    </ErrorBoundary>
  );
}
