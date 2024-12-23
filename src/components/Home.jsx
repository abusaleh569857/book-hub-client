import React from "react";
import { Link } from "react-router-dom";
import Slider from "./Slider"; // Create a Slider component for the banner
import BookCategoryCard from "./BookCategoryCard"; // Create a BookCategoryCard component for categories
import FeaturedBooks from "./FeaturedBooks"; // Extra section - Featured Books
import UserReviews from "./UserReviews"; // Extra section - User Reviews

const Home = () => {
  return (
    <div className="home-container">
      {/* Banner/Slider Section */}
      <section className="banner-section">
        <Slider />
      </section>

      {/* Book Categories Section */}
      <section className="book-categories-section py-8">
        <h2 className="text-3xl font-semibold text-center mb-8">
          Book Categories
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Category Cards */}
          {["Fiction", "Science", "History", "Technology"].map(
            (category, index) => (
              <BookCategoryCard key={index} category={category} />
            )
          )}
        </div>
      </section>

      {/* Extra Sections */}
      <section className="extra-section py-8">
        <FeaturedBooks />
      </section>

      <section className="extra-section py-8">
        <UserReviews />
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
