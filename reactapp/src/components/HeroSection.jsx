import React from "react";

export default function HeroSection() {
  return (
    <section className="relative w-full h-[90vh] flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://static.vecteezy.com/system/resources/thumbnails/007/448/879/small/soccer-field-with-green-grass-sport-lawn-background-photo.jpg')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-6 md:px-12">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Book Your Turf Anytime, Anywhere
        </h1>
        <p className="text-lg md:text-xl mb-8 text-gray-200">
          Hassle-free turf booking experience for football, cricket, and more — all in one place.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <a
            href="/login"
            className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-full font-semibold transition"
          >
            Book Now
          </a>
          <a
            href="/register"
            className="bg-transparent border-2 border-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-green-700 transition"
          >
            Join Us
          </a>
        </div>
      </div>
    </section>
  );
}
