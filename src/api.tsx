import Book from './interfaces/book';

interface PaginationParams {
  pageNumber: number;
  pageSize: number;
}

interface PageInfo {
  pageNumber: number;
  pageSize: number;
  numberOfElements: number;
  totalElements: number;
  totalPages: number;
  firstPage: boolean;
  lastPage: boolean;
}

async function fetchBooksRequest(
  pagination: PaginationParams = { pageNumber: 1, pageSize: 15 }
): Promise<Book[]> {
  const response = await fetch(
    `https://stapi.co/api/v2/rest/book/search?pageNumber=${pagination.pageNumber}&pageSize=${pagination.pageSize}`
  );
  const data = await response.json();
  return data.books;
}

async function fetchBookRequest(uid: string): Promise<Book> {
  const response = await fetch(`https://stapi.co/api/v2/rest/book?uid=${uid}`);
  const data = await response.json();
  return data.book;
}

async function searchBooksRequest(
  body: string,
  pagination: PaginationParams = { pageNumber: 0, pageSize: 15 }
): Promise<[Book[], PageInfo]> {
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
  return [data.books, data.page];
}

export { fetchBooksRequest, searchBooksRequest, fetchBookRequest };
