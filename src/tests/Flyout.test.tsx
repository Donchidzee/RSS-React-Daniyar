import { render, screen, fireEvent } from '@testing-library/react';
import Flyout from '../components/Flyout';
import { ThemeProvider } from '../contexts/ThemeContext';
import { Provider } from 'react-redux';
import { store } from '../store';
import { selectBook } from '../slices/selectedBooksSlice';

test('displays selected books count', () => {
  store.dispatch(
    selectBook({
      uid: '1',
      title: 'React Book',
      publishedMonth: 5,
      publishedYear: 2021,
    })
  );

  render(
    <Provider store={store}>
      <ThemeProvider>
        <Flyout />
      </ThemeProvider>
    </Provider>
  );

  expect(screen.getByText(/1 items are selected/i)).toBeInTheDocument();
});

test('unselects all books', () => {
  store.dispatch(
    selectBook({
      uid: '1',
      title: 'React Book',
      publishedMonth: 5,
      publishedYear: 2021,
    })
  );

  render(
    <Provider store={store}>
      <ThemeProvider>
        <Flyout />
      </ThemeProvider>
    </Provider>
  );

  fireEvent.click(screen.getByText(/Unselect all/i));

  expect(screen.queryByText(/1 items are selected/i)).not.toBeInTheDocument();
});
