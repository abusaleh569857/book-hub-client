// Frontend: UpdateBook.jsx

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateBook = () => {
  const { id } = useParams(); // Get book ID from URL
  const navigate = useNavigate();
  const [bookData, setBookData] = useState({
    image: "",
    name: "",
    author: "",
    category: "Novel",
    rating: "",
  });

  // Fetch existing book data
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`http://localhost:5000/books/${id}`);
        const data = await response.json();
        setBookData(data);
      } catch (error) {
        console.error("Error fetching book:", error);
      }
    };
    fetchBook();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData({ ...bookData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:5000/books/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookData),
      });

      if (response.ok) {
        toast.success("Book updated successfully!");
        setTimeout(() => navigate("/all-books"), 2000);
      } else {
        toast.error("Failed to update book.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-4">Update Book</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Image URL:</label>
          <input
            type="text"
            name="image"
            value={bookData.image}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label>Book Title:</label>
          <input
            type="text"
            name="name"
            value={bookData.name}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label>Author Name:</label>
          <input
            type="text"
            name="author"
            value={bookData.author}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label>Category:</label>
          <select
            name="category"
            value={bookData.category}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="Novel">Novel</option>
            <option value="Thriller">Thriller</option>
            <option value="History">History</option>
            <option value="Drama">Drama</option>
            <option value="Sci-Fi">Sci-Fi</option>
          </select>
        </div>
        <div>
          <label>Rating (1-5):</label>
          <input
            type="number"
            name="rating"
            value={bookData.rating}
            onChange={handleChange}
            min="1"
            max="5"
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Update Book
        </button>
      </form>
    </div>
  );
};

export default UpdateBook;
