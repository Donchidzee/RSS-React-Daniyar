import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { useFetchBookQuery } from '../services/booksApi';
import './BookInfo.css';
import { monthConverter } from '../converters/monthConverter';
import CloseIcon from '../assets/close.svg';

interface Author {
  uid: string;
  name: string;
}

interface Publisher {
  uid: string;
  name: string;
}

interface Character {
  uid: string;
  name: string;
}

export default function BookInfo() {
  const { bookId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const { data, error, isLoading } = useFetchBookQuery(bookId ? bookId : '');

  const closeOutlet = () => {
    navigate(`/?page=${parseInt(searchParams.get('page') || '0', 10)}`, {
      replace: true,
    });
  };

  if (error) {
    return <h2>{(error as Error).message}</h2>;
  } else if (isLoading) {
    return (
      <div className="loader-wrapper" role="loader">
        <div className="loader"></div>
      </div>
    );
  } else {
    return (
      <div className="book-info">
        <h2 className="title">Book information</h2>
        <p>Name: "{data?.title}"</p>
        <p>
          Date of publishing: {monthConverter(data ? data.publishedMonth : 0)}{' '}
          {data?.publishedYear}
        </p>
        <p>Number of pages: {data?.numberOfPages}</p>
        {Boolean(data?.authors?.length) && (
          <p>
            Authors:{' '}
            {data?.authors?.length
              ? data?.authors.map((author: Author) => (
                  <span key={author.uid}>{author.name} </span>
                ))
              : ''}
          </p>
        )}

        {Boolean(data?.publishers?.length) && (
          <p>
            Publishers:{' '}
            {data?.publishers?.length
              ? data?.publishers.map((publisher: Publisher) => (
                  <span key={publisher.uid}>{publisher.name} </span>
                ))
              : ''}
          </p>
        )}

        {Boolean(data?.characters?.length) && (
          <p>
            Characters:{' '}
            {data?.characters
              ? data?.characters.map((character: Character) => (
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
