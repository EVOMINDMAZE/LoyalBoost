import Link from 'next/link';
import { Logo } from '@/components/logo';
import { AuthForm } from '@/components/auth/auth-form';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="p-4">
        <Button asChild variant="ghost" size="sm">
          <Link href="/">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="mx-auto w-full max-w-md space-y-6">
          <div className="space-y-2 text-center">
            <Logo className="mx-auto" size={36} />
            <h1 className="text-3xl font-bold">Create an account</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Get started with LoyalBoost
            </p>
          </div>
          
          <div className="space-y-6">
            <AuthForm type="signup" />
            
            <div className="text-center text-sm">
              <p className="text-gray-500 dark:text-gray-400">
                Already have an account?{' '}
                <Link href="/login" className="font-medium text-blue-500 hover:text-blue-600">
                  Sign in
                </Link>
              </p>
            </div>
            
            <p className="text-xs text-center text-gray-500 dark:text-gray-400">
              By creating an account, you agree to our{' '}
              <Link href="/terms" className="underline underline-offset-2 hover:text-blue-500">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="underline underline-offset-2 hover:text-blue-500">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}