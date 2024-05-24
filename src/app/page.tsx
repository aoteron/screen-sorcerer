"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { handleEmailChange, handleSubmit } from '@/services/authUtils';
import { WelcomePage } from '../components/welcome/welcome';

export default function App() {
  
  const [email, setEmail] = useState('');
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuthentication = () => {
      const loggedIn = localStorage.getItem('isLoggedIn');
      setIsLoggedIn(!!loggedIn);
    };
    checkAuthentication();

    if (isLoggedIn) {
      router.push('/home');
    }
  }, [isLoggedIn, router]);

  return (
    <WelcomePage
      email={email}
      handleEmailChange={(e) => handleEmailChange(e, setEmail)}
      handleSubmit={(e) => handleSubmit(e, email, router)}
      router={router}
    />
  );
}
