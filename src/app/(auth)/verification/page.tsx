import { Metadata } from 'next';

import { VerificationForm } from '@/features/auth/components/verification-form';

export const metadata: Metadata = {
  title: 'Verification',
  description: 'Verify your account to get access to all features.',
};

function VeryficationPage() {
  return <VerificationForm />;
}

export default VeryficationPage;
