import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const CategoryPage = () => {
  const { category } = useParams();
  console.log(category);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch books for the selected category
    const fetchBooks = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/books/category/${category}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch books");
        }
        const data = await response.json();
        console.log(data); // Check if the data structure is correct
        setBooks(data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching books");
        setLoading(false);
      }
    };

    fetchBooks();
  }, [category]);

  return (
    <div className="category-page py-8">
      <h2 className="text-3xl font-semibold text-center mb-8">
        Books in {category.charAt(0).toUpperCase() + category.slice(1)} Category
      </h2>

      {loading && <p className="text-center">Loading books...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mx-4">
        {books.length === 0 ? (
          <p className="text-center">No books found for this category.</p>
        ) : (
          books.map((book, index) => (
            <div
              key={index}
              className="book-card bg-white p-6 rounded-lg shadow-lg"
            >
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-48 object-cover mb-4"
              />
              <h3 className="text-xl font-semibold">{book.title}</h3>
              <p className="text-gray-600">{book.author}</p>
              <p className="text-gray-500">Rating: {book.rating}</p>
              <p className="text-gray-500">Quantity: {book.quantity}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
