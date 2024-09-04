import { useState, useEffect, Fragment } from "react";
import Hero from "../Elements/Hero";
import HeroAcafemy from "../../utils/heroAcademy";

const HeroAcademySection = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    
    const handlePrevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? HeroAcafemy.length - 1 : prev - 1));
    };

    const handleNextSlide = () => {
        setCurrentSlide((prev) => (prev === HeroAcafemy.length - 1 ? 0 : prev + 1));
    };

    useEffect(() => {
        const interval = setInterval(() => {
            handleNextSlide();
        }, 15000);

        return () => clearInterval(interval);
    }, []);


    return (
        <Fragment>
            <Hero rounded={"rounded-xl"} src={HeroAcafemy[currentSlide].image} />
            <section className="flex flex-col items-center mt-3 gap-y-10">
                <div className="flex gap-2">
                    {HeroAcafemy.map((_, index) => (
                    <div
                        key={index}
                        className={`w-2 h-2 rounded-full ${
                        currentSlide === index ? "bg-black" : "bg-gray-300"
                        }`}
                    ></div>
                    ))}
                </div>
                <div className="flex gap-x-12">
                    <button
                    onClick={handlePrevSlide}
                    className="w-10 h-10 rounded-full border-2 flex justify-center items-center border-black"
                    >
                        <i className="fas fa-arrow-left text-xl cursor-pointer text-black"></i>
                    </button>
                
                    <button
                        onClick={handleNextSlide}
                        className="w-10 h-10 rounded-full border-2 flex justify-center items-center border-black"
                    >
                        <i className="fas fa-arrow-right text-xl cursor-pointer text-black"></i>
                    </button>
                </div>
                
            </section>

            <section className="flex flex-col gap-y-7">
                <div id="about"></div>
                <h1 className="text-3xl lg:text-6xl font-bold">EJ Peace Academy</h1>
                <article>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusantium nisi facere sapiente quibusdam vitae minima rem omnis? Id officiis animi sint. Numquam ad exercitationem natus maiores voluptates ullam sint ab praesentium est soluta veniam dolore non saepe nam, iste accusamus odio quam quidem harum vitae? Tempora deserunt asperiores pariatur sequi.
                </article>
                <button className="p-3 lg:px-7 bg-ejp text-white lg:py-2 rounded-md w-36 self-center">Learn More</button>
                    </section>
        </Fragment>
    )
}

export default HeroAcademySection;