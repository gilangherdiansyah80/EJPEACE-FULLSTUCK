import { useState, useEffect, useCallback } from "react";
import Card from "../Elements/Card";
import Highlight from "../../utils/highlight";

const ProgramHighlight = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [isLeaving, setIsLeaving] = useState(false);  // State for leaving animation
    const [isEntering, setIsEntering] = useState(false); // State for entering animation

    const itemsPerPage = 3;
    const totalPages = Math.ceil(Highlight.length / itemsPerPage);

    const handlePrevSlideHighlight = useCallback(() => {
        setIsLeaving(true);
        setTimeout(() => {
            setCurrentPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
            setIsLeaving(false);
            setIsEntering(true);
        }, 300); // Set this to match your exit animation duration
    }, [totalPages]);

    const handleNextSlideHighlight = useCallback(() => {
        setIsLeaving(true);
        setTimeout(() => {
            setCurrentPage((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
            setIsLeaving(false);
            setIsEntering(true);
        }, 300); // Set this to match your exit animation duration
    }, [totalPages]);

    useEffect(() => {
        const interval = setInterval(() => {
            handleNextSlideHighlight();
        }, 15000);

        return () => clearInterval(interval);
    }, [handleNextSlideHighlight]);

    useEffect(() => {
        if (isEntering) {
            setTimeout(() => setIsEntering(false), 300); // Match this with enter animation duration
        }
    }, [isEntering]);

    const paginatedProgram = Highlight.slice(
        currentPage * itemsPerPage,
        currentPage * itemsPerPage + itemsPerPage
    );

    return (
        <section className="flex flex-col gap-y-10">
            <h1 className="text-3xl lg:text-6xl font-bold">Program Highlight</h1>
            <div className="md:grid md:grid-cols-2 md:gap-3 flex flex-col gap-y-3 lg:grid-cols-3">
                {paginatedProgram.map((item) => (
                    <Card 
                        key={item.id} 
                        style={`w-full bg-white text-black shadow-2xl rounded-lg flex flex-col gap-3 p-3 transition-all duration-300 
                            ${isLeaving ? "opacity-0 translate-x-full" : ""}
                            ${isEntering ? "opacity-0 translate-x-[-100%]" : "opacity-100 translate-x-0"}`} 
                        src={item.image} 
                        name={item.name} 
                        deskripsi={item.deskripsi} 
                        link={item.link} 
                        className={'flex flex-col gap-y-3'} 
                        bgImage={'bg-gray-300'}
                    >
                        <button className="bg-[#FBA9DB] rounded-lg justify-center text-black p-2 flex gap-3 font-swiss w-full">
                            Kunjungi
                            <span>
                                <i className="fas fa-arrow-right"></i>
                            </span>
                        </button>
                    </Card>
                ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-3">
                <button
                    onClick={handlePrevSlideHighlight}
                    className="w-10 h-10 rounded-full border-2 flex justify-center items-center border-black"
                >
                    <i className="fas fa-arrow-left text-xl cursor-pointer text-black"></i>
                </button>
                <div className="flex gap-2">
                    {[...Array(totalPages)].map((_, index) => (
                        <div
                            key={index}
                            className={`w-2 h-2 rounded-full ${
                                currentPage === index ? "bg-black" : "bg-gray-300"
                            }`}
                        ></div>
                    ))}
                </div>
                <button
                    onClick={handleNextSlideHighlight}
                    className="w-10 h-10 rounded-full border-2 flex justify-center items-center border-black"
                >
                    <i className="fas fa-arrow-right text-xl cursor-pointer text-black"></i>
                </button>
            </div>
        </section>
    );
};

export default ProgramHighlight;
