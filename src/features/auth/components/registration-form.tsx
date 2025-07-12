'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm, type SubmitHandler } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from '@/constants';
import { registerUser } from '@/features/auth/actions';
import { SocialSection, TextInputField } from '@/features/auth/components';
import { PROVIDERS } from '@/features/auth/lib/constants';
import { type RegistrationValues, RegistrationFormSchema } from '@/features/auth/lib/schemas';
import { authService } from '@/features/auth/services';

export const RegistrationForm = () => {
  const router = useRouter();

  const form = useForm<RegistrationValues>({
    resolver: zodResolver(RegistrationFormSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit: SubmitHandler<RegistrationValues> = async values => {
    try {
      const res = await registerUser(values);
      if (res) {
        const signInRes = await signIn(PROVIDERS.CREDENTIALS, {
          ...values,
          redirect: false,
        });
        if (signInRes?.ok) {
          await authService.sendCode();
          router.push(PRIVATE_ROUTES.VERIFICATION);
        }
      }
    } catch (error) {
      form.setError('root', {
        message: error instanceof Error ? error.message : 'Something went wrong',
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="shadow-primary/25 dark:shadow-primary/50 border-border flex min-w-84 flex-col gap-4 rounded-md border p-10 shadow-2xl"
      >
        <h3
          className="text-center text-2xl font-semibold"
          data-testid="form-title"
        >
          Registration
        </h3>
        <TextInputField
          control={form.control}
          label="Email"
          name="email"
          type="email"
        />
        <TextInputField
          control={form.control}
          label="Username"
          name="username"
          type="text"
        />
        <TextInputField
          control={form.control}
          label="Password"
          name="password"
          type="password"
        />
        <TextInputField
          control={form.control}
          label="Confirm Password"
          name="confirmPassword"
          type="password"
        />
        <Link
          href={PUBLIC_ROUTES.LOGIN}
          data-testid="login-link"
          className="text-sm"
        >
          Already have an account?
        </Link>
        {form.formState.errors.root?.message && (
          <p className="text-destructive bg-destructive/10 rounded-md px-3 py-2">
            {form.formState.errors.root?.message}
          </p>
        )}
        <SocialSection />
        <Button
          disabled={form.formState.isSubmitting}
          className="text-md mx-auto mt-4 w-1/2 text-center"
          data-testid="registration-submit"
        >
          {form.formState.isSubmitting ? 'Submitting' : 'Register'}
        </Button>
      </form>
    </Form>
  );
};
