import React from "react";
import { Link } from "react-router-dom";

const BookCategoryCard = ({ category }) => {
  return (
    <div className="category-card bg-white border p-6 rounded-lg shadow-lg text-center">
      <img
        src={`images/${category}.jpg`}
        alt={category}
        className="w-full h-40 object-cover rounded-lg mb-4"
      />
      <h3 className="text-xl font-semibold">{category}</h3>
      <Link
        to={`/category/${category.toLowerCase()}`} // Link to category page
        className="mt-4 inline-block bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-800 transition duration-300"
      >
        See Books
      </Link>
    </div>
  );
};

export default BookCategoryCard;
