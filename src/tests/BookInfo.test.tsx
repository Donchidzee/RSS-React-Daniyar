import { render, screen, fireEvent } from '@testing-library/react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useFetchBookQuery } from '../services/booksApi';
import { useTheme } from '../contexts/useTheme';
import BookInfo from '../routes/BookInfo';
import { vi } from 'vitest';

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
  useParams: vi.fn(),
  useSearchParams: vi.fn(),
}));

vi.mock('../services/booksApi', () => ({
  useFetchBookQuery: vi.fn(),
}));

vi.mock('../contexts/useTheme', () => ({
  useTheme: vi.fn(),
}));

describe('BookInfo', () => {
  const mockUseNavigate = useNavigate as jest.MockedFunction<
    typeof useNavigate
  >;
  const mockUseParams = useParams as jest.MockedFunction<typeof useParams>;
  const mockUseSearchParams = useSearchParams as jest.MockedFunction<
    typeof useSearchParams
  >;
  const mockUseFetchBookQuery = useFetchBookQuery as jest.MockedFunction<
    typeof useFetchBookQuery
  >;
  const mockUseTheme = useTheme as jest.MockedFunction<typeof useTheme>;

  beforeEach(() => {
    mockUseNavigate.mockReturnValue(vi.fn());
    mockUseParams.mockReturnValue({ bookId: '1' });
    const mockSearchParams = {
      get: vi.fn().mockReturnValue('0'),
      append: vi.fn(),
      delete: vi.fn(),
      entries: vi.fn(),
      forEach: vi.fn(),
      getAll: vi.fn(),
      has: vi.fn(),
      keys: vi.fn(),
      set: vi.fn(),
      sort: vi.fn(),
      values: vi.fn(),
      toString: vi.fn(),
    } as unknown as URLSearchParams;
    mockUseSearchParams.mockReturnValue([mockSearchParams, vi.fn()]);
    mockUseTheme.mockReturnValue({
      theme: 'light',
      toggleTheme: function (): void {
        throw new Error('Function not implemented.');
      },
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('renders loading state', () => {
    mockUseFetchBookQuery.mockReturnValue({
      data: undefined,
      error: undefined,
      isLoading: true,
      refetch: vi.fn(),
    });

    render(<BookInfo />);

    expect(screen.getByRole('loader')).toBeInTheDocument();
  });

  test('renders error state', () => {
    mockUseFetchBookQuery.mockReturnValue({
      data: undefined,
      error: new Error('Failed to fetch book'),
      isLoading: false,
      refetch: vi.fn(),
    });

    render(<BookInfo />);

    expect(screen.getByText('Failed to fetch book')).toBeInTheDocument();
  });

  test('renders book information', () => {
    const bookData = {
      title: 'Sample Book',
      publishedMonth: 5,
      publishedYear: 2021,
      numberOfPages: 300,
      authors: [{ uid: '1', name: 'Author 1' }],
      publishers: [{ uid: '1', name: 'Publisher 1' }],
      characters: [{ uid: '1', name: 'Character 1' }],
    };
    mockUseFetchBookQuery.mockReturnValue({
      data: bookData,
      error: undefined,
      isLoading: false,
      refetch: vi.fn(),
    });

    render(<BookInfo />);

    expect(screen.getByText('Book information')).toBeInTheDocument();
    expect(screen.getByText('Name: "Sample Book"')).toBeInTheDocument();
    expect(screen.getByText('Number of pages: 300')).toBeInTheDocument();
    expect(screen.getByText('Author 1')).toBeInTheDocument();
    expect(screen.getByText('Publisher 1')).toBeInTheDocument();
    expect(screen.getByText('Character 1')).toBeInTheDocument();
    expect(
      screen.getByText('Date of publishing: June 2021')
    ).toBeInTheDocument();
  });

  test('navigates back on close icon click', () => {
    const mockNavigate = vi.fn();
    mockUseNavigate.mockReturnValue(mockNavigate);

    const bookData = {
      title: 'Sample Book',
      publishedMonth: 5,
      publishedYear: 2021,
      numberOfPages: 300,
      authors: [{ uid: '1', name: 'Author 1' }],
      publishers: [{ uid: '1', name: 'Publisher 1' }],
      characters: [{ uid: '1', name: 'Character 1' }],
    };
    mockUseFetchBookQuery.mockReturnValue({
      data: bookData,
      error: undefined,
      isLoading: false,
      refetch: vi.fn(),
    });

    render(<BookInfo />);

    fireEvent.click(screen.getByAltText('Close'));

    expect(mockNavigate).toHaveBeenCalledWith('/?page=0', { replace: true });
  });
});
