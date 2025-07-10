import { RegistrationForm } from '@/features/auth/components';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign up',
  description: 'Sign up to AChat and start chatting with your friends.',
};

function RegistrationPage() {
  return <RegistrationForm />;
}

export default RegistrationPage;
