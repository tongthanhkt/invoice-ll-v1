'use client';

import { authService } from '@/services/auth/authService';
import { spinnerService } from '@/services/spinner.service';
import { User } from '@/types';
import { usePathname, useRouter } from 'next/navigation';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const pathname = usePathname();
  // context

  // // Force re-render when route changes
  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);
      try {
        spinnerService.startSpinner();
        const userData = await authService.getProfile();
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
      } catch (error) {
        setUser(null);
      } finally {
        spinnerService.endSpinner();
        setLoading(false);
      }
    };

    checkAuth();
  }, [pathname]); // Re-run when route changes

  const withSpinner = async <T,>(fn: () => Promise<T>): Promise<T> => {
    setLoading(true);
    spinnerService.startSpinner();
    try {
      return await fn();
    } finally {
      spinnerService.endSpinner();
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    return withSpinner(async () => {
      try {
        const userData = await authService.login({ email, password });
        setUser(userData);
        // Wait for state to be updated
        await new Promise((resolve) => setTimeout(resolve, 100));
        router.push('/invoice');
        return { success: true };
      } catch (error) {
        console.error('Login failed:', error);
        return { success: false, error: 'Login failed' };
      }
    });
  };

  const register = async (name: string, email: string, password: string) => {
    return withSpinner(async () => {
      try {
        const userData = await authService.register({ name, email, password });
        setUser(userData);
        router.push('/invoice');
      } catch (error) {
        console.error('Registration failed:', error);
        throw error;
      }
    });
  };

  const logout = async () => {
    return withSpinner(async () => {
      try {
        await authService.logout();
        setUser(null);
        router.push('/login');
        router.refresh();
      } catch (error) {
        console.error('Logout failed:', error);
        throw error;
      }
    });
  };

  const updateProfile = async (data: Partial<User>) => {
    return withSpinner(async () => {
      const updatedUser = await authService.updateProfile(data);
      setUser(updatedUser);
    });
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, logout, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
