import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <img
        src="https://source.unsplash.com/600x400/?error,404"
        alt="404 Not Found"
        className="w-full max-w-md mb-6 rounded-xl shadow-lg"
      />
      <h1 className="text-5xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-6">Oops! The page you are looking for does not exist.</p>
      <Link
        to="/"
        className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
