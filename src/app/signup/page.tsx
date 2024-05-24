"use client";

import SignUpForm from '@/components/signUp/signUpForm';
import { useSearchParams } from 'next/navigation';


export default function SignUpPage() {
    const searchParams = useSearchParams();
    const email = searchParams.get('email') || '';
  
    return (
      <div className="main-content flex flex-col items-center justify-center p-6">
        <SignUpForm initialEmail={email} />
      </div>
    );
  }
