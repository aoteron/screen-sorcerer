"use client";

import { useState } from 'react';

export const SignUpForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Failed to create user');
      }
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4 bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
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
      <button type="submit" className="btn">Sign Up</button>
    </form>
  );
};

export default SignUpForm;
