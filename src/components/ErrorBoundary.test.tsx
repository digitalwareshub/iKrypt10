import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary';

// Component that throws an error
const ThrowError = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error('Test error');
  }
  return <div>Normal content</div>;
};

// Wrapper with router for testing
const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

describe('ErrorBoundary', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    // Suppress console.error for cleaner test output
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('renders children when no error occurs', () => {
    render(
      <TestWrapper>
        <ErrorBoundary>
          <div data-testid="child">Child content</div>
        </ErrorBoundary>
      </TestWrapper>
    );

    expect(screen.getByTestId('child')).toBeInTheDocument();
    expect(screen.getByText('Child content')).toBeInTheDocument();
  });

  it('renders error UI when an error occurs', () => {
    render(
      <TestWrapper>
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      </TestWrapper>
    );

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(
      screen.getByText(/An unexpected error occurred/i)
    ).toBeInTheDocument();
  });

  it('renders custom fallback when provided', () => {
    const CustomFallback = <div data-testid="custom-fallback">Custom Error</div>;

    render(
      <TestWrapper>
        <ErrorBoundary fallback={CustomFallback}>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      </TestWrapper>
    );

    expect(screen.getByTestId('custom-fallback')).toBeInTheDocument();
    expect(screen.getByText('Custom Error')).toBeInTheDocument();
  });

  it('shows Try Again and Reload Page buttons', () => {
    render(
      <TestWrapper>
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      </TestWrapper>
    );

    expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /reload page/i })).toBeInTheDocument();
  });

  it('resets error state when Try Again is clicked', () => {
    const { rerender } = render(
      <TestWrapper>
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      </TestWrapper>
    );

    // Click Try Again
    const tryAgainButton = screen.getByRole('button', { name: /try again/i });
    fireEvent.click(tryAgainButton);

    // Rerender with non-throwing component to test recovery
    rerender(
      <TestWrapper>
        <ErrorBoundary>
          <ThrowError shouldThrow={false} />
        </ErrorBoundary>
      </TestWrapper>
    );

    // After clicking Try Again and rerendering with non-throwing component,
    // we should see normal content
    expect(screen.queryByText('Something went wrong')).not.toBeInTheDocument();
  });

  it('shows contact support link', () => {
    render(
      <TestWrapper>
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      </TestWrapper>
    );

    const supportLink = screen.getByRole('link', { name: /contact support/i });
    expect(supportLink).toBeInTheDocument();
    expect(supportLink).toHaveAttribute('href', '/contact');
  });
});
