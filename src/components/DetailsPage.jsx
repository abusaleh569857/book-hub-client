import { useNavigate } from "react-router-dom"; // Import useNavigate
import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { AuthContext } from "./Provider/AuthProvider";

const DetailsPage = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate(); // Define navigate

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [returnDate, setReturnDate] = useState("");
  const [isBookBorrowed, setIsBookBorrowed] = useState(false);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(
          `https://library-management-system-server-sand.vercel.app/allbooks/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch book details");
        }
        const data = await response.json();
        setBook(data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching book details");
        setLoading(false);
      }
    };
    fetchBookDetails();
  }, [id]);

  const handleBorrow = async () => {
    if (!user || !user.uid) {
      toast.error("You need to be logged in to borrow books.");
      return;
    }

    if (book.quantity <= 0) {
      toast.error("Book is out of stock.");
      return;
    }

    try {
      const response = await fetch(
        `https://library-management-system-server-sand.vercel.app/borrowedbooks`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firebaseUID: user.uid,
            email: user.email,
            bookId: book._id,
            bookName: book.name,
            author: book.author,
            category: book.category,
            image: book.image,
            quantity: 1,
            returnDate,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to borrow the book");
      }

      await fetch(
        `https://library-management-system-server-sand.vercel.app/books/decrement/${book._id}`,
        {
          method: "PUT",
        }
      );

      toast.success("Book borrowed successfully!");

      setShowModal(false); // Close modal
      setIsBookBorrowed(true);

      // Navigate to Borrowed Books page immediately
      navigate("/borrowed-books");
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="py-8 flex justify-center">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="max-w-xl w-full bg-white rounded-lg shadow-lg p-6 space-y-4">
        <h2 className="text-3xl font-semibold text-center">{book.name}</h2>
        <p className="text-center">{book.author}</p>
        <p className="text-gray-700 text-center">{book.description}</p>
        <p className="text-gray-800 font-semibold text-center">
          Rating: {book.rating}
        </p>
        <p className="text-gray-800 font-semibold text-center">
          Quantity: {book.quantity}
        </p>
        <img
          src={book.image}
          alt={book.name}
          className="w-full h-72 object-cover rounded-lg"
        />
        <button
          className="btn btn-primary w-full py-2 mt-4 rounded-md bg-blue-600 text-white disabled:bg-gray-400"
          onClick={() => setShowModal(true)}
          disabled={book.quantity <= 0 || isBookBorrowed}
        >
          Borrow
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <dialog id="borrow_modal" className="modal modal-open">
          <div className="modal-box p-6 rounded-lg shadow-lg bg-white">
            <h3 className="font-bold text-lg mb-4">Borrow Book</h3>
            <div className="space-y-4">
              <label className="block text-gray-700">Return Date</label>
              <input
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                className="p-2 border rounded w-full"
              />
              <div className="space-y-2">
                <p>
                  <strong>Name:</strong> {user?.displayName || "N/A"}
                </p>
                <p>
                  <strong>Email:</strong> {user?.email || "N/A"}
                </p>
              </div>
            </div>
            <div className="modal-action mt-6 flex justify-end">
              <button
                className="btn bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-md mr-2"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
              <button
                className="btn bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                onClick={handleBorrow}
              >
                Submit
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default DetailsPage;
