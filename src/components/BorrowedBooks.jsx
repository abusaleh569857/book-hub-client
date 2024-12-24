// import React, { useEffect, useState, useContext } from "react";
// import { AuthContext } from "./Provider/AuthProvider";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const BorrowedBooks = () => {
//   const { user } = useContext(AuthContext);
//   const [borrowedBooks, setBorrowedBooks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (user && user.uid) {
//       const fetchBorrowedBooks = async () => {
//         try {
//           const response = await fetch(
//             `http://localhost:5000/borrowedbooks?uid=${user.uid}`
//           );
//           if (!response.ok) {
//             throw new Error("Failed to fetch borrowed books");
//           }
//           const data = await response.json();
//           setBorrowedBooks(data);
//           setLoading(false);
//         } catch (err) {
//           setError("Error fetching borrowed books");
//           setLoading(false);
//         }
//       };

//       fetchBorrowedBooks();
//     }
//   }, [user]);

//   if (loading)
//     return (
//       <p className="text-center text-blue-600">Loading borrowed books...</p>
//     );
//   if (error) return <p className="text-red-600">{error}</p>;

//   return (
//     <div className="container mx-auto p-6">
//       <h2 className="text-3xl font-bold text-center text-indigo-600 mb-8">
//         My Borrowed Books
//       </h2>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {borrowedBooks.length === 0 ? (
//           <p className="text-center text-gray-500">
//             You haven't borrowed any books yet.
//           </p>
//         ) : (
//           borrowedBooks.map((book) => (
//             <div
//               key={book.bookId}
//               className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 p-6 rounded-lg shadow-lg text-white"
//             >
//               <img
//                 src={book.image}
//                 alt={book.bookName}
//                 className="w-full h-56 object-cover rounded-md mb-4"
//               />
//               <h3 className="text-xl font-semibold">{book.bookName}</h3>
//               <p className="text-sm">{book.author}</p>
//               <p className="text-sm mt-2">
//                 Return Date: {new Date(book.returnDate).toLocaleDateString()}
//               </p>
//               <button
//                 className="mt-4 bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded-full"
//                 onClick={() =>
//                   toast.info("You cannot return books online yet!")
//                 }
//               >
//                 Return Book
//               </button>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default BorrowedBooks;

import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "./Provider/AuthProvider";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BorrowedBooks = () => {
  const { user } = useContext(AuthContext);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user && user.uid) {
      const fetchBorrowedBooks = async () => {
        try {
          const response = await fetch(
            `http://localhost:5000/borrowedbooks?uid=${user.uid}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch borrowed books");
          }
          const data = await response.json();
          setBorrowedBooks(data);
          setLoading(false);
        } catch (err) {
          setError("Error fetching borrowed books");
          setLoading(false);
        }
      };

      fetchBorrowedBooks();
    }
  }, [user]);

  if (loading)
    return (
      <p className="text-center text-blue-600">Loading borrowed books...</p>
    );
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="container mx-auto p-6">
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
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BorrowedBooks;
