'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function App() {
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/signup?email=${encodeURIComponent(email)}`);
  };

  return (
    <main className="main-content flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Welcome!</h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center w-full max-w-xs p-6 space-y-4 rounded-lg"
      >
        <input
          type="email"
          placeholder="Enter your email"
          className="input"
          value={email}
          onChange={handleEmailChange}
        />
        <button type="submit" className="btn">
          Sign up
        </button>
      </form>

      <p className="text-center mt-6">
        Already have an account?{' '}
        <Link href="/sign-in">
          <span className="text-rebecca-purple hover:underline cursor-pointer">
            Sign in
          </span>
        </Link>
      </p>
    </main>
  );
}
