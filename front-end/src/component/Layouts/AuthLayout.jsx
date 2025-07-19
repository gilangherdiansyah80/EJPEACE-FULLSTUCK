import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import RefundPopup from "../Elements/RefundPopup";
import TermPopup from "../Elements/TermPopup";

const AuthLayout = ({
  children,
  bg,
  menu1,
  menu2,
  menu3,
  menu4,
  bgColor,
  style1,
  style2,
  button1,
  button2,
  hover,
  link,
  link1,
  link2,
  onClick,
  menuActive,
}) => {
  AOS.init();

  const [open, setOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("home");
  const [logoIndex, setLogoIndex] = useState(0);
  const logos = ["/images/logo1.png", "/images/logo2.png"];
  const [showTerms, setShowTerms] = useState(false);
  const [showRefund, setShowRefund] = useState(false);

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

  useEffect(() => {
    const interval = setInterval(() => {
      setLogoIndex((prevIndex) => (prevIndex + 1) % logos.length);
    }, 2000); // ganti setiap 2 detik

    return () => clearInterval(interval); // cleanup saat komponen unmount
  }, []);

  return (
    <div
      className={`w-full ${bg} overflow-hidden lg:flex lg:flex-col lg:justify-between lg:items-center`}
    >
      <header
        className={`${bgColor} h-28 lg:h-36 w-full flex justify-center items-center fixed top-0 left-0 z-10`}
        data-aos="fade-down"
        data-aos-delay="100"
      >
        <div className="flex justify-between items-center w-full lg:w-3/4 px-5 lg:px-10 text-white">
          {/* Logo */}
          <Link to="/">
            <img
              className={` ${
                logos[logoIndex] === "/images/logo1.png"
                  ? "lg:w-36"
                  : "mt-5 lg:h-52"
              }`}
              src={logos[logoIndex]}
              alt="EJ PEACE"
            />
          </Link>

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
                    <li
                      onClick={handerOpen}
                      className={`${hover} ${
                        activeMenu === "home"
                          ? `${menuActive} rounded-lg p-3`
                          : ""
                      }`}
                    >
                      Home
                    </li>
                  </a>
                </Link>
                <a href="#about" onClick={(e) => handleClick("about", e)}>
                  <li
                    onClick={handerOpen}
                    className={`${hover} ${
                      activeMenu === "about"
                        ? `${menuActive} p-3 rounded-lg`
                        : ""
                    }`}
                  >
                    {menu1}
                  </li>
                </a>
                <a
                  href="#ourservice"
                  onClick={(e) => handleClick("ourservice", e)}
                >
                  <li
                    onClick={handerOpen}
                    className={`${hover} ${
                      activeMenu === "ourservice"
                        ? `${menuActive} p-3 rounded-lg`
                        : ""
                    }`}
                  >
                    {menu2}
                  </li>
                </a>
                <a href="#contact" onClick={(e) => handleClick("contact", e)}>
                  <li
                    onClick={handerOpen}
                    className={`${hover} ${
                      activeMenu === "contact"
                        ? `${menuActive} p-3 rounded-lg`
                        : ""
                    }`}
                  >
                    {menu3}
                  </li>
                </a>
                <Link to="/Marketplace/MarketplaceHome">
                  <li
                    className={`${hover} ${
                      activeMenu === "marketplace"
                        ? `${menuActive} p-3 rounded-lg`
                        : ""
                    }`}
                  >
                    {menu4}
                  </li>
                </Link>
                <div className="flex gap-x-2 items-center w-full">
                  <Link to={link1}>
                    <button className={style1}>{button1}</button>
                  </Link>
                  <Link to={link2}>
                    <button className={style2} onClick={onClick}>
                      {button2}
                    </button>
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
                  <li
                    className={`${hover} ${
                      activeMenu === "home"
                        ? `${menuActive} p-3 rounded-lg`
                        : ""
                    }`}
                  >
                    Home
                  </li>
                </a>
              </Link>
              <a href="#about" onClick={(e) => handleClick("about", e)}>
                <li
                  className={`${hover} ${
                    activeMenu === "about" ? `${menuActive} p-3 rounded-lg` : ""
                  }`}
                >
                  {menu1}
                </li>
              </a>
              <a
                href="#ourservice"
                onClick={(e) => handleClick("ourservice", e)}
              >
                <li
                  className={`${hover} ${
                    activeMenu === "ourservice"
                      ? `${menuActive} p-3 rounded-lg`
                      : ""
                  }`}
                >
                  {menu2}
                </li>
              </a>
              <a href="#contact" onClick={(e) => handleClick("contact", e)}>
                <li
                  className={`${hover} ${
                    activeMenu === "contact"
                      ? `${menuActive} p-3 rounded-lg`
                      : ""
                  }`}
                >
                  {menu3}
                </li>
              </a>
              <Link to="/Marketplace/MarketplaceHome">
                <li
                  className={`${hover} ${
                    activeMenu === "marketplace"
                      ? `${menuActive} p-3 rounded-lg`
                      : ""
                  }`}
                >
                  {menu4}
                </li>
              </Link>
              <div className="flex gap-x-2 items-center">
                <Link to={link1}>
                  <button className={style1}>{button1}</button>
                </Link>
                <Link to={link2}>
                  <button className={style2} onClick={onClick}>
                    {button2}
                  </button>
                </Link>
              </div>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex flex-col gap-y-10 justify-center items-center">
        {children}
        <Link
          to="http://Wa.me/6289635773270"
          className="bg-green-500 w-16 h-16 rounded-full flex justify-center items-center fixed right-5 bottom-5 z-30"
        >
          <i className="fa-brands fa-whatsapp text-4xl text-white"></i>
        </Link>
      </main>

      <footer
        className={`${bgColor} text-white flex flex-col p-3 gap-y-3 lg:gap-y-10 justify-between items-center w-full`}
      >
        <h1 className="text-2xl lg:text-4xl font-semibold text-white font-helvetica">
          Sosial Media
        </h1>
        <div className="flex gap-3 lg:gap-x-10">
          <Link to="https://www.facebook.com/profile.php?id=61556646910015">
            <img
              src="/images/facebook.png"
              className="w-12 md:w-14 h-12 md:h-14 grayscale hover:grayscale-0"
              alt="Facebook"
            />
          </Link>
          <Link to="https://www.tiktok.com/@ejpeace.ent?is_from_webapp=1&sender_device=pc">
            <img
              src="/images/tiktok.png"
              className="w-12 md:w-14 h-12 md:h-14 grayscale hover:grayscale-0"
              alt="Tiktok"
            />
          </Link>
          <Link to="https://www.instagram.com/ejpeace.entertainment/">
            <img
              src="/images/instagram.png"
              className="w-12 md:w-14 h-12 md:h-14 grayscale hover:grayscale-0"
              alt="Instagram"
            />
          </Link>
          <Link to="https://www.youtube.com/@ejpeace">
            <img
              src="/images/youtube.png"
              className="w-12 md:w-14 h-12 md:h-14 grayscale hover:grayscale-0"
              alt="Youtube"
            />
          </Link>
        </div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.562811319889!2d107.6208535110669!3d-6.942735667937234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e862246d4d8b%3A0xe9bef92e40558057!2sJl.%20Mutumanikam%20No.69%2C%20Cijagra%2C%20Kec.%20Lengkong%2C%20Kota%20Bandung%2C%20Jawa%20Barat%2040265!5e0!3m2!1sid!2sid!4v1751366683352!5m2!1sid!2sid"
          className="w-full h-96"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
        <div className="text-center text-sm md:text-base">
          <p>
            © 2025 EJPeace Entertainment. All Rights Reserved. |{" "}
            <button
              onClick={() => setShowTerms(true)}
              className="underline hover:text-blue-300 cursor-pointer"
            >
              Terms & Conditions
            </button>{" "}
            |{" "}
            <button
              onClick={() => setShowRefund(true)}
              className="underline hover:text-blue-300 cursor-pointer"
            >
              Refund Policy
            </button>
          </p>
        </div>
      </footer>

      {showTerms && <TermPopup button={() => setShowTerms(false)} />}
      {showRefund && <RefundPopup button={() => setShowRefund(false)} />}
    </div>
  );
};

export default AuthLayout;
