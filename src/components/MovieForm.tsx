import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

interface MovieData {
  name: string;
  score: string;
  synopsis: string;
  genre: string;
  image: string;
}

const MovieForm = () => {
  const [movieData, setMovieData] = useState<MovieData>({
    name: '',
    score: '',
    synopsis: '',
    genre: '',
    image: '',
  });
  const [fileName, setFileName] = useState<string | null>('');
  const [file, setFile] = useState<File | null>(null);

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setMovieData({ ...movieData, [name]: value });
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files ? event.target.files[0] : null;
    if (selectedFile) {
      setFileName(selectedFile.name);
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const userId = localStorage.getItem('userId'); // Obtener el userId del almacenamiento local
    if (!userId) {
      console.error('User not logged in');
      alert('Please log in to create a movie');
      return;
    }

    if (!file) {
      console.error('No file selected');
      alert('Please select a file');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append(
        'upload_preset',
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
      );

      const uploadResponse = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (uploadResponse.status !== 200) {
        throw new Error(
          `Image upload failed with status code ${uploadResponse.status}`
        );
      }

      const imageUrl = uploadResponse.data.secure_url;
      const movieDataWithImage = {
        ...movieData,
        image: imageUrl,
        userId,
      };

      console.log('Sending data to backend:', movieDataWithImage);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/movie/create`,
        movieDataWithImage,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 201) {
        alert('Movie created successfully.');
        setMovieData({
          name: '',
          score: '',
          synopsis: '',
          genre: '',
          image: '',
        });
        setFileName(null);
        setFile(null);
      } else {
        throw new Error(
          `Movie creation failed with status code ${response.status}`
        );
      }
    } catch (error: any) {
      console.error('Error creating movie:', error.message || error);
      alert(`Failed to create movie. Error: ${error.message || error}`);
    }
  };

  return (
    <div className="form-container flex flex-col items-center justify-center min-h-screen py-2">
      <h2 className="text-2xl font-bold mb-4">Create a New Movie</h2>
      <form
        onSubmit={handleSubmit}
        className="movie-form bg-white p-6 rounded-lg shadow-md w-full max-w-md space-y-4"
      >
        <input
          type="text"
          name="name"
          placeholder="Movie name"
          value={movieData.name}
          onChange={handleInputChange}
          className="input text-sm"
        />
        <input
          type="text"
          name="score"
          placeholder="Score: from 1 to 10"
          value={movieData.score}
          onChange={handleInputChange}
          className="input text-sm"
        />
        <textarea
          name="synopsis"
          placeholder="Synopsis"
          value={movieData.synopsis}
          onChange={handleInputChange}
          className="input text-sm"
        />
        <input
          type="text"
          name="genre"
          placeholder="Genre"
          value={movieData.genre}
          onChange={handleInputChange}
          className="input text-sm"
        />
        <div className="file-input-container flex flex-col items-start">
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            className="file-input text-sm"
          />
          {fileName && <span className="file-name text-sm">{fileName}</span>}
        </div>
        <button type="submit" className="btn text-sm">
          Create Movie
        </button>
      </form>
    </div>
  );
};

export default MovieForm;
