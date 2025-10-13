// src/pages/customer/Feedback.jsx
import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const Feedback = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([
    { name: "Alice", rating: 5, comment: "Amazing turf! Loved it.", date: new Date() },
    { name: "Bob", rating: 4, comment: "Great turf, nice experience.", date: new Date() },
    { name: "Charlie", rating: 3, comment: "Good but can improve lighting.", date: new Date() },
    { name: "Diana", rating: 5, comment: "Perfect booking experience!", date: new Date() },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0 || comment.trim() === "") return;

    const newReview = {
      name: "You",
      rating,
      comment,
      date: new Date(),
    };
    setReviews([newReview, ...reviews]);
    setRating(0);
    setComment("");
  };

  return (
    <div className="min-h-screen bg-green-50 p-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-green-900 mb-8">Give Your Feedback</h1>

      {/* Feedback Form */}
      <div className="bg-white p-6 rounded-3xl shadow-xl w-full max-w-xl mb-12">
        <h2 className="text-2xl font-semibold text-green-800 mb-6">Rate Your Experience</h2>

        {/* Star Rating */}
        <div className="flex mb-4 justify-center">
          {[...Array(5)].map((_, i) => {
            const ratingValue = i + 1;
            return (
              <label key={i}>
                <input
                  type="radio"
                  name="rating"
                  value={ratingValue}
                  className="hidden"
                  onClick={() => setRating(ratingValue)}
                />
                <FaStar
                  size={40}
                  className="cursor-pointer transform transition-transform duration-200 hover:scale-125"
                  color={ratingValue <= (hover || rating) ? "#16a34a" : "#d1d5db"}
                  onMouseEnter={() => setHover(ratingValue)}
                  onMouseLeave={() => setHover(0)}
                />
              </label>
            );
          })}
        </div>
         
<textarea
value={comment}
onChange={(e) => setComment(e.target.value)}
placeholder="Write your feedback..."
className="w-full border border-green-300 rounded-2xl p-4 mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"
rows={4}
/>

<button
onClick={handleSubmit}
className="w-full py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-2xl transition-colors"
>
Submit Feedback
</button>
</div>

{/* Reviews Carousel */}
<div className="w-full max-w-6xl overflow-x-auto flex space-x-6 pb-6">
{reviews.map((review, index) => (
<div
key={index}
className="min-w-[300px] bg-white p-5 rounded-3xl shadow-lg flex-shrink-0 transform transition-transform duration-300 hover:scale-105"
>
<div className="flex items-center mb-2 justify-between">
<div className="flex items-center">
{[...Array(5)].map((_, i) => (
<FaStar
key={i}
size={20}
color={i < review.rating ? "#16a34a" : "#d1d5db"}
/>
))}
<span className="ml-2 font-semibold text-green-900">{review.name}</span>
</div>
<div className="text-xs text-gray-500">
{new Date(review.date).toLocaleDateString()}
</div>
</div>
<p className="text-gray-700 mt-2">{review.comment}</p>
</div>
))}
</div>
</div>
);
};

export default Feedback;