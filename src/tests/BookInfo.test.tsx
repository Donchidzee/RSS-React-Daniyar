import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import BookInfo from '../routes/BookInfo';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

const mock = new MockAdapter(axios);

describe('BookInfo Component', () => {
  it('renders book data correctly', async () => {
    const mockBook = {
      title: 'Test Book',
      publishedMonth: 1,
      publishedYear: 2020,
      numberOfPages: 300,
    };

    mock.onGet('/books/1').reply(200, mockBook);

    render(
      <MemoryRouter initialEntries={['/books/1/']}>
        <Routes>
          <Route path="books/:bookId" element={<BookInfo />} />
        </Routes>
      </MemoryRouter>
    );

    expect(await screen.findByText('Book information')).toBeInTheDocument();
  });

  it('displays loading indicator while fetching data', async () => {
    mock.onGet('/books/1').reply(200, {});

    render(
      <MemoryRouter initialEntries={['/books/1']}>
        <Routes>
          <Route path="books/:bookId" element={<BookInfo />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByRole('loader')).toBeInTheDocument();
  });

  it('closes the component when close button is clicked', async () => {
    mock.onGet('/books/1').reply(200, {
      title: 'Test Book',
      publishedMonth: 1,
      publishedYear: 2020,
    });

    render(
      <MemoryRouter initialEntries={['/books/1']}>
        <Routes>
          <Route path="books/:bookId" element={<BookInfo />} />
        </Routes>
      </MemoryRouter>
    );

    const closeButton = await screen.findByAltText('Close');
    fireEvent.click(closeButton);
  });
});
