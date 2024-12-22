import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  // Fetch all books from the database
  useEffect(() => {
    fetch("http://localhost:5000/all-books")
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((error) => console.error("Error fetching books:", error));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">All Books</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {books.map((book) => (
          <div
            key={book._id}
            className="border rounded-lg shadow-md p-4 bg-white"
          >
            <img
              src={book.image}
              alt={book.name}
              className="w-full h-48 object-cover rounded-md"
            />
            <h2 className="text-lg font-semibold mt-2">{book.name}</h2>
            <p className="text-sm text-gray-600">Author: {book.author}</p>
            <p className="text-sm text-gray-600">Category: {book.category}</p>
            <p className="text-sm text-gray-600">Rating: {book.rating}/5</p>

            <Link to={`/update-book/${book._id}`}>
              <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                Update
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllBooks;
