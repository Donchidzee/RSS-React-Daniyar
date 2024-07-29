import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '../components/Pagination';
import { ThemeProvider } from '../contexts/ThemeContext';

test('renders pagination component', () => {
  render(
    <ThemeProvider>
      <Pagination pageNumber={0} totalPages={5} onPageChange={() => {}} />
    </ThemeProvider>
  );

  expect(screen.getByText(/Previous/i)).toBeInTheDocument();
  expect(screen.getByText(/Next/i)).toBeInTheDocument();
});

test('handles page change', () => {
  const handlePageChange = vi.fn();

  render(
    <ThemeProvider>
      <Pagination
        pageNumber={0}
        totalPages={5}
        onPageChange={handlePageChange}
      />
    </ThemeProvider>
  );

  fireEvent.click(screen.getByText(/Next/i));

  expect(handlePageChange).toHaveBeenCalledWith(1);
});
