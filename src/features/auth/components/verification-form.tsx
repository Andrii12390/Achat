'use client';

import { REGEXP_ONLY_DIGITS } from 'input-otp';

import { Button } from '@/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { useVerificationForm } from '@/features/auth/hooks';

export const VerificationForm = () => {
  const { code, setCode, error, handleSubmit, handleResend } = useVerificationForm();

  return (
    <form
      className="shadow-primary/25 border-border flex min-w-84 flex-col items-center gap-4 rounded-md border p-10 shadow-2xl"
      onSubmit={handleSubmit}
      data-testid="verification-form"
    >
      <h3
        className="text-center text-2xl font-bold"
        data-testid="verification-title"
      >
        Verify your email
      </h3>
      <p className="text-center text-sm">
        We have sent a verification code to <br /> your email address
      </p>
      <InputOTP
        maxLength={6}
        pattern={REGEXP_ONLY_DIGITS}
        autoFocus
        onChange={e => setCode(e)}
        value={code}
        data-testid="verification-otp-input"
      >
        <InputOTPGroup className="mb-2">
          <InputOTPSlot
            className="p-5 text-xl"
            index={0}
          />
          <InputOTPSlot
            className="p-5 text-xl"
            index={1}
          />
          <InputOTPSlot
            className="p-5 text-xl"
            index={2}
          />
          <InputOTPSlot
            className="p-5 text-xl"
            index={3}
          />
          <InputOTPSlot
            className="p-5 text-xl"
            index={4}
          />
          <InputOTPSlot
            className="p-5 text-xl"
            index={5}
          />
        </InputOTPGroup>
      </InputOTP>

      {error && (
        <p className="text-destructive bg-destructive/10 w-full rounded-md px-3 py-2">{error}</p>
      )}
      <Button
        size="lg"
        className="w-2/3 text-lg tracking-wide"
        data-testid="verification-submit"
      >
        Verify
      </Button>
      <div>
        <p>Didn&apos;t receive the code?</p>
        <button
          type="button"
          className="text-primary hover:text-primary/80 w-full cursor-pointer font-semibold"
          onClick={handleResend}
          data-testid="verification-resend"
        >
          Resend code
        </button>
      </div>
    </form>
  );
};
