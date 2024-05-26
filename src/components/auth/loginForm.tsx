/* eslint-disable prettier/prettier */
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface LoginFormProps {
  initialEmail?: string;
}

export const LoginForm = ({ initialEmail = '' }: LoginFormProps) => {
  const [formData, setFormData] = useState({
    email: initialEmail,
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      console.log('Login response data:', data); // Para verificar la estructura de la respuesta

      if (data && data.user && data.user.id) {
        localStorage.setItem('userId', data.user.id);
      } else {
        console.error('User ID not found in the response');
      }

      localStorage.setItem('isLoggedIn', 'true');
      router.push('/home');
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Login failed. Please check your credentials and try again');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col space-y-4 bg-white p-6 rounded-lg shadow-md max-w-md mx-auto"
    >
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="input"
        disabled={loading}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        className="input"
        disabled={loading}
      />
      <button type="submit" className="btn" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
      {error && <p className="error">{error}</p>}
    </form>
  );
};

export default LoginForm;
