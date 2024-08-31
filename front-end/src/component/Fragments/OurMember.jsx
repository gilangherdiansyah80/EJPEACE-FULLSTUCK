import { useState, useEffect, useCallback } from "react";
import Member from "../../utils/member";

const OurMember = () => {
    const [currentMember, setCurrentMember] = useState(0);
    const [isLeaving, setIsLeaving] = useState(false);  // State for leaving animation
    const [isEntering, setIsEntering] = useState(false); 

    const totalMember = Math.ceil(Member.length / 12);

    const handlePrevSlideMember = useCallback(() => {
        setIsLeaving(true);
        setTimeout(() => {
            setCurrentMember((prev) => (prev === 0 ? totalMember - 1 : prev - 1));
            setIsLeaving(false);
            setIsEntering(true);
        }, 300); // Set this to match your exit animation duration
    }, [totalMember]);

    const handleNextSlideMember = useCallback(() => {
        setIsLeaving(true);
        setTimeout(() => {
            setCurrentMember((prev) => (prev === totalMember - 1 ? 0 : prev + 1));
            setIsLeaving(false);
            setIsEntering(true);
        }, 300); // Set this to match your exit animation duration
    }, [totalMember]);

    useEffect(() => {
        const interval = setInterval(() => {
            handleNextSlideMember();
        }, 15000);

        return () => clearInterval(interval);
    }, [handleNextSlideMember]);

    useEffect(() => {
        if (isEntering) {
            setTimeout(() => setIsEntering(false), 300); // Match this with enter animation duration
        }
    }, [isEntering]);

    const itemsMember = 12;
    const paginatedMember = Member.slice(
        currentMember * itemsMember,
        currentMember * itemsMember + itemsMember
    );

    return (
        <section className="flex flex-col gap-y-10 justify-center items-center">
            <h1 className="text-3xl lg:text-6xl font-bold text-center">Our Member</h1>
            <div className="w-4/5 md:grid md:grid-cols-3 md:gap-3 gap-x-10 flex flex-col lg:gap-8 lg:grid-cols-6 p-3 mt-20">
                {paginatedMember.map((item) => (
                    <div key={item.id} className={`${isLeaving ? "opacity-0 translate-x-full" : ""}
                    ${isEntering ? "opacity-0 translate-x-[-100%]" : "opacity-100 translate-x-0"}`}>
                        <img src={item.image} className="rounded-xl h-[200px] w-[200px]" alt={item.name} />
                    </div>
                ))}
            </div>
            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-3 gap-x-20">
                <button
                    onClick={handlePrevSlideMember}
                    className="w-10 h-10 rounded-full border-2 flex justify-center items-center border-black"
                >
                    <i className="fas fa-arrow-left text-xl cursor-pointer text-black"></i>
                </button>
                <div className="flex gap-2">
                    {[...Array(totalMember)].map((_, index) => (
                        <div
                            key={index}
                            className={`w-2 h-2 rounded-full ${
                                currentMember === index ? "bg-black" : "bg-gray-300"
                            }`}
                        ></div>
                    ))}
                </div>
                <button
                    onClick={handleNextSlideMember}
                    className="w-10 h-10 rounded-full border-2 flex justify-center items-center border-black"
                >
                    <i className="fas fa-arrow-right text-xl cursor-pointer text-black"></i>
                </button>
            </div>

            <div id="unitBisnis"></div>
        </section>
    );
};

export default OurMember;
