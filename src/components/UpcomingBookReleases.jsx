import React from "react";

const UpcomingBookReleases = () => {
  // Array of upcoming books (6 books)
  const upcomingBooks = [
    {
      title: "The Last Chapter",
      category: "Novel",
      releaseDate: "January 2025",
      image: "https://i.ibb.co.com/jL3wPP6/book6.jpg",
    },
    {
      title: "The Silent Scream",
      category: "Thriller",
      releaseDate: "February 2025",
      image: "https://i.ibb.co.com/sPXK995/book7.jpg",
    },
    {
      title: "The History of Empires",
      category: "History",
      releaseDate: "March 2025",
      image: "https://i.ibb.co.com/d7qbK2L/book5.jpg",
    },
    {
      title: "The Drama Unfolds",
      category: "Drama",
      releaseDate: "April 2025",
      image: "https://i.ibb.co.com/NFS6PZz/book3.jpg",
    },
    {
      title: "Space Odyssey: Beyond Earth",
      category: "Sci-Fi",
      releaseDate: "May 2025",
      image: "https://i.ibb.co.com/ZMCzHdd/book4.jpg",
    },
    {
      title: "A Mystery to Unravel",
      category: "Thriller",
      releaseDate: "June 2025",
      image: "https://i.ibb.co.com/TtdYLFt/book8.jpg",
    },
  ];

  return (
    <section className="upcoming-releases bg-gray-100 py-12">
      <h2 className="text-3xl text-center mb-8">Upcoming Book Releases</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 overflow-hidden">
        {upcomingBooks.map((book, index) => (
          <div
            key={index}
            className="release-card bg-white shadow-lg rounded-lg overflow-hidden"
          >
            <img
              src={book.image}
              alt={book.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-2xl font-semibold mb-2">{book.title}</h3>
              <p className="text-lg text-gray-600 mb-2">
                Category: {book.category}
              </p>
              <p className="text-md text-gray-500 mb-4">
                Release Date: {book.releaseDate}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default UpcomingBookReleases;
