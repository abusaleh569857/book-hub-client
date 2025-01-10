import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./Provider/AuthProvider";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UseTitle from "./Title/UseTitle";

const BorrowedBooks = () => {
  const { user } = useContext(AuthContext);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  UseTitle();
  //console.log(borrowedBooks);

  useEffect(() => {
    if (user && user.uid) {
      const fetchBorrowedBooks = async () => {
        try {
          const response = await axios.get(
            `https://library-management-system-server-sand.vercel.app/borrowedbooks`,
            {
              params: { uid: user.uid, email: user.email },
              withCredentials: true, // Ensures cookies are sent
            }
          );
          console.log(response);

          if (response.data && response.data.length > 0) {
            setBorrowedBooks(response.data);
          } else {
            setBorrowedBooks([]); // Set an empty array if no books are found
            //console.log(borrowedBooks);
          }
          setLoading(false);
        } catch (err) {
          setError("Error fetching borrowed books");
          setLoading(false);
        }
      };

      fetchBorrowedBooks();
    }
  }, [user]);

  const handleReturnBook = async (bookId) => {
    try {
      // Send a request to return the book
      const response = await axios.post(
        `https://library-management-system-server-sand.vercel.app/returnbook`,
        { bookId, uid: user.uid, email: user.email },
        { withCredentials: true }
      );

      if (response.data.success) {
        // Remove the returned book from the state
        setBorrowedBooks((prevBooks) =>
          prevBooks.filter((book) => book.bookId !== bookId)
        );

        toast.success("Book returned successfully!");
      } else {
        toast.error("Failed to return the book.");
      }
    } catch (err) {
      toast.error("Error returning the book.");
    }
  };

  if (loading)
    return (
      <p className="text-center text-blue-600">Loading borrowed books...</p>
    );
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="container mx-auto p-6">
      <ToastContainer></ToastContainer>
      <h2 className="text-3xl font-bold text-center text-indigo-600 mb-8">
        My Borrowed Books
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {borrowedBooks.length === 0 ? (
          <p className="text-center text-gray-500">
            You haven't borrowed any books yet.
          </p>
        ) : (
          borrowedBooks.map((book) => (
            <div
              key={book.bookId}
              className="bg-white p-6 rounded-lg shadow-lg border border-gray-200"
            >
              <img
                src={book.image}
                alt={book.bookName}
                className="w-full h-56 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800">
                {book.bookName}
              </h3>
              <p className="text-sm text-gray-600">{book.author}</p>
              <p className="text-sm text-gray-600 mt-2">
                Return Date: {new Date(book.returnDate).toLocaleDateString()}
              </p>
              <button
                onClick={() => handleReturnBook(book.bookId)}
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Return Book
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BorrowedBooks;
