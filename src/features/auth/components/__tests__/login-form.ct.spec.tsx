import { render, screen, waitFor } from '@testing-library/react';
import { describe, vi, it, expect, beforeEach } from 'vitest';
import { LoginForm } from '@/features/auth/components';
import { PUBLIC_ROUTES } from '@/constants';
import userEvent from '@testing-library/user-event';

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    prefetch: vi.fn(),
  }),
}));

describe('LoginForm component test', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('Should render correct title and fields', () => {
      render(<LoginForm />);

      expect(screen.getByTestId('form-title')).toHaveTextContent('Login');

      const emailField = screen.getByTestId('email-field');
      expect(emailField).toHaveAttribute('type', 'email');

      const passwordField = screen.getByTestId('password-field');
      expect(passwordField).toHaveAttribute('type', 'password');
    });

    it('Should render social section', () => {
      render(<LoginForm />);

      expect(screen.getByTestId('social-section')).toBeInTheDocument();
    });

    it('Should render registration link with correct href', () => {
      render(<LoginForm />);

      expect(screen.getByTestId('register-link')).toHaveAttribute(
        'href',
        PUBLIC_ROUTES.REGISTRATION,
      );
    });
  });

  describe('Form validation', () => {
    it('Should show required field when submitting empty form', async () => {
      render(<LoginForm />);

      await userEvent.click(screen.getByTestId('login-submit'));

      await waitFor(() => {
        expect(screen.getByText('Email is required')).toBeInTheDocument();
        expect(screen.getByText('Password is required')).toBeInTheDocument();
      });
    });

    it('Should show error if email is invalid', async () => {
      render(<LoginForm />);

      const emailField = screen.getByTestId('email-field');

      await userEvent.type(emailField, 'invalid_format');

      await waitFor(() => {
        expect(screen.getByText('Invalid email')).toBeInTheDocument();
      });
    });
  });
});
