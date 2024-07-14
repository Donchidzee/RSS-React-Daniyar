import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Book from '../interfaces/book';
import { fetchBookRequest } from '../api';
import './BookInfo.css';
import { monthConverter } from '../converters/monthConverter';
import CloseIcon from '/close.svg';

export default function BookInfo() {
  const [book, setBook] = useState<Book>();
  const { bookId } = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function mountFetch() {
      try {
        if (bookId) {
          const fetchedBook = await fetchBookRequest(bookId);
          setBook(fetchedBook);
        }
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    }
    mountFetch();
  }, [bookId]);

  const closeOutlet = () => {
    navigate(`/`, { replace: true });
  };

  if (error) {
    return <h2>{error}</h2>;
  } else if (loading == true) {
    return (
      <div className="loader-wrapper">
        <div className="loader"></div>
      </div>
    );
  } else {
    return (
      <div className="book-info">
        <h2>Book information</h2>
        <p>Name: "{book?.title}"</p>
        <p>
          Date of publishing: {monthConverter(book ? book.publishedMonth : 0)}{' '}
          {book?.publishedYear}
        </p>
        <p>Number of pages: {book?.numberOfPages}</p>
        {Boolean(book?.authors?.length) && (
          <p>
            Authors:{' '}
            {book?.authors?.length
              ? book?.authors.map((author) => (
                  <span key={author.uid}>{author.name} </span>
                ))
              : ''}
          </p>
        )}

        {Boolean(book?.publishers?.length) && (
          <p>
            Publishers:{' '}
            {book?.publishers?.length
              ? book?.publishers.map((publisher) => (
                  <span key={publisher.uid}>{publisher.name} </span>
                ))
              : ''}
          </p>
        )}

        {Boolean(book?.characters?.length) && (
          <p>
            Characters:{' '}
            {book?.characters
              ? book?.characters.map((character) => (
                  <span key={character.uid}>{character.name} </span>
                ))
              : ''}
          </p>
        )}

        <img
          onClick={closeOutlet}
          src={CloseIcon}
          alt="Close"
          width={30}
          height={30}
          className="close-icon"
        />
      </div>
    );
  }
}
