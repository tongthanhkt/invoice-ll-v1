'use client';

import { AuthLayout } from '@/app/components';
import FormInput from '@/app/components/reusables/form-fields/FormInput/FormInput';
import { toast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { spinnerService } from '@/services/spinner.service';
import Link from 'next/link';
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      spinnerService.startSpinner();
      await login(email, password);
    } catch (err) {
      toast({
        variant: 'destructive',
        description: 'Invalid email or password',
      });
    } finally {
      spinnerService.endSpinner();
    }
  };

  return (
    <AuthLayout
      title="Login to your account"
      footerConfig={{
        description: "Don't have an account?",
        link: '/register',
        linkText: 'Sign up',
      }}
    >
      {/* <div className="lg:hidden text-center mb-4 text-sm text-blue-700">
        <p>Welcome back to Invoify!</p>
      </div> */}

      <form className="space-y-4 w-full max-w-full" onSubmit={handleSubmit}>
        <FormInput
          type="text"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          label="Email address"
          placeholder="Enter your email address"
        />

        <FormInput
          name="password"
          type="password"
          required
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="flex justify-end mb-2">
          <Link
            href="/forgot-password"
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors"
        >
          Sign in
        </button>
      </form>
    </AuthLayout>
  );
}
