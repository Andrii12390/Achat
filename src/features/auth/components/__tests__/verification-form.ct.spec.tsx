import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { VerificationForm } from '../verification-form';

const mockSetCode = vi.fn();
const mockHandleSubmit = vi.fn();
const mockHandleResend = vi.fn();

vi.mock('@/features/auth/hooks', () => ({
  useVerificationForm: vi.fn(() => ({
    code: '',
    setCode: mockSetCode,
    error: null,
    handleSubmit: mockHandleSubmit,
    handleResend: mockHandleResend,
  })),
}));

describe('VerificationForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render all form elements', () => {
      render(<VerificationForm />);

      expect(screen.getByTestId('verification-title')).toHaveTextContent('Verify your email');
      expect(screen.getByTestId('verification-otp-input')).toBeInTheDocument();
      expect(screen.getByTestId('verification-submit')).toHaveTextContent('Verify');
      expect(screen.getByTestId('verification-resend')).toHaveTextContent('Resend code');
    });
  });
});
