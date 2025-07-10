import { LoginForm } from '@/features/auth/components';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign in',
  description: 'Sign in to your AChat account and start chatting.',
};

function LoginPage() {
  return <LoginForm />;
}

export default LoginPage;
