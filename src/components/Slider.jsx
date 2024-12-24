import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SliderComponent = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="mb-4">
      <Slider {...settings}>
        <div className="relative">
          <img
            src="https://i.ibb.co.com/2cYzqsy/7850051.jpg"
            alt="Slide 1"
            className="w-full h-80 object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-10 flex items-center justify-center text-white text-xl font-bold">
            <p>BookHub: Your Digital Library</p>
          </div>
        </div>
        <div className="relative">
          <img
            src="https://i.ibb.co.com/YjVyjmm/book1.jpg"
            alt="Slide 2"
            className="w-full h-80 object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-10 flex items-center justify-center text-white text-xl font-bold">
            <p>BookHub: Discover and Borrow Books</p>
          </div>
        </div>
        <div className="relative">
          <img
            src="https://i.ibb.co.com/tc7W0dr/book2.jpg"
            alt="Slide 3"
            className="w-full h-80 object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-10 flex items-center justify-center text-white text-xl font-bold">
            <p>BookHub: Explore, Read, Borrow</p>
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default SliderComponent;
