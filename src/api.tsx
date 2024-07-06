import Book from './interfaces/book';

interface Pagination {
  pageNumber: number;
  pageSize: number;
}

async function fetchBooksRequest(
  pagination: Pagination = { pageNumber: 1, pageSize: 40 }
): Promise<Book[]> {
  const response = await fetch(
    `https://stapi.co/api/v2/rest/book/search?pageNumber=${pagination.pageNumber}&pageSize=${pagination.pageSize}`
  );
  const data = await response.json();
  console.log(data.books);
  return data.books;
}

async function searchBooksRequest(
  body: string,
  pagination: Pagination = { pageNumber: 0, pageSize: 40 }
): Promise<Book[]> {
  const formBody = new URLSearchParams();
  formBody.append('title', body);

  const response = await fetch(
    `https://stapi.co/api/v2/rest/book/search?pageNumber=${pagination.pageNumber}&pageSize=${pagination.pageSize}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formBody,
    }
  );
  const data = await response.json();
  console.log(data.books);
  return data.books;
}

export { fetchBooksRequest, searchBooksRequest };
