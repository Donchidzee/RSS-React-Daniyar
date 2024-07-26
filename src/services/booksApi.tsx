import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Book from '../interfaces/book';
import { PageInfo } from '../interfaces/pageInfo';

const convertBody = (body: string) => {
  const formBody = new URLSearchParams();
  formBody.append('title', body);
  return formBody;
};

export const booksApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://stapi.co/api/v2/rest/book' }),
  endpoints: (builder) => ({
    fetchBook: builder.query({
      query: (uid: string) => `?uid=${uid}`,
      transformResponse: (response: { book: Book }) => response.book,
    }),
    searchBook: builder.mutation({
      query: ({ body, pagination }) => ({
        url: `/search?pageNumber=${pagination.pageNumber ? pagination.pageNumber : 0}&pageSize=${pagination.pageSize ? pagination.pageSize : 15}`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: convertBody(body),
      }),
      transformResponse: (response: { books: Book[]; page: PageInfo }) =>
        response,
    }),
  }),
});

export const { useFetchBookQuery, useSearchBookMutation } = booksApi;
