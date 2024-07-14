import { render, screen } from '@testing-library/react';
import BookResults from '../components/BookList';
import { MemoryRouter } from 'react-router-dom';

describe('BookResults Component', () => {
  test('renders the specified number of cards', () => {
    const books = [
      { uid: '1', title: 'Book 1', publishedMonth: 3, publishedYear: 2015 },
      { uid: '2', title: 'Book 2', publishedMonth: 3, publishedYear: 2015 },
    ];
    render(
      <MemoryRouter>
        <BookResults books={books} isLoading={false} onClick={() => {}} />
      </MemoryRouter>
    );

    const bookElements = screen.getAllByRole('listitem');
    expect(bookElements).toHaveLength(books.length);
  });

  test('displays appropriate message if no cards are present', () => {
    render(
      <MemoryRouter>
        <BookResults books={[]} isLoading={false} onClick={() => {}} />
      </MemoryRouter>
    );

    expect(screen.getByText('No books found')).toBeInTheDocument();
  });
});
