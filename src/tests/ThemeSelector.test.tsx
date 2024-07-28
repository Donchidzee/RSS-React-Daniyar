import { render, screen, fireEvent } from '@testing-library/react';
import ThemeSelector from '../components/ThemeSelector';
import { ThemeProvider } from '../contexts/ThemeContext';
import { useTheme } from '../contexts/useTheme';
import { vi } from 'vitest';

vi.mock('../contexts/useTheme');

describe('ThemeSelector', () => {
  const mockUseTheme = useTheme as jest.MockedFunction<typeof useTheme>;

  beforeEach(() => {
    mockUseTheme.mockReturnValue({
      theme: 'light',
      toggleTheme: vi.fn(),
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('renders theme selector', () => {
    render(
      <ThemeProvider>
        <ThemeSelector />
      </ThemeProvider>
    );

    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  test('switches to dark mode', () => {
    const { toggleTheme } = useTheme();
    mockUseTheme.mockReturnValue({
      theme: 'light',
      toggleTheme,
    });

    render(
      <ThemeProvider>
        <ThemeSelector />
      </ThemeProvider>
    );

    fireEvent.click(screen.getByRole('checkbox'));

    expect(toggleTheme).toHaveBeenCalledWith('dark');
  });

  test('switches to light mode', () => {
    const { toggleTheme } = useTheme();
    mockUseTheme.mockReturnValue({
      theme: 'dark',
      toggleTheme,
    });

    render(
      <ThemeProvider>
        <ThemeSelector />
      </ThemeProvider>
    );

    fireEvent.click(screen.getByRole('checkbox'));

    expect(toggleTheme).toHaveBeenCalledWith('light');
  });
});
