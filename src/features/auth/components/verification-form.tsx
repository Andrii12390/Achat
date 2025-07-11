'use client';

import { Button } from '@/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { useVerificationForm } from '@/features/auth/hooks';

export const VerificationForm = () => {
  const { code, setCode, error, handleSubmit, handleResend } = useVerificationForm();

  return (
    <form
      className="flex flex-col items-center gap-4 p-10 rounded-md shadow-2xl shadow-primary/25 border border-border min-w-84"
      onSubmit={handleSubmit}
      data-testid="verification-form"
    >
      <h3
        className="text-2xl font-bold text-center"
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
        <p className="w-full py-2 px-3 rounded-md text-destructive bg-destructive/10">{error}</p>
      )}
      <Button
        size="lg"
        className="tracking-wide text-lg w-2/3"
        data-testid="verification-submit"
      >
        Verify
      </Button>
      <div>
        <p>Didn&apos;t receive the code?</p>
        <button
          type="button"
          className="w-full text-primary font-semibold hover:text-primary/80 cursor-pointer"
          onClick={handleResend}
          data-testid="verification-resend"
        >
          Resend code
        </button>
      </div>
    </form>
  );
};
