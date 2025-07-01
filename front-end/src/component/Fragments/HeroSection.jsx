import { Fragment, useState, useEffect } from "react";
import slides from "../../utils/hero.jsx";
import Hero from "../Elements/Hero.jsx";

// eslint-disable-next-line react/prop-types
const HeroSection = ({ children }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, []);
  return (
    <Fragment>
      <section
        className="flex flex-col gap-3"
        data-aos="zoom-in"
        data-aos-duration="1000"
      >
        <Hero
          rounded={"rounded-xl"}
          src={slides[currentSlide].image}
          title={slides[currentSlide].title}
          subtitle={slides[currentSlide].subtitle}
          description={slides[currentSlide].description}
          buttonText={slides[currentSlide].buttonText}
          link={slides[currentSlide].link}
          buttonStyle={"bg-yellowejp rounded-lg w-28 text-black h-10 p-2"}
        >
          <div className="flex justify-between items-center mt-3">
            <button
              onClick={handlePrevSlide}
              className="w-10 h-10 rounded-full border-2 flex justify-center items-center border-black"
            >
              <i className="fas fa-arrow-left text-xl cursor-pointer text-black"></i>
            </button>
            <div className="flex gap-2">
              {slides.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    currentSlide === index ? "bg-black" : "bg-gray-300"
                  }`}
                ></div>
              ))}
            </div>
            <button
              onClick={handleNextSlide}
              className="w-10 h-10 rounded-full border-2 flex justify-center items-center border-black"
            >
              <i className="fas fa-arrow-right text-xl cursor-pointer text-black"></i>
            </button>
          </div>
          <div id="about"></div>
        </Hero>

        {children}
      </section>
    </Fragment>
  );
};

export default HeroSection;
