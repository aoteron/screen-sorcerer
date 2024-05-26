'use client';
import React from 'react';
import MovieForm from '@/components/MovieForm';

const CreateMoviePage = () => {
  return (
    <div className="main-content flex flex-col items-center justify-center p-6">
      <h1 className="text-2xl font-bold mb-4">Create a New Movie</h1>
      <MovieForm />
    </div>
  );
};

export default CreateMoviePage;
