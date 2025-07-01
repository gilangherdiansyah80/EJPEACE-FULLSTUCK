import { Fragment } from "react";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const Hero = ({
  // eslint-disable-next-line react/prop-types
  src,
  // eslint-disable-next-line react/prop-types
  title,
  // eslint-disable-next-line react/prop-types
  subtitle,
  // eslint-disable-next-line react/prop-types
  description,
  // eslint-disable-next-line react/prop-types
  buttonText,
  // eslint-disable-next-line react/prop-types
  children,
  // eslint-disable-next-line react/prop-types
  rounded,
  // eslint-disable-next-line react/prop-types
  buttonStyle,
  // eslint-disable-next-line react/prop-types
  style,
  // eslint-disable-next-line react/prop-types
  link,
}) => {
  return (
    <Fragment>
      <div
        className={`w-full flex bg-ejp ${style} relative ${rounded} w-full h-[683px]`}
      >
        <div className="h-full lg:w-[1200px] text-white p-6 lg:gap-y-10 flex flex-col justify-center ">
          <div className="flex flex-col gap-3">
            <h1 className="text-4xl font-bold lg:text-6xl font-helvetica">
              {title}
            </h1>
            <h2 className="text-3xl font-bold lg:text-6xl font-helvetica">
              {subtitle}
            </h2>
          </div>
          <div className="flex flex-col gap-3 max-w-2xl">
            <p className="lg:text-xl font-swiss">{description}</p>
            <Link to={link} className={buttonStyle}>
              {buttonText}
            </Link>
          </div>
        </div>
        <img
          src="/images/logo1.png"
          alt=""
          className="w-full h-full object-cover opacity-50"
        />
      </div>
      {children}
    </Fragment>
  );
};

export default Hero;
