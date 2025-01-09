import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Importing axios
import { useContext } from "react";
import { AuthContext } from "./Provider/AuthProvider";

const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Fetch all books from the database using axios
  useEffect(() => {
    axios
      .get("http://localhost:5000/all-books", {
        params: { email: user.email },
        withCredentials: true, // Ensures cookies are sent
      }) // Axios GET request
      .then((res) => {
        setBooks(res.data); // Accessing response data directly
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
      });
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
