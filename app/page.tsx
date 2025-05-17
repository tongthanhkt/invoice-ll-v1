'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();
  // const { user } = useAuth();

  useEffect(() => {
    const user = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user') || '{}').user : null;
    if (user) {
      router.push('/invoice');
    } else {
      router.push('/login');
    }
  }, [router]);

  return null;
}
