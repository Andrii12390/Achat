import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';

interface Props {
  code: number;
}

function VerificationEmail({ code }: Props) {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Preview>AChat Email Verification</Preview>
        <Container style={container}>
          <Section style={coverSection}>
            <Section style={upperSection}>
              <Heading style={h1}>Verify your email address</Heading>
              <Text style={mainText}>
                Welcome to AChat! We&apos;re excited to have you join our community. Please verify
                your email address to complete your account setup and start chatting.
              </Text>
              <Section style={verificationSection}>
                <Text style={verifyText}>Verification code</Text>
                <Text style={codeText}>{code}</Text>
                <Text style={validityText}>(This code is valid for 5 minutes)</Text>
              </Section>
              <Text style={instructionText}>
                Enter this code in the verification form to activate your account.
              </Text>
            </Section>
            <Hr />
            <Section style={lowerSection}>
              <Text style={cautionText}>
                If you didn&apos;t request this verification code, please ignore this email. Your
                account will remain inactive until verified.
              </Text>
            </Section>
          </Section>
          <Text style={footerText}>
            This message was sent by AChat. For support, please contact us at
            pasiura.andrii.dev@gmail.com
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

VerificationEmail.PreviewProps = {
  code: 596853,
} satisfies Props;

const main = {
  backgroundColor: '#f6f6f6',
  color: '#212121',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
};

const container = {
  padding: '20px',
  margin: '0 auto',
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  maxWidth: '600px',
};

const h1 = {
  color: '#1a1a1a',
  fontSize: '24px',
  fontWeight: 'bold',
  marginBottom: '20px',
  textAlign: 'center' as const,
};

const text = {
  color: '#374151',
  fontSize: '16px',
  lineHeight: '1.5',
  margin: '16px 0',
};

const coverSection = {
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  overflow: 'hidden',
};

const upperSection = {
  padding: '40px 40px 32px 40px',
  textAlign: 'center' as const,
};

const lowerSection = {
  padding: '24px 40px',
  backgroundColor: '#f9fafb',
};

const footerText = {
  ...text,
  fontSize: '14px',
  color: '#6b7280',
  textAlign: 'center' as const,
  padding: '20px 40px',
  margin: '0',
};

const verifyText = {
  ...text,
  margin: '0 0 8px 0',
  fontWeight: '600',
  color: '#374151',
  fontSize: '14px',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.5px',
};

const codeText = {
  fontWeight: 'bold',
  fontSize: '36px',
  margin: '16px 0',
  color: '#6366f1',
  letterSpacing: '4px',
  fontFamily: 'monospace',
};

const validityText = {
  ...text,
  margin: '8px 0 0 0',
  fontSize: '14px',
  color: '#6b7280',
};

const instructionText = {
  ...text,
  fontSize: '14px',
  color: '#6b7280',
  margin: '24px 0 0 0',
};

const verificationSection = {
  backgroundColor: '#f9fafb',
  padding: '32px',
  borderRadius: '8px',
  border: '1px solid #e5e7eb',
  margin: '24px 0',
};

const mainText = {
  ...text,
  marginBottom: '24px',
  fontSize: '16px',
  lineHeight: '1.6',
};

const cautionText = {
  ...text,
  margin: '0',
  fontSize: '14px',
  color: '#6b7280',
};

export default VerificationEmail;
