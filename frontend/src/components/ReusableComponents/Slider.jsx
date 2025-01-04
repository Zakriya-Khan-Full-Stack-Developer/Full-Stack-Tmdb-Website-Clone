import React, { useRef } from "react";

const Slider = ({ children, slideWidth = 1200 }) => {
  const sliderRef = useRef(null);

  const slideLeft = () => sliderRef.current?.scrollBy({ left: -slideWidth, behavior: "smooth" });
  const slideRight = () => sliderRef.current?.scrollBy({ left: slideWidth, behavior: "smooth" });

  return (
    <div className="relative mt-6">
      <button
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-teal-600 text-white p-2 rounded-full shadow-lg hover:bg-teal-800"
        onClick={slideLeft}
      >
        &#8249;
      </button>

      <div
        ref={sliderRef}
        className="flex overflow-x-auto no-scrollbar"
        style={{ scrollBehavior: "smooth" }}
      >
        {children}
      </div>

      <button
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-teal-600 text-white p-2 rounded-full shadow-lg hover:bg-teal-800"
        onClick={slideRight}
      >
        &#8250;
      </button>
    </div>
  );
};

export default Slider;
