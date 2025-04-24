import React from "react";
import Slider from "./Slider";
import BookCategoryCard from "./BookCategoryCard"; // Create a BookCategoryCard component for categories
import UserReviews from "./UserReviews"; // Extra section - User Reviews
import UpcomingBookReleases from "./UpcomingBookReleases";
import UseTitle from "./Title/UseTitle";

const Home = () => {
  UseTitle();
  return (
    <div className="home-container overflow-x-hidden">
      {/* Header Message */}
      <header className="header-message bg-blue-200 text-blue-800 py-6 text-center text-xl font-semibold shadow">
        Welcome to BookHub - Your Gateway to Endless Stories!
      </header>
      {/* Banner Section */}
      <section className="banner-section">
        <Slider />
      </section>
      {/* Book Categories Section */}
      <section className="book-categories-section py-8">
        <h2 className="text-3xl font-semibold text-center mb-8">
          Book Categories
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mx-4">
          {/* Category Cards */}
          {["Novel", "Thriller", "History", "Sci-Fi"].map((category, index) => (
            <BookCategoryCard key={index} category={category} />
          ))}
        </div>
      </section>
      {/* Extra Sections */}
      <section className="extra-section py-8">
        <UpcomingBookReleases />
      </section>

      <section className="why-choose-bookhub py-16 bg-gray-50">
        <h2 className="text-3xl font-semibold text-center mb-12 text-gray-800">
          Why Choose BookHub?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mx-4">
          <div className="feature-card p-6 bg-white rounded-lg shadow-lg transform hover:scale-105 transition duration-300 text-center">
            <i className="text-4xl mb-4 text-blue-500 fas fa-book-open"></i>
            <h3 className="text-2xl font-bold text-gray-800">500+ Books</h3>
            <p className="mt-4 text-gray-600">
              Access a wide range of books from various categories.
            </p>
          </div>
          <div className="feature-card p-6 bg-white rounded-lg shadow-lg transform hover:scale-105 transition duration-300 text-center">
            <i className="text-4xl mb-4 text-green-500 fas fa-check-circle"></i>
            <h3 className="text-2xl font-bold text-gray-800">
              Borrow Instantly
            </h3>
            <p className="mt-4 text-gray-600">
              No waiting! Borrow your favorite books instantly.
            </p>
          </div>
          <div className="feature-card p-6 bg-white rounded-lg shadow-lg transform hover:scale-105 transition duration-300 text-center">
            <i className="text-4xl mb-4 text-red-500 fas fa-times-circle"></i>
            <h3 className="text-2xl font-bold text-gray-800">No Late Fees</h3>
            <p className="mt-4 text-gray-600">
              Keep the book as long as you need, with no extra charges.
            </p>
          </div>
          <div className="feature-card p-6 bg-white rounded-lg shadow-lg transform hover:scale-105 transition duration-300 text-center">
            <i className="text-4xl mb-4 text-yellow-500 fas fa-undo"></i>
            <h3 className="text-2xl font-bold text-gray-800">Easy Returns</h3>
            <p className="mt-4 text-gray-600">
              Returning books is quick and simple.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works py-16 bg-blue-50">
        <h2 className="text-3xl font-semibold text-center mb-12 text-gray-800">
          How It Works
        </h2>
        <div className="steps-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mx-4">
          <div className="step-card p-6 bg-white rounded-lg shadow-lg transform hover:scale-105 transition duration-300 text-center">
            <i className="text-4xl mb-4 text-blue-600 fas fa-search"></i>
            <h3 className="text-2xl font-bold text-gray-800">
              Browse Categories
            </h3>
            <p className="mt-4 text-gray-600">
              Explore books by category and find your next read.
            </p>
          </div>
          <div className="step-card p-6 bg-white rounded-lg shadow-lg transform hover:scale-105 transition duration-300 text-center">
            <i className="text-4xl mb-4 text-purple-600 fas fa-book"></i>
            <h3 className="text-2xl font-bold text-gray-800">Choose a Book</h3>
            <p className="mt-4 text-gray-600">
              Select your favorite book to borrow.
            </p>
          </div>
          <div className="step-card p-6 bg-white rounded-lg shadow-lg transform hover:scale-105 transition duration-300 text-center">
            <i className="text-4xl mb-4 text-green-600 fas fa-hand-point-right"></i>
            <h3 className="text-2xl font-bold text-gray-800">
              Borrow with One Click
            </h3>
            <p className="mt-4 text-gray-600">
              Click to borrow the book instantly and start reading!
            </p>
          </div>
          <div className="step-card p-6 bg-white rounded-lg shadow-lg transform hover:scale-105 transition duration-300 text-center">
            <i className="text-4xl mb-4 text-orange-600 fas fa-reply"></i>
            <h3 className="text-2xl font-bold text-gray-800">Return Anytime</h3>
            <p className="mt-4 text-gray-600">
              Once you’re done, return the book with ease.
            </p>
          </div>
        </div>
      </section>

      <section className="extra-section py-8">
        <UserReviews />
      </section>
    </div>
  );
};

export default Home;
