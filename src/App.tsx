import { useState, useEffect } from 'react';
import { fetchBooksRequest } from './api';
import { searchBooksRequest } from './api';
import Book from './interfaces/book';
import { BookList } from './components/bookList';
import './App.css';

function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const data = await fetchBooksRequest();
        setBooks(data);
      } catch (error) {
        setError((error as Error).message);
      }
    }
    fetchBooks();
  }, []);

  const [searchValue, setSearchValue] = useState('');
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue((event.target as HTMLInputElement).value);
  };

  async function searchBooks() {
    try {
      const data = await searchBooksRequest(searchValue);
      setBooks(data);
      console.log(books);
    } catch (error) {
      setError((error as Error).message);
    }
  }

  const handleKeyClick = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      searchBooks();
    }
  };
  const handleSearchButtonClick = () => searchBooks();

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="search-section">
        <div className="search-section__container">
          <input
            onChange={handleChange}
            onKeyDown={handleKeyClick}
            type="text"
            placeholder="Which book are you looking for?"
          />
          <button onClick={handleSearchButtonClick}>Search</button>
        </div>
      </div>
      <div className="results-section">
        <BookList books={books} />
      </div>
    </>
  );
}

export default App;
