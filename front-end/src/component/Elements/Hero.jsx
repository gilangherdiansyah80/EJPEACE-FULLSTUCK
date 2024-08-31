import { Fragment } from "react";

// eslint-disable-next-line react/prop-types
const Hero = ( {src, title, subtitle, description, buttonText, children, rounded, buttonStyle, style}) => {
    return (
        <Fragment>
            <div className={`w-full flex bg-ejp ${style} relative ${rounded} lg:h-[683px] lg`}>
                <img
                    className="opacity-100 w-full h-full object-cover rounded-xl"
                    src={src}
                    alt="Slide"
                />
                <div className="h-full text-white p-6 lg:gap-y-10 flex flex-col justify-center absolute">
                    <div className="flex flex-col gap-3">
                    <h1 className="text-4xl font-bold lg:text-6xl font-helvetica">{title}</h1>
                    <h2 className="text-3xl font-bold lg:text-6xl font-helvetica">{subtitle}</h2>
                    </div>
                    <div className="flex flex-col gap-3 max-w-2xl">
                    <p className="lg:text-xl font-swiss">{description}</p>
                    <button className={buttonStyle}>
                        {buttonText}
                    </button>
                    </div>
                </div>
                </div>
                {children}
        </Fragment>
    )
}

export default Hero;