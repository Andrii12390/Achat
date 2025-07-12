'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm, type SubmitHandler } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from '@/constants';
import { SocialSection, TextInputField } from '@/features/auth/components';
import { PROVIDERS } from '@/features/auth/lib/constants';
import { type LoginValues, LoginFormSchema } from '@/features/auth/lib/schemas';

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
        className="shadow-primary/25 border-border flex min-w-84 flex-col gap-4 rounded-md border p-10 shadow-2xl"
      >
        <h3
          className="text-center text-2xl font-semibold"
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
          <p className="text-destructive bg-destructive/10 rounded-md px-3 py-2">
            {form.formState.errors.root?.message}
          </p>
        )}

        <Button
          disabled={form.formState.isSubmitting}
          className="text-md mx-auto mt-4 w-1/2 text-center"
          data-testid="login-submit"
        >
          {form.formState.isSubmitting ? 'Submitting' : 'Login'}
        </Button>
      </form>
    </Form>
  );
};
