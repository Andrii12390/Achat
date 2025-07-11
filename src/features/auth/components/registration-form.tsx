'use client';

import { type RegistrationValues, RegistrationFormSchema } from '@/features/auth/lib/schemas';
import { SocialSection, TextInputField } from '@/features/auth/components';
import { registerUser } from '@/features/auth/actions';
import { PROVIDERS } from '@/features/auth/lib/constants';
import { PUBLIC_ROUTES } from '@/constants';

import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type SubmitHandler } from 'react-hook-form';

import { signIn } from 'next-auth/react';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { authService } from '../services/auth-service';

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
          router.push(PUBLIC_ROUTES.VERIFICATION);
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
        className="flex flex-col gap-4 p-10 rounded-md shadow-2xl shadow-primary/25 dark:shadow-primary/50 border border-border min-w-84"
      >
        <h3
          className="text-2xl font-semibold text-center"
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
          <p className="py-2 px-3 rounded-md text-destructive bg-destructive/10">
            {form.formState.errors.root?.message}
          </p>
        )}
        <SocialSection />
        <Button
          disabled={form.formState.isSubmitting}
          className="text-center text-md mt-4 w-1/2 mx-auto"
          data-testid="registration-submit"
        >
          {form.formState.isSubmitting ? 'Submitting' : 'Register'}
        </Button>
      </form>
    </Form>
  );
};
