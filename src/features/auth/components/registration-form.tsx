'use client';

import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { type TRegistrationValues, RegistrationFormSchema } from '@/features/auth/lib/schemas';
import { Button } from '@/components/ui/button';
import { SocialSection, TextInputField } from '@/features/auth/components';
import Link from 'next/link';
import { registerUser } from '@/features/auth/actions';

export const RegistrationForm = () => {
  const form = useForm<TRegistrationValues>({
    resolver: zodResolver(RegistrationFormSchema),
    defaultValues: {
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit: SubmitHandler<TRegistrationValues> = async values => {
    try {
      await registerUser(values);
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
        <h3 className="text-2xl font-semibold text-center">Register</h3>
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
          href="/"
          className="text-sm"
        >
          Already have an account?
        </Link>
        {form.formState.errors.root?.message && (
          <p className="text-red-500">{form.formState.errors.root?.message}</p>
        )}
        <SocialSection />
        <Button
          disabled={form.formState.isSubmitting}
          className="text-center text-md mt-4 w-2/4 mx-auto"
        >
          {form.formState.isSubmitting ? 'Register' : 'Submitting'}
        </Button>
      </form>
    </Form>
  );
};
