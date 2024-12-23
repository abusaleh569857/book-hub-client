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
            src="https://i.ibb.co.com/ZcQ7mnH/visa3.png"
            alt="Slide 1"
            className="w-full h-80 object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-10 flex items-center justify-center text-white text-xl font-bold">
            <p>Explore Amazing Visa Options</p>
          </div>
        </div>
        <div className="relative">
          <img
            src="https://i.ibb.co.com/N3rS5Bf/visa4.png"
            alt="Slide 2"
            className="w-full h-80 object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-10 flex items-center justify-center text-white text-xl font-bold">
            <p>Fast and Reliable Visa Processing</p>
          </div>
        </div>
        <div className="relative">
          <img
            src="https://i.ibb.co.com/LdQjdrd/visa6.png"
            alt="Slide 3"
            className="w-full h-80 object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-10 flex items-center justify-center text-white text-xl font-bold">
            <p>Your Dream Destination Awaits</p>
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default SliderComponent;
