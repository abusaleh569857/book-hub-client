import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bookData, setBookData] = useState({
    image: "",
    name: "",
    author: "",
    category: "Novel",
    rating: "",
  });
  const [loading, setLoading] = useState(true);

  // Fetch book data
  useEffect(() => {
    fetch(`https://library-management-system-server-sand.vercel.app/book/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch book data.");
        }
        return res.json();
      })
      .then((data) => {
        setBookData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to fetch book details.");
        setLoading(false);
      });
  }, [id]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData({ ...bookData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedBook = { ...bookData };
    delete updatedBook._id; // Remove _id before sending

    try {
      const response = await fetch(
        `https://library-management-system-server-sand.vercel.app/books/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedBook), // Send updatedBook without _id
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update book.");
      }

      toast.success("Book updated successfully!");
      setTimeout(() => navigate("/all-books"), 2000); // Navigate back after success
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.message || "An error occurred. Please try again.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

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
