import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { unselectAllBooks } from '../slices/selectedBooksSlice';
import { useTheme } from '../contexts/useTheme';
import Book from '../interfaces/book';
import './Flyout.css';

const Flyout: React.FC = () => {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const selectedBooks = useSelector(
    (state: RootState) => state.selectedBooks.selectedBooks
  );
  const downloadLinkRef = useRef<HTMLAnchorElement | null>(null);

  const handleUnselectAll = () => {
    dispatch(unselectAllBooks());
  };

  const generateCsvContent = (books: Book[]) => {
    const csvRows = [
      ['Title', 'Description', 'Details URL', 'Published Date'],
      ...books.map((book) => [
        book.title,
        book.uid,
        `https://stapi.co/api/v2/rest/book?uid=${book.uid}`,
        `${book.publishedMonth}/${book.publishedYear}`,
      ]),
    ];

    return csvRows.map((row) => row.join(',')).join('\n');
  };

  const handleDownload = () => {
    const csvContent = generateCsvContent(selectedBooks);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    if (downloadLinkRef.current) {
      downloadLinkRef.current.href = url;
      downloadLinkRef.current.download = `${selectedBooks.length}_books.csv`;
      downloadLinkRef.current.click();
      URL.revokeObjectURL(url);
    }
  };

  if (selectedBooks.length === 0) {
    return null;
  }

  return (
    <div className={`flyout ${theme}`}>
      <p>{selectedBooks.length} items are selected</p>
      <button onClick={handleUnselectAll}>Unselect all</button>
      <button onClick={handleDownload}>Download</button>
      <a ref={downloadLinkRef} style={{ display: 'none' }}>
        Download Link
      </a>
    </div>
  );
};

export default Flyout;
