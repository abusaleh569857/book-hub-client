import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddBook = () => {
  const [bookData, setBookData] = useState({
    image: "",
    name: "",
    quantity: "",
    author: "",
    category: "Novel",
    description: "",
    about: "",
    rating: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData({ ...bookData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/add-book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookData),
      });

      if (response.ok) {
        toast.success("Book added successfully!");
        navigate("/all-books");
      } else {
        toast.error("Failed to add book.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add a New Book</h1>

      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        <div>
          <label className="block font-medium">Image URL:</label>
          <input
            type="text"
            name="image"
            value={bookData.image}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Book Title:</label>
          <input
            type="text"
            name="name"
            value={bookData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Quantity:</label>
          <input
            type="number"
            name="quantity"
            value={bookData.quantity}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Author Name:</label>
          <input
            type="text"
            name="author"
            value={bookData.author}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Category:</label>
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
          <label className="block font-medium">Short Description:</label>
          <textarea
            name="description"
            value={bookData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          ></textarea>
        </div>

        <div>
          <label className="block font-medium">About the Book:</label>
          <textarea
            name="about"
            value={bookData.about}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          ></textarea>
        </div>

        <div>
          <label className="block font-medium">Rating (1-5):</label>
          <input
            type="number"
            name="rating"
            value={bookData.rating}
            onChange={handleChange}
            min="1"
            max="5"
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Add Book
        </button>
      </form>
    </div>
  );
};

export default AddBook;
