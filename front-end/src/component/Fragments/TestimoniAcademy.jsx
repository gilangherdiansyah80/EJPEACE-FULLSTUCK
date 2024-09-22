import { useState, useEffect, useCallback, Fragment } from "react";
import Testimoni from "../../utils/testimoni";

const TestimoniAcademy = () => {
    const [currentTesti, setCurrentTesti] = useState(0);
    const [isLeaving, setIsLeaving] = useState(false);  // State for leaving animation
    const [isEntering, setIsEntering] = useState(false);

    const itemsTesti = 2; // Number of items to show per page
    const totalTesti = Math.ceil(Testimoni.length / itemsTesti); // Total number of pages

    // Memoize function to prevent recreation on each render
    const handlePrevSlideTesti = useCallback(() => {
        setIsLeaving(true);
        setTimeout(() => {
            setCurrentTesti((prev) => (prev === 0 ? totalTesti - 1 : prev - 1));
            setIsLeaving(false);
            setIsEntering(true);
        }, 300); // Set this to match your exit animation duration
    }, [totalTesti]);

    const handleNextSlideTesti = useCallback(() => {
        setIsLeaving(true);
        setTimeout(() => {
            setCurrentTesti((prev) => (prev === totalTesti - 1 ? 0 : prev + 1));
            setIsLeaving(false);
            setIsEntering(true);
        }, 300); // Set this to match your exit animation duration
    }, [totalTesti]);

    useEffect(() => {
        const interval = setInterval(() => {
            handleNextSlideTesti();
        }, 3000); // Adjusted to 3 seconds for better readability

        return () => clearInterval(interval); // Clear interval on component unmount
    }, [handleNextSlideTesti]);

    useEffect(() => {
        if (isEntering) {
            setTimeout(() => setIsEntering(false), 300); // Match this with enter animation duration
        }
    }, [isEntering]);

    const paginatedTesti = Testimoni.slice(
        currentTesti * itemsTesti,
        currentTesti * itemsTesti + itemsTesti
    );

    return (
        <Fragment>
            {/* Tablet & Desktop */}
            <section className="hidden md:block">
                <h1 className="text-center text-6xl font-bold">Testimoni</h1>
                <div className="flex flex-col justify-center items-center">
                    <div className="flex justify-between text-center items-center w-full mt-20">
                        <button
                            onClick={handlePrevSlideTesti}
                            className="w-10 h-10 rounded-full border-2 flex justify-center items-center border-black"
                        >
                            <i className="fas fa-arrow-left text-xl cursor-pointer text-black"></i>
                        </button>
                        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-2 w-full justify-center items-center">
                            {paginatedTesti.map((item) => (
                                <div key={item.id} className={`flex flex-col justify-center items-center gap-y-5 ${isLeaving ? "opacity-0 translate-x-full" : ""}
                                ${isEntering ? "opacity-0 translate-x-[-100%]" : "opacity-100 translate-x-0"}`}>
                                    <article>
                                        <p>{item.testi}</p>
                                    </article>
                                    <img src={item.image} className="w-16 h-16 rounded-full" alt={item.name} />
                                    <h2 className="text-xl font-semibold">{item.name}</h2>
                                </div>
                            ))}
                        </div>
                        <button
                            onClick={handleNextSlideTesti}
                            className="w-10 h-10 rounded-full border-2 flex justify-center items-center border-black"
                        >
                            <i className="fas fa-arrow-right text-xl cursor-pointer text-black"></i>
                        </button>
                    </div>

                    <div className="flex gap-2 mt-5">
                        {[...Array(totalTesti)].map((_, index) => (
                            <div
                                key={index}
                                className={`w-2 h-2 rounded-full ${
                                    currentTesti === index ? "bg-black" : "bg-gray-300"
                                }`}
                            ></div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mobile */}
            <section className="md:hidden">
                <h1 className="text-center text-6xl font-bold">Testimoni</h1>
                <div className="flex flex-col justify-center items-center">
                    <div className="flex justify-between text-center items-center w-full mt-20">
                        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-2 w-full justify-center items-center">
                            {paginatedTesti.map((item) => (
                                <div key={item.id} className={`flex flex-col justify-center items-center gap-y-5 ${isLeaving ? "opacity-0 translate-x-full" : ""}
                                ${isEntering ? "opacity-0 translate-x-[-100%]" : "opacity-100 translate-x-0"}`}>
                                    <article>
                                        <p>{item.testi}</p>
                                    </article>
                                    <img src={item.image} className="w-16 h-16 rounded-full" alt={item.name} />
                                    <h2 className="text-xl font-semibold">{item.name}</h2>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-x-7 gap-2 mt-5">
                        <button
                            onClick={handlePrevSlideTesti}
                            className="w-10 h-10 rounded-full border-2 flex justify-center items-center border-black"
                        >
                            <i className="fas fa-arrow-left text-xl cursor-pointer text-black"></i>
                        </button>

                        <div className="flex gap-2">
                            {[...Array(totalTesti)].map((_, index) => (
                                <div
                                    key={index}
                                    className={`w-2 h-2 rounded-full ${
                                        currentTesti === index ? "bg-black" : "bg-gray-300"
                                    }`}
                                ></div>
                            ))}
                        </div>

                        <button
                            onClick={handleNextSlideTesti}
                            className="w-10 h-10 rounded-full border-2 flex justify-center items-center border-black"
                        >
                            <i className="fas fa-arrow-right text-xl cursor-pointer text-black"></i>
                        </button>
                    </div>
                </div>
            </section>
        </Fragment>
    );
};

export default TestimoniAcademy;
