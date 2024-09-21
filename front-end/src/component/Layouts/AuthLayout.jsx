import { useState } from "react";
import { Link } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';

// eslint-disable-next-line react/prop-types
const AuthLayout = ({ children, bg, menu1, menu2, menu3, bgColor, style1, style2, button1, button2, hover, link, link1, link2, onClick}) => {
  AOS.init();

  const [open, setOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState('home');

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
    setActiveMenu(id);
  };

  return (
    <div className={`w-full ${bg} overflow-hidden lg:flex lg:flex-col lg:justify-between lg:items-center`}>
      <header className={`${bgColor} h-28 lg:h-36 w-full flex justify-center items-center fixed top-0 left-0 z-10`} data-aos="fade-down" data-aos-delay="100">
        <div className="flex justify-between items-center w-full lg:w-3/4 px-5 lg:px-10 text-white">
          {/* Logo */}
          <img className="w-52 lg:h-52 mt-5 lg:w-52" src="/images/EJP-Creative.png" alt="EJ PEACE" />

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
            <nav className="text-white lg:hidden bg-ejp w-full p-3 -ms-5 absolute z-10 mt-[430px]">
              <ul className="flex flex-col gap-5 md:text-xl">
                <Link to={link}>
                  <a href="#home" onClick={(e) => handleClick("home", e)}>
                    <li onClick={handerOpen} className={`${hover} ${activeMenu === 'home' ? 'bg-yellowejp text-ejp rounded-lg p-3' : ''}`}>
                      Home
                    </li>
                  </a>
                </Link>
                <a href="#about" onClick={(e) => handleClick("about", e)}>
                  <li onClick={handerOpen} className={`${hover} ${activeMenu === 'about' ? 'bg-yellowejp text-ejp rounded-lg p-3' : ''}`}>{menu1}</li>
                </a>
                <a href="#unitBisnis" onClick={(e) => handleClick("unitBisnis", e)}>
                  <li onClick={handerOpen} className={`${hover} ${activeMenu === 'unitBisnis' ? 'bg-yellowejp text-ejp rounded-lg p-3' : ''}`}>{menu2}</li>
                </a>
                <a href="#contact" onClick={(e) => handleClick("contact", e)}>
                <li onClick={handerOpen} className={`${hover} ${activeMenu === 'contact' ? 'bg-yellowejp text-ejp rounded-lg p-3' : ''}`}>{menu3}</li>
              </a>
                <div className="flex gap-x-2 items-center">
                  <Link to={link1}>
                    <button className={style1}>{button1}</button>
                  </Link>
                  <Link to={link2}>
                    <button className={style2} onClick={onClick}>{button2}</button>
                  </Link>
              </div>
              </ul>
            </nav>
          )}

          {/* Desktop Navigation */}
          <nav className="hidden lg:block">
            <ul className="flex gap-5 lg:gap-x-10 text-xl justify-between items-center">
              <Link to={link}>
                <a href="#home" onClick={(e) => handleClick("home", e)}>
                  <li className={`${hover} ${activeMenu === 'home' ? 'bg-yellowejp text-ejp p-3 rounded-lg' : ''}`}>Home</li>
                </a>
              </Link>
              <a href="#about" onClick={(e) => handleClick("about", e)}>
                <li className={`${hover} ${activeMenu === 'about' ? 'bg-yellowejp text-ejp p-3 rounded-lg' : ''}`}>{menu1}</li>
              </a>
              <a href="#unitBisnis" onClick={(e) => handleClick("unitBisnis", e)}>
                <li className={`${hover} ${activeMenu === 'unitBisnis' ? 'bg-yellowejp text-ejp p-3 rounded-lg' : ''}`}>{menu2}</li>
              </a>
              <a href="#contact" onClick={(e) => handleClick("contact", e)}>
                <li className={`${hover} ${activeMenu === 'contact' ? 'bg-yellowejp text-ejp p-3 rounded-lg' : ''}`}>{menu3}</li>
              </a>
              <div className="flex gap-x-2 items-center">
                  <Link to={link1}>
                    <button className={style1}>{button1}</button>
                  </Link>
                  <Link to={link2}>
                    <button className={style2} onClick={onClick}>{button2}</button>
                  </Link>
              </div>
            </ul>
          </nav>
        </div>
      </header>


      {children}

      <footer className={`${bgColor} text-white flex flex-col p-3 gap-y-3 lg:gap-y-10 justify-between items-center w-full`}>
        <h1 className="text-2xl lg:text-4xl font-semibold text-white font-helvetica">Sosial Media</h1>
        <div className="flex gap-3 lg:gap-x-10">
          <img src="/images/facebook.png" className="w-12 md:w-14 h-12 md:h-14 grayscale hover:grayscale-0" alt="Facebook" />
          <img src="/images/tiktok.png" className="w-12 md:w-14 h-12 md:h-14 grayscale hover:grayscale-0" alt="Tiktok" />
          <img src="/images/twitter.png" className="w-12 md:w-14 h-12 md:h-14 grayscale hover:grayscale-0" alt="Twitter" />
          <img src="/images/instagram.png" className="w-12 md:w-14 h-12 md:h-14 grayscale hover:grayscale-0" alt="Instagram" />
          <img src="/images/youtube.png" className="w-12 md:w-14 h-12 md:h-14 grayscale hover:grayscale-0" alt="Youtube" />
        </div>
        <div className="h-24 flex justify-center items-center">
          <img className="w-52 h-50 lg:h-52 lg:w-52" src="/images/EJP-Creative.png" alt="" />
        </div>
      </footer>
    </div>
  );
};

export default AuthLayout;