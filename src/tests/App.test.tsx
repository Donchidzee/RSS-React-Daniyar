import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../routes/App';
import { store } from '../store';
import { Provider } from 'react-redux';
import { vi } from 'vitest';
import { ThemeProvider } from '../contexts/ThemeContext';

vi.mock('./services/booksApi', () => ({
  useSearchBookMutation: () => [
    vi.fn(),
    { data: null, isLoading: false, error: null },
  ],
}));

describe('App Component', () => {
  const setup = () =>
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </MemoryRouter>
      </Provider>
    );

  it('renders search section and theme selector', () => {
    setup();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByText(/Error/i)).toBeInTheDocument();
  });

  it('allows entering a search value and clicking search button', async () => {
    setup();
    const input = screen.getByRole('textbox');
    const searchButton = screen.getByText(/Search/i);

    fireEvent.change(input, { target: { value: 'Test Book' } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(localStorage.getItem('lastSearchedValue')).toBe('Test Book');
    });
  });

  it('shows loading state when searching for books', async () => {
    vi.mock('./services/booksApi', () => ({
      useSearchBookMutation: () => [
        vi.fn().mockResolvedValue({
          books: [],
          page: {
            pageNumber: 0,
            totalPages: 1,
            totalElements: 0,
          },
        }),
        { data: null, isLoading: true, error: null },
      ],
    }));

    setup();
    expect(screen.getByRole('loader')).toBeInTheDocument();
  });

  it('handles error state', async () => {
    vi.mock('./services/booksApi', () => ({
      useSearchBookMutation: () => [
        vi.fn().mockRejectedValue(new Error('Failed to fetch books')),
        {
          data: null,
          isLoading: false,
          error: new Error('Failed to fetch books'),
        },
      ],
    }));

    setup();
    const searchButton = screen.getByText(/Search/i);
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(screen.getByText(/No books found/i)).toBeInTheDocument();
    });
  });
});
