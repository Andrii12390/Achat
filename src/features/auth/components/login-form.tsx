'use client';

import { type LoginValues, LoginFormSchema } from '@/features/auth/lib/schemas';
import { SocialSection, TextInputField } from '@/features/auth/components';
import { PROVIDERS } from '@/features/auth/lib/constants';
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from '@/constants';

import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type SubmitHandler } from 'react-hook-form';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export const LoginForm = () => {
  const router = useRouter();

  const form = useForm<LoginValues>({
    resolver: zodResolver(LoginFormSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<LoginValues> = async values => {
    try {
      const result = await signIn(PROVIDERS.CREDENTIALS, {
        ...values,
        redirect: false,
      });

      if (result?.ok) {
        router.push(PRIVATE_ROUTES.CHATS);
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
        className="flex flex-col gap-4 p-10 rounded-md shadow-2xl shadow-primary/25 border border-border min-w-84"
      >
        <h3
          className="text-2xl font-semibold text-center"
          data-testid="form-title"
        >
          Login
        </h3>
        <TextInputField
          control={form.control}
          label="Email"
          name="email"
          type="email"
        />
        <TextInputField
          control={form.control}
          label="Password"
          name="password"
          type="password"
          data-testid="login-password-field"
        />
        <Link
          href={PUBLIC_ROUTES.REGISTRATION}
          className="text-sm"
          data-testid="register-link"
        >
          Don&apos;t have an account?
        </Link>
        <SocialSection />
        {form.formState.errors.root?.message && (
          <p className="py-2 px-3 rounded-md text-destructive bg-destructive/10">
            {form.formState.errors.root?.message}
          </p>
        )}

        <Button
          disabled={form.formState.isSubmitting}
          className="text-center text-md mt-4 w-1/2 mx-auto"
          data-testid="login-submit"
        >
          {form.formState.isSubmitting ? 'Submitting' : 'Login'}
        </Button>
      </form>
    </Form>
  );
};
