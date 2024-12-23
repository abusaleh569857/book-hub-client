import React from "react";
import Slider from "./Slider";
import BookCategoryCard from "./BookCategoryCard"; // Create a BookCategoryCard component for categories
import UserReviews from "./UserReviews"; // Extra section - User Reviews
import UpcomingBookReleases from "./UpcomingBookReleases";

const Home = () => {
  return (
    <div className="home-container overflow-x-hidden">
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
      <section className="extra-section py-8">
        <UserReviews />
      </section>
    </div>
  );
};

export default Home;
