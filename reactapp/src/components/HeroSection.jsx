import React from 'react';

const HeroSection = () => {
  return (
    <div
      className="h-96 bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url('https://images.unsplash.com/photo-1599058917215-92d993aaedf2?auto=format&fit=crop&w=1470&q=80')` }}
    >
      <h1 className="text-white text-5xl font-bold bg-black bg-opacity-50 p-6 rounded">
        Book Your Favorite Turf Instantly
      </h1>
    </div>
  );
};

export default HeroSection;
