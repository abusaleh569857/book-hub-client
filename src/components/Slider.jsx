import React from "react";
import { Swiper, SwiperSlide } from "swiper/react"; // Import Swiper and SwiperSlide
import "swiper/css"; // Import Swiper's main CSS styles

const Slider = () => {
  return (
    <Swiper
      spaceBetween={50} // Space between slides
      slidesPerView={1} // Number of slides to show at once
      autoplay={{ delay: 5000 }} // Autoplay slides with a delay of 5 seconds
      loop={true} // Enable loop for infinite sliding
    >
      {/* Each slide */}
      <SwiperSlide>
        <div className="slide bg-blue-500 text-white text-center py-20">
          <h2 className="text-4xl">Welcome to Our Bookstore!</h2>
          <p className="text-xl mt-4">Discover a world of knowledge</p>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="slide bg-green-500 text-white text-center py-20">
          <h2 className="text-4xl">Featured Books</h2>
          <p className="text-xl mt-4">Check out our latest arrivals</p>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="slide bg-red-500 text-white text-center py-20">
          <h2 className="text-4xl">Special Discounts</h2>
          <p className="text-xl mt-4">Don't miss out on amazing offers</p>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default Slider;
