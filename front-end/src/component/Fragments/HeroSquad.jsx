import { useState, useEffect } from "react";
import Hero from "../Elements/Hero";
import HeroSquad from "../../utils/heroSquad";

const HeroSquadSection = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    
    const handlePrevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? HeroSquad.length - 1 : prev - 1));
    };

    const handleNextSlide = () => {
        setCurrentSlide((prev) => (prev === HeroSquad.length - 1 ? 0 : prev + 1));
    };

    useEffect(() => {
        const interval = setInterval(() => {
            handleNextSlide();
        }, 15000);

        return () => clearInterval(interval);
    }, []);


    return (
        <Hero rounded={"rounded-xl"} src={HeroSquad[currentSlide].image} style={'border-black border-2 border-solid'}>
                <div className="flex justify-between items-center mt-3">
                <button
                    onClick={handlePrevSlide}
                    className="w-10 h-10 rounded-full border-2 flex justify-center items-center border-black"
                >
                    <i className="fas fa-arrow-left text-xl cursor-pointer text-black"></i>
                </button>
                <div className="flex gap-2">
                    {HeroSquad.map((_, index) => (
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

                    <section className="flex flex-col gap-y-7">
                        <div id="about"></div>
                        <h1 className="text-3xl lg:text-6xl font-bold text-[#FFC255]">EJ Peace Academy</h1>
                        <article>
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusantium nisi facere sapiente quibusdam vitae minima rem omnis? Id officiis animi sint. Numquam ad exercitationem natus maiores voluptates ullam sint ab praesentium est soluta veniam dolore non saepe nam, iste accusamus odio quam quidem harum vitae? Tempora deserunt asperiores pariatur sequi.
                        </article>
                        <button className="p-3 lg:px-7 bg-ejp text-white lg:py-2 rounded-md w-36 self-center">Learn More</button>
                    </section>
                </Hero>
    )
}

export default HeroSquadSection;