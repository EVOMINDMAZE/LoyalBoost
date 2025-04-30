'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Types for our auth context
type User = {
  id: string;
  email: string;
  businessId?: string;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, businessName: string) => Promise<void>;
  signOut: () => void;
};

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock authentication for MVP (would be replaced with Cognito)
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Check if user is already logged in
  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const storedUser = localStorage.getItem('loyalboost_user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Authentication check failed', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkLoggedIn();
  }, []);

  // Mock sign in
  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // For demo, we're simulating a successful login
      const mockUser = {
        id: 'user-1',
        email,
        businessId: 'business-1',
      };
      
      setUser(mockUser);
      localStorage.setItem('loyalboost_user', JSON.stringify(mockUser));
      router.push('/dashboard');
    } catch (error) {
      console.error('Login failed', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Mock sign up
  const signUp = async (email: string, password: string, businessName: string) => {
    setIsLoading(true);
    try {
      // For demo, we're simulating a successful registration
      const mockUser = {
        id: 'user-' + Date.now(),
        email,
        businessId: 'business-' + Date.now(),
      };

      setUser(mockUser);
      localStorage.setItem('loyalboost_user', JSON.stringify(mockUser));
      router.push('/dashboard');
    } catch (error) {
      console.error('Registration failed', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Sign out
  const signOut = () => {
    setUser(null);
    localStorage.removeItem('loyalboost_user');
    router.push('/');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};