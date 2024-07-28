import { render, screen } from '@testing-library/react';
import { MemoryRouter, useRouteError } from 'react-router-dom';
import { vi } from 'vitest';
import ErrorPage from '../ErrorPage';

type MockUseRouteError = jest.Mock;

vi.mock('react-router-dom', async () => {
  const actual =
    await vi.importActual<typeof import('react-router-dom')>(
      'react-router-dom'
    );
  return {
    ...actual,
    useRouteError: vi.fn(),
  };
});

describe('ErrorPage Component', () => {
  const setup = (error: unknown) => {
    (useRouteError as MockUseRouteError).mockReturnValue(error);
    return render(
      <MemoryRouter>
        <ErrorPage />
      </MemoryRouter>
    );
  };

  it('renders with a 404 error message', () => {
    const error = {
      data: 'Not Found',
      error: {
        columnNumber: 0,
        fileName: '',
        lineNumber: 0,
        message: 'Page not found',
        stack: '',
      },
      internal: false,
      status: 404,
      statusText: 'Not Found',
    };

    setup(error);

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(
      screen.getByText("Sorry, this page doesn't exist")
    ).toBeInTheDocument();
  });

  it('logs the error to the console', () => {
    const error = {
      data: 'Not Found',
      error: {
        columnNumber: 0,
        fileName: '',
        lineNumber: 0,
        message: 'Page not found',
        stack: '',
      },
      internal: false,
      status: 404,
      statusText: 'Not Found',
    };

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    setup(error);

    expect(consoleSpy).toHaveBeenCalledWith(error);

    consoleSpy.mockRestore();
  });
});
