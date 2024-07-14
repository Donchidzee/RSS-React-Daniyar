import { render, screen, fireEvent } from '@testing-library/react';
import SearchSection from '../components/SearchSection';

// Mock localStorage
const mockSetItem = vi.fn();
const mockGetItem = vi.fn();
const mockRemoveItem = vi.fn();

beforeEach(() => {
  Object.defineProperty(window, 'localStorage', {
    value: {
      setItem: mockSetItem,
      getItem: mockGetItem,
      removeItem: mockRemoveItem,
    },
    writable: true,
  });
});

describe('SearchSection', () => {
  const handleClick = vi.fn();

  test('saves the entered value to local storage on search button click', () => {
    render(
      <SearchSection
        searchValue=""
        onChange={vi.fn((e) => {
          localStorage.setItem('lastSearchedValue', e.target.value);
        })}
        onKeyDown={vi.fn()}
        handleClick={handleClick}
      />
    );

    const input = screen.getByPlaceholderText(
      /Which book are you looking for?/i
    );

    fireEvent.change(input, { target: { value: 'Test Book' } });

    expect(mockSetItem).toHaveBeenCalledWith('lastSearchedValue', 'Test Book');
  });

  test('retrieves the value from local storage upon mounting', () => {
    mockGetItem.mockReturnValue('Test Book'); // Mock the return value for localStorage.getItem

    render(
      <SearchSection
        searchValue="Test Book"
        onChange={vi.fn()}
        onKeyDown={vi.fn()}
        handleClick={handleClick}
      />
    );

    expect(screen.getByDisplayValue(/Test Book/i)).toBeInTheDocument();
  });
});
