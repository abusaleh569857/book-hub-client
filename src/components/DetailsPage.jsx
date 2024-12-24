import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "./Provider/AuthProvider";

const DetailsPage = () => {
  const { user } = useContext(AuthContext);

  const { id } = useParams(); // Get book ID from URL
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [returnDate, setReturnDate] = useState("");
  const [isBookBorrowed, setIsBookBorrowed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the book details
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/allbooks/${id}`);
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
      const response = await fetch(`http://localhost:5000/borrowedbooks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firebaseUID: user.uid, // User UID
          email: user.email, // User Email
          bookId: book._id, // Book ID
          bookName: book.name,
          author: book.author,
          category: book.category,
          image: book.image,
          quantity: 1, // Initial quantity
          returnDate,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to borrow the book");
      }

      await fetch(`http://localhost:5000/books/decrement/${book._id}`, {
        method: "PUT",
      });

      toast.success("Book borrowed successfully!");
      setIsBookBorrowed(true);
      setShowModal(false);
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="book-details py-8">
      <h2 className="text-3xl font-semibold">{book.name}</h2>
      <p>{book.author}</p>
      <p>{book.description}</p>
      <p>Rating: {book.rating}</p>
      <p>Quantity: {book.quantity}</p>

      <img
        src={book.image}
        alt={book.name}
        className="w-full h-96 object-cover"
      />

      <button
        className="btn btn-primary mt-4"
        onClick={() => setShowModal(true)}
        disabled={book.quantity <= 0 || isBookBorrowed}
      >
        Borrow
      </button>

      {/* DaisyUI Modal */}
      {showModal && (
        <dialog id="borrow_modal" className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Borrow Book</h3>
            <div className="py-4">
              <label className="block mb-2">Return Date</label>
              <input
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                className="p-2 border rounded mb-4 w-full"
              />
              <div>
                <p>
                  <strong>Name:</strong> {user?.displayName || "N/A"}
                </p>
                <p>
                  <strong>Email:</strong> {user?.email || "N/A"}
                </p>
              </div>
            </div>
            <div className="modal-action">
              <button className="btn" onClick={() => setShowModal(false)}>
                Close
              </button>
              <button className="btn btn-primary" onClick={handleBorrow}>
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
