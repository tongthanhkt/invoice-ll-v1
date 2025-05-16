'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();
  // const { user } = useAuth();
  const user = JSON.parse(localStorage.getItem('user') || '{}').user;

  useEffect(() => {
    if (user) {
      router.push('/invoice');
    } else {
      router.push('/login');
    }
  }, [user, router]);

  return null;
}
