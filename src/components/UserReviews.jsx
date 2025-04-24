import React from "react";
import { FaStar } from "react-icons/fa";

const reviewsData = [
  {
    id: 1,
    user: "John Doe",
    rating: 4,
    comment: "Great collection of books! Found everything I needed.",
  },
  {
    id: 2,
    user: "Jane Smith",
    rating: 5,
    comment: "Amazing selection, fast shipping, and great prices!",
  },
  {
    id: 3,
    user: "Alice Brown",
    rating: 3,
    comment: "Good books, but the delivery took longer than expected.",
  },
  // Add more reviews here as needed
];

const UserReviews = () => {
  return (
    <div className="user-reviews-container py-8">
      <h2 className="text-3xl font-semibold text-center mb-8">
        What Our Users Say
      </h2>
      <div className="reviews-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 px-4">
        {reviewsData.map((review) => (
          <div
            key={review.id}
            className="review-card bg-white p-6 rounded-lg shadow-lg text-center"
          >
            <h3 className="text-xl font-semibold mb-2">{review.user}</h3>
            <div className="rating mb-4">
              {/* Render stars based on the rating */}
              {[...Array(5)].map((_, index) => (
                <FaStar
                  key={index}
                  className={`inline-block text-yellow-500 ${
                    index < review.rating ? "fill-current" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <p className="text-gray-700 mb-4">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserReviews;
