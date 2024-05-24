'use client';

import SignUpForm from '@/components/signUp/signUpForm';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SignUpPage() {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');

  useEffect(() => {
    const email = searchParams.get('email');
    if (email) {
      setEmail(email);
    }
  }, [searchParams]);

  return (
    <div className="main-content">
      <SignUpForm initialEmail={email} />
    </div>
  );
}
