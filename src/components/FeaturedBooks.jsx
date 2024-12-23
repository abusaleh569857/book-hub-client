import React from "react";

const FeaturedBooks = () => {
  return (
    <div className="featured-books-container">
      <h2 className="text-3xl font-semibold text-center mb-8">
        Featured Books
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {/* Example of featured books */}
        {["Book 1", "Book 2", "Book 3", "Book 4"].map((book, index) => (
          <div
            key={index}
            className="book-card bg-white border p-6 rounded-lg shadow-lg text-center"
          >
            <img
              src={`images/${book}.jpg`}
              alt={book}
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-semibold">{book}</h3>
            <p className="text-gray-600">Author Name</p>
            <Link
              to={`/book-details/${book}`}
              className="mt-4 inline-block text-blue-600 hover:text-blue-800"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedBooks;
