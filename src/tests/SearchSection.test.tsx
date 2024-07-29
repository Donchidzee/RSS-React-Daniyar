import { render, screen, fireEvent } from '@testing-library/react';
import SearchSection from '../components/SearchSection';
import { ThemeProvider } from '../contexts/ThemeContext';

test('renders search input and button', () => {
  render(
    <ThemeProvider>
      <SearchSection
        searchValue=""
        onChange={() => {}}
        onKeyDown={() => {}}
        handleClick={() => {}}
      />
    </ThemeProvider>
  );

  expect(
    screen.getByPlaceholderText(/Which book are you looking for?/i)
  ).toBeInTheDocument();
  expect(screen.getByText(/Search/i)).toBeInTheDocument();
});

test('handles search input change', () => {
  const handleChange = vi.fn();

  render(
    <ThemeProvider>
      <SearchSection
        searchValue=""
        onChange={handleChange}
        onKeyDown={() => {}}
        handleClick={() => {}}
      />
    </ThemeProvider>
  );

  fireEvent.change(
    screen.getByPlaceholderText(/Which book are you looking for?/i),
    { target: { value: 'React' } }
  );

  expect(handleChange).toHaveBeenCalled();
});

test('handles search button click', () => {
  const handleClick = vi.fn();

  render(
    <ThemeProvider>
      <SearchSection
        searchValue=""
        onChange={() => {}}
        onKeyDown={() => {}}
        handleClick={handleClick}
      />
    </ThemeProvider>
  );

  fireEvent.click(screen.getByText(/Search/i));

  expect(handleClick).toHaveBeenCalled();
});
