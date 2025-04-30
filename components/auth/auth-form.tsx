'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/auth-provider';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

// Form schema for login
const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

// Form schema for signup
const signupSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  businessName: z.string().min(2, { message: 'Business name is required' }),
});

type LoginFormValues = z.infer<typeof loginSchema>;
type SignupFormValues = z.infer<typeof signupSchema>;

interface AuthFormProps {
  type: 'login' | 'signup';
}

export function AuthForm({ type }: AuthFormProps) {
  const { signIn, signUp } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  // Define form based on type
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const signupForm = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: '',
      password: '',
      businessName: '',
    },
  });

  const form = type === 'login' ? loginForm : signupForm;

  // Handle form submission
  async function onSubmit(values: LoginFormValues | SignupFormValues) {
    setIsLoading(true);
    try {
      if (type === 'login') {
        await signIn(values.email, values.password);
        toast.success('Welcome back!');
      } else {
        const signupValues = values as SignupFormValues;
        await signUp(signupValues.email, signupValues.password, signupValues.businessName);
        toast.success('Account created successfully!');
      }
      router.push('/dashboard');
    } catch (error) {
      console.error('Authentication error:', error);
      toast.error(type === 'login' ? 'Failed to sign in. Please check your credentials.' : 'Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="you@example.com"
                  type="email"
                  autoComplete="email"
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="••••••••"
                  type="password"
                  autoComplete={type === 'login' ? 'current-password' : 'new-password'}
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {type === 'signup' && (
          <FormField
            control={signupForm.control}
            name="businessName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your Business Name"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Loading...' : type === 'login' ? 'Sign In' : 'Create Account'}
        </Button>
      </form>
    </Form>
  );
}