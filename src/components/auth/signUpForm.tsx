'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface SignUpFormProps {
  initialEmail?: string;
}

export const SignUpForm = ({ initialEmail = '' }: SignUpFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: initialEmail,
    password: '',
  });

  const router = useRouter();

  useEffect(() => {
    setFormData((formData) => ({ ...formData, email: initialEmail }));
  }, [initialEmail]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(`Changing ${e.target.name} to ${e.target.value}`); // Debugging
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Submitting form data:', formData); // Debugging
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/signup`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) {
        throw new Error('Failed to create user');
      }
      console.log('User created successfully'); // Debugging

      localStorage.setItem('isLoggedIn', 'true');
      router.push('/home');
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col space-y-4 bg-white p-6 rounded-lg shadow-md max-w-md mx-auto"
    >
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        className="input"
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="input"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        className="input"
      />
      <button type="submit" className="btn">
        Sign Up
      </button>
    </form>
  );
};

export default SignUpForm;
