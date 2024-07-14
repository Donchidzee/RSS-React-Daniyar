import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '../components/Pagination';
import { MemoryRouter } from 'react-router-dom';

describe('Pagination', () => {
  const onPageChange = vi.fn();

  test('updates URL query parameter when page changes', () => {
    render(
      <MemoryRouter initialEntries={['/?page=0']}>
        <Pagination pageNumber={0} totalPages={5} onPageChange={onPageChange} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText(/Next/i));
    expect(onPageChange).toHaveBeenCalledWith(1);
  });
});
