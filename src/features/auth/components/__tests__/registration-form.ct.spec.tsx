import { render, screen, waitFor } from '@testing-library/react';
import { describe, vi, it, expect, beforeEach } from 'vitest';
import { RegistrationForm } from '@/features/auth/components';
import { PUBLIC_ROUTES } from '@/constants';
import userEvent from '@testing-library/user-event';

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    prefetch: vi.fn(),
  }),
}));

describe('RegistrationForm component test', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('Should render correct title and fields', () => {
      render(<RegistrationForm />);

      expect(screen.getByTestId('form-title')).toHaveTextContent('Registration');

      const usernameField = screen.getByTestId('username-field');
      expect(usernameField).toHaveAttribute('type', 'text');

      const emailField = screen.getByTestId('email-field');
      expect(emailField).toHaveAttribute('type', 'email');

      const passwordField = screen.getByTestId('password-field');
      expect(passwordField).toHaveAttribute('type', 'password');

      const confirmPasswordField = screen.getByTestId('confirmPassword-field');
      expect(confirmPasswordField).toHaveAttribute('type', 'password');
    });

    it('Should render social section', () => {
      render(<RegistrationForm />);

      expect(screen.getByTestId('social-section')).toBeInTheDocument();
    });

    it('Should render registration link with correct href', () => {
      render(<RegistrationForm />);

      expect(screen.getByTestId('login-link')).toHaveAttribute('href', PUBLIC_ROUTES.LOGIN);
    });
  });

  describe('Form validation', () => {
    it('Should show required field when submitting empty form', async () => {
      render(<RegistrationForm />);

      await userEvent.click(screen.getByTestId('registration-submit'));

      await waitFor(() => {
        expect(screen.getByText('Email is required')).toBeInTheDocument();
        expect(
          screen.getByText('Username cannot be shorter than 4 characters'),
        ).toBeInTheDocument();
        expect(
          screen.getByText('Password cannot be shorter than 4 characters'),
        ).toBeInTheDocument();
        expect(screen.getByText('Confirmation password is required')).toBeInTheDocument();
      });
    });

    it('Should show error if email is invalid', async () => {
      render(<RegistrationForm />);

      const emailField = screen.getByTestId('email-field');

      await userEvent.type(emailField, 'invalid_format');

      await waitFor(() => {
        expect(screen.getByText('Invalid email')).toBeInTheDocument();
      });
    });

    it("Should show error if passwords don't match", async () => {
      render(<RegistrationForm />);

      const passwordField = screen.getByTestId('password-field');
      const confirmPasswordField = screen.getByTestId('confirmPassword-field');

      await userEvent.type(passwordField, 'password123');
      await userEvent.type(confirmPasswordField, 'password321');

      await waitFor(() => {
        expect(screen.getByText("Passwords don't match")).toBeInTheDocument();
      });
    });
  });
});
