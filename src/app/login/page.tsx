'use client';
import LoginForm from '@/components/auth/signInForm';
import { useSearchParams } from 'next/navigation';

export default function LoginPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';

  return (
    <div className="main-content flex flex-col items-center justify-center p-6">
      <LoginForm initialEmail={email} />
    </div>
  );
}
