import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Book from '../interfaces/book';

export interface SelectedBooksState {
  selectedBooks: Book[];
}

const initialState: SelectedBooksState = {
  selectedBooks: [],
};

const selectedBooksSlice = createSlice({
  name: 'selectedBooks',
  initialState,
  reducers: {
    selectBook(state, action: PayloadAction<Book>) {
      state.selectedBooks.push(action.payload);
    },
    unselectBook(state, action: PayloadAction<Book>) {
      state.selectedBooks = state.selectedBooks.filter(
        (book) => book.uid !== action.payload.uid
      );
    },
    unselectAllBooks(state) {
      state.selectedBooks = [];
    },
  },
});

export const { selectBook, unselectBook, unselectAllBooks } =
  selectedBooksSlice.actions;
export default selectedBooksSlice.reducer;
