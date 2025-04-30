import Link from 'next/link';
import { Logo } from '@/components/logo';
import { AuthForm } from '@/components/auth/auth-form';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

export default function LoginPage() {
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
            <h1 className="text-3xl font-bold">Welcome back</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Sign in to your LoyalBoost account
            </p>
          </div>
          
          <div className="space-y-6">
            <AuthForm type="login" />
            
            <div className="text-center text-sm">
              <p className="text-gray-500 dark:text-gray-400">
                Don't have an account?{' '}
                <Link href="/signup" className="font-medium text-blue-500 hover:text-blue-600">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}