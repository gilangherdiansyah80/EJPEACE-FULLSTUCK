import { useState } from "react";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const AuthLayout = ({ children, bg, menu1, menu2, menu3, bgColor, style1, style2, button1, button2, hover}) => {
  const [open, setOpen] = useState(false);

  const handerOpen = () => setOpen(!open);

  const scrollMenu = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleClick = (id, e) => {
    e.preventDefault();
    scrollMenu(id);
  };

  return (
    <div className={`w-full ${bg} overflow-hidden`}>
      <header className={`${bgColor} h-28 lg:h-36 w-full flex justify-center items-center fixed top-0 left-0 z-10`}>
        <div className="flex justify-between items-center w-full px-5 lg:px-10 text-white">
          {/* Logo */}
          <img className="w-52 lg:h-52 mt-5 lg:w-52" src="images/EJP-Creative.png" alt="EJ PEACE" />

          {/* Mobile menu icon */}
          <div className="lg:hidden me-6">
            {open ? (
              <i
                className="fas fa-times text-3xl md:text-5xl cursor-pointer text-white"
                onClick={handerOpen}
              ></i>
            ) : (
              <i
                className="fas fa-bars text-3xl md:text-5xl cursor-pointer text-white"
                onClick={handerOpen}
              ></i>
            )}
          </div>

          {/* Mobile Navigation */}
          {open && (
            <nav className="text-white lg:hidden bg-ejp w-full p-3 -ms-5 absolute z-10 mt-80">
              <ul className="flex flex-col gap-5 md:text-xl">
              <a href="#home" onClick={(e) => handleClick("home", e)}>
                  <li onClick={handerOpen} className={`${hover}`}>
                    Home
                  </li>
                </a>
                <a href="#about" onClick={(e) => handleClick("about", e)}>
                  <li onClick={handerOpen} className={`${hover}`}>{menu1}</li>
                </a>
                <a href="#unitBisnis" onClick={(e) => handleClick("unitBisnis", e)}>
                  <li onClick={handerOpen} className={`${hover}`}>{menu2}</li>
                </a>
                <a href="#contact" onClick={(e) => handleClick("contact", e)}>
                <li onClick={handerOpen} className={`${hover}`}>{menu3}</li>
              </a>
                <div className="flex gap-x-2">
                  <Link to='/loginsection'>
                    <button className={style1}>{button1}</button>
                  </Link>
                  <Link to='/register'>
                    <button className={style2}>{button2}</button>
                  </Link>
              </div>
              </ul>
            </nav>
          )}

          {/* Desktop Navigation */}
          <nav className="hidden lg:block">
            <ul className="flex gap-5 lg:gap-x-10 text-xl justify-center items-center">
              <a href="#home" onClick={(e) => handleClick("home", e)}>
                <li className={`${hover}`}>Home</li>
              </a>
              <a href="#about" onClick={(e) => handleClick("about", e)}>
                <li className={`${hover}`}>{menu1}</li>
              </a>
              <a href="#unitBisnis" onClick={(e) => handleClick("unitBisnis", e)}>
                <li className={`${hover}`}>{menu2}</li>
              </a>
              <a href="#contact" onClick={(e) => handleClick("contact", e)}>
                <li className={`${hover}`}>{menu3}</li>
              </a>
              <div className="flex gap-x-2">
                  <Link to='/loginsection'>
                    <button className={style1}>{button1}</button>
                  </Link>
                  <Link to='/register'>
                    <button className={style2}>{button2}</button>
                  </Link>
              </div>
            </ul>
          </nav>
        </div>
      </header>


      {children}

      <footer className={`${bgColor} text-white flex flex-col p-3 gap-y-3 lg:gap-y-10 justify-center items-center w-full absolute`}>
        <h1 className="text-2xl lg:text-4xl font-semibold text-white font-helvetica">Sosial Media</h1>
        <div className="flex gap-3 lg:gap-x-10">
          <i className="fab fa-facebook text-3xl lg:text-6xl hover:text-blue-600"></i>
          <i className="fab fa-tiktok text-3xl lg:text-6xl hover:text-yellowejp"></i>
          <i className="fab fa-twitter text-3xl lg:text-6xl hover:text-blue-600"></i>
          <i className="fab fa-instagram text-3xl lg:text-6xl hover:text-gradient-to-r from-pink-500 via-red-500 to-yellow-500"></i>
          <i className="fab fa-youtube text-3xl lg:text-6xl hover:text-red-700"></i>
        </div>
        <img className="w-44 h-50 lg:w-[608px] lg:h-[304px]" src="images/EJP-Creative.png" alt="" />
      </footer>
    </div>
  );
};

export default AuthLayout;