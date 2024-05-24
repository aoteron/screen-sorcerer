"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function App() {
  const [email, setEmail] = useState('');
  const router = useRouter();
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  return (
    <main className="main-content flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Welcome!</h1>

      <div className="flex flex-col items-center justify-center w-full max-w-xs p-6 space-y-4 rounded-lg">
        <input
          type="email"
          placeholder="Enter your email"
          className="input"
          value={email}
          onChange={handleEmailChange}
        />
        <Link href={{ pathname: '/signup', query: { email } }} className="btn">
          Sign up
        </Link>
      </div>

      <p className="text-center mt-6">
        Already have an account?{' '}
        <Link href="/sign-in" className="text-rebecca-purple hover:underline">
          Sign in
        </Link>
      </p>
    </main>
  );
}
