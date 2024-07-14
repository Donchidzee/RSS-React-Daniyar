import { render, screen } from '@testing-library/react';
import BookList from '../components/BookList';
import { MemoryRouter } from 'react-router-dom';

const mockBooks = [
  { uid: '1', title: 'Book One', publishedMonth: 1, publishedYear: 2020 },
  { uid: '2', title: 'Book Two', publishedMonth: 2, publishedYear: 2021 },
];

describe('BookList', () => {
  test('renders the specified number of books', () => {
    render(
      <MemoryRouter>
        <BookList books={mockBooks} isLoading={false} onClick={vi.fn()} />
      </MemoryRouter>
    );

    const bookItems = screen.getAllByRole('listitem');
    expect(bookItems).toHaveLength(mockBooks.length);
  });

  test('displays a message when no books are present', () => {
    render(
      <MemoryRouter>
        <BookList books={[]} isLoading={false} onClick={vi.fn()} />
      </MemoryRouter>
    );

    expect(screen.getByText(/No books found/i)).toBeInTheDocument();
  });

  test('renders relevant book data', () => {
    render(
      <MemoryRouter>
        <BookList books={mockBooks} isLoading={false} onClick={vi.fn()} />
      </MemoryRouter>
    );

    expect(screen.getByText(/Book One/i)).toBeInTheDocument();
    expect(screen.getByText(/Book Two/i)).toBeInTheDocument();
  });
});
