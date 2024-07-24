import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface PaginationParams {
  pageNumber: number;
  pageSize: number;
}

export const booksApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://stapi.co/api/v2/rest/book' }),
  endpoints: (builder) => ({
    fetchBook: builder.query({
      query: (uid: string) => `?uid=${uid}`,
    }),
    searchBook: builder.mutation({
      query: (
        body: string,
        pagination: PaginationParams = { pageNumber: 0, pageSize: 15 }
      ) => ({
        url: `/search?pageNumber=${pagination.pageNumber}&pageSize=${pagination.pageSize}`,
        method: 'POST',
        body: body,
      }),
    }),
  }),
});

export const { useFetchBookQuery, useSearchBookMutation } = booksApi;
