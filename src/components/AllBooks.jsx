import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "./Provider/AuthProvider";
import UseTitle from "./Title/UseTitle";
import { ClipLoader } from "react-spinners";

const AllBooks = () => {
  UseTitle();
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [view, setView] = useState("Card");
  const [showAvailable, setShowAvailable] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc");
  const { user } = useContext(AuthContext);

  // Fetch all books
  useEffect(() => {
    axios
      .get(
        "https://library-management-system-server-sand.vercel.app/all-books",
        {
          params: { email: user.email },
          withCredentials: true,
        }
      )
      .then((res) => {
        setBooks(res.data);
        setFilteredBooks(res.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Error fetching books");
        setLoading(false);
      });
  }, [user.email]);

  // Handle View Change
  const handleViewChange = (e) => {
    setView(e.target.value);
  };

  // Handle Show Available Books Filter
  const toggleShowAvailable = () => {
    if (showAvailable) {
      setFilteredBooks(books);
    } else {
      const availableBooks = books.filter((book) => book.quantity > 0);
      setFilteredBooks(availableBooks);
    }
    setShowAvailable(!showAvailable);
  };

  // Handle Sort Order Change from Dropdown
  const handleSortChange = (e) => {
    const order = e.target.value;
    setSortOrder(order);

    const sortedBooks = [...filteredBooks].sort((a, b) => {
      return order === "asc"
        ? a.quantity - b.quantity
        : b.quantity - a.quantity;
    });

    setFilteredBooks(sortedBooks);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">All Books</h1>

      {/* Controls for View and Filter */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
        {/* View Toggle */}
        <div>
          <label htmlFor="view" className="mr-2 font-semibold">
            Select View:
          </label>
          <select
            id="view"
            value={view}
            onChange={handleViewChange}
            className="border py-2 px-3 rounded"
          >
            <option value="Card">Card View</option>
            <option value="Table">Table View</option>
          </select>
        </div>

        {/* Sort by Quantity */}
        <div>
          <label htmlFor="sort" className="mr-2 font-semibold">
            Sort by Quantity:
          </label>
          <select
            id="sort"
            value={sortOrder}
            onChange={handleSortChange}
            className="border py-2 px-3 rounded"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>

        {/* Show Available Books Button */}
        <button
          onClick={toggleShowAvailable}
          className="py-2 px-4 rounded font-semibold bg-blue-600 text-white"
        >
          {showAvailable ? "Show All Books" : "Show Available Books"}
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex justify-center items-center">
          <ClipLoader size={50} color="#4A90E2" />
        </div>
      )}

      {/* Error */}
      {error && <p className="text-center text-red-600">{error}</p>}

      {/* Views */}
      {!loading && view === "Card" ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredBooks.map((book) => (
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
              <p className="text-sm text-gray-600">Quantity: {book.quantity}</p>

              <Link to={`/update-book/${book._id}`}>
                <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                  Update
                </button>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        !loading && (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border rounded-lg shadow-md">
              <thead>
                <tr>
                  <th className="px-4 py-2 border-b">Name</th>
                  <th className="px-4 py-2 border-b">Author</th>
                  <th className="px-4 py-2 border-b">Category</th>
                  <th className="px-4 py-2 border-b">Rating</th>
                  <th className="px-4 py-2 border-b">Quantity</th>
                  <th className="px-4 py-2 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBooks.map((book) => (
                  <tr key={book._id} className="border-b">
                    <td className="px-4 py-2">{book.name}</td>
                    <td className="px-4 py-2">{book.author}</td>
                    <td className="px-4 py-2">{book.category}</td>
                    <td className="px-4 py-2">{book.rating}/5</td>
                    <td className="px-4 py-2">{book.quantity}</td>
                    <td className="px-4 py-2">
                      <Link to={`/update-book/${book._id}`}>
                        <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                          Update
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      )}
    </div>
  );
};

export default AllBooks;
