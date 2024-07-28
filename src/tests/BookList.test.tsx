import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import BookList from '../components/BookList';
import { ThemeProvider } from '../contexts/ThemeContext';
import { Provider } from 'react-redux';
import { store } from '../store';

const books = [
  { uid: '1', title: 'React Book', publishedMonth: 5, publishedYear: 2021 },
  {
    uid: '2',
    title: 'JavaScript Book',
    publishedMonth: 3,
    publishedYear: 2020,
  },
];

test('renders list of books', () => {
  render(
    <Provider store={store}>
      <ThemeProvider>
        <MemoryRouter>
          <BookList books={books} isLoading={false} onClick={() => {}} />
        </MemoryRouter>
      </ThemeProvider>
    </Provider>
  );

  expect(screen.getByText(/React Book/i)).toBeInTheDocument();
  expect(screen.getByText(/JavaScript Book/i)).toBeInTheDocument();
});

test('displays loading state', () => {
  render(
    <Provider store={store}>
      <ThemeProvider>
        <MemoryRouter>
          <BookList books={[]} isLoading={true} onClick={() => {}} />
        </MemoryRouter>
      </ThemeProvider>
    </Provider>
  );

  expect(screen.getByRole('loader')).toBeInTheDocument();
});

test('handles book selection', () => {
  render(
    <Provider store={store}>
      <ThemeProvider>
        <MemoryRouter>
          <BookList books={books} isLoading={false} onClick={() => {}} />
        </MemoryRouter>
      </ThemeProvider>
    </Provider>
  );

  const checkboxes = screen.getAllByRole('checkbox');
  fireEvent.click(checkboxes[0]);

  expect(checkboxes[0]).toBeChecked();
});
