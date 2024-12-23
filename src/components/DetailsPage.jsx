import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap"; // Using Bootstrap for the modal
import { useToast } from "react-toastify"; // For toast notifications

const DetailPage = () => {
  const { id } = useParams(); // Get book ID from URL
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [returnDate, setReturnDate] = useState("");
  const [user, setUser] = useState(null); // Logged-in user info
  const [isBookBorrowed, setIsBookBorrowed] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the book details
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/books/${id}`);
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
  }, [id, navigate]);

  const handleBorrow = async () => {
    if (book.quantity <= 0) {
      toast.error("Book is out of stock.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/books/borrow/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user._id,
          returnDate,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to borrow the book");
      }

      // Decrement book quantity using $inc
      const updateResponse = await fetch(
        `http://localhost:5000/books/${id}/update`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            quantity: -1,
          }),
        }
      );

      if (!updateResponse.ok) {
        throw new Error("Failed to update book quantity");
      }

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

      <Button
        className="mt-4"
        onClick={() => setShowModal(true)}
        disabled={book.quantity <= 0 || isBookBorrowed}
      >
        Borrow
      </Button>

      {/* Borrow Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Borrow Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <label className="block mb-2">Return Date</label>
            <input
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              className="p-2 border rounded mb-4 w-full"
            />
            <div>
              <p>
                <strong>Name:</strong> {user?.name}
              </p>
              <p>
                <strong>Email:</strong> {user?.email}
              </p>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleBorrow}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DetailPage;
