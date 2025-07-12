import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { SocialSection } from '@/features/auth/components';

describe('SocialSection component test', () => {
  it('Google option has icon and correct title', () => {
    render(<SocialSection />);

    expect(screen.getByTestId('auth-google-icon')).toBeInTheDocument();

    expect(screen.getByTestId('auth-google-text')).toHaveTextContent('Google');
  });

  it('GitHub option has icon and correct title', () => {
    render(<SocialSection />);

    expect(screen.getByTestId('auth-github-icon')).toBeInTheDocument();

    expect(screen.getByTestId('auth-github-text')).toHaveTextContent('GitHub');
  });
});
