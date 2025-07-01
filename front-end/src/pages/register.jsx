import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const roles = ["Creator", "Dance", "Acting"];

const Register = () => {
  const [dataRegister, setDataRegister] = useState({
    name: "",
    username: "",
    telepon: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState(""); // Menambahkan state untuk pesan pop-up
  const [isSuccess, setIsSuccess] = useState(false); // Menambahkan state untuk status sukses atau gagal
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let typingSpeed = 500;
    if (isDeleting) {
      typingSpeed /= 2;
    }

    const handleTyping = () => {
      const fullText = roles[index];
      setText(
        isDeleting
          ? fullText.substring(0, text.length - 1)
          : fullText.substring(0, text.length + 1)
      );

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setIndex((prevIndex) => (prevIndex + 1) % roles.length);
      }
    };

    const typingTimeout = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(typingTimeout);
  }, [text, isDeleting, index]);
  const handleRegister = async (e) => {
    e.preventDefault();

    const validationErrors = validateInputs();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await fetch(
        "https://ejpeaceentertainment.com/api/create-users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: dataRegister.name,
            username: dataRegister.username,
            telepon: dataRegister.telepon,
            email: dataRegister.email,
            password: dataRegister.password,
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        setIsSuccess(true); // Set status sukses
        setPopupMessage("Registrasi Berhasil!");
        setIsPopupOpen(true);
      } else {
        setIsSuccess(false);
        setPopupMessage("Akun yang anda masukkan sudah terdaftar");
        console.log(`Registrasi Gagal: ${data.message}`);
        setIsPopupOpen(true);
        console.log(`Registrasi Gagal: ${data.message}`);
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setIsSuccess(false); // Set status gagal
      setPopupMessage("Terjadi kesalahan saat registrasi.");
      setIsPopupOpen(true);
    }
  };

  const validateInputs = () => {
    const validationErrors = {};

    if (!dataRegister.name) validationErrors.name = "Name harus diisi";
    if (!dataRegister.username)
      validationErrors.username = "Username harus diisi";
    if (!dataRegister.telepon) validationErrors.telepon = "Telepon harus diisi";
    if (!dataRegister.email) validationErrors.email = "Email harus diisi";
    if (!dataRegister.password)
      validationErrors.password = "Password harus diisi";
    if (!dataRegister.confirmPassword)
      validationErrors.confirmPassword = "Confirm Password harus diisi";
    if (dataRegister.password !== dataRegister.confirmPassword)
      validationErrors.confirmPassword = "Password tidak sesuai";

    return validationErrors;
  };

  const handleChange = (e) => {
    setDataRegister({
      ...dataRegister,
      [e.target.id]: e.target.value,
    });
    setErrors({
      ...errors,
      [e.target.id]: null,
    });
  };

  const handlePassword = () => {
    const password = document.getElementById("password");
    password.type = password.type === "password" ? "text" : "password";
  };

  const handleConfirmPassword = () => {
    const confirmPassword = document.getElementById("confirmPassword");
    confirmPassword.type =
      confirmPassword.type === "password" ? "text" : "password";
  };

  const handlePopupClose = () => {
    if (isSuccess) {
      window.location.href = "/loginsection";
    } else {
      setIsPopupOpen(false);
    }
  };

  return (
    <section className="text-white w-full md:h-screen p-3 bg-gradient-to-r from-[#f6df3c] to-[#74690f] flex flex-col gap-y-5 md:gap-y-20 lg:gap-y-0 items-center">
      <header className="h-28 lg:h-36 w-full flex justify-between items-center px-5 lg:justify-around">
        <section className="bg-ejp rounded-full w-28 h-28 flex justify-center items-center">
          <img
            className="w-52"
            src="/images/EJP-Creative.png"
            alt="PT.EJPeace Karya Indonesia"
          />
        </section>
        <nav>
          <ul className="flex gap-x-5 text-lg lg:text-2xl lg:gap-x-20 text-white">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/academy">Help</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className="w-full lg:w-2/3 flex flex-col gap-y-14 md:gap-y-28 lg:flex-row-reverse justify-center items-center lg:justify-center lg:items-center lg:gap-x-10">
        <section className="w-full flex flex-col justify-center items-center lg:w-1/2">
          <h1 className="text-white font-bold font-helvetica text-4xl md:text-6xl text-center">
            {text} <span className="block">Class</span>
          </h1>
        </section>

        <section className="w-full flex flex-col justify-center items-center lg:w-1/2">
          <div className="flex flex-col gap-y-3 md:gap-y-5 w-full p-3">
            <h1 className="text-center text-3xl font-bold md:text-5xl">
              Create New Account
            </h1>
            <div className="flex gap-x-1 justify-center">
              <p className="text-lg md:text-3xl">Have A Account?</p>
              <Link to="/loginsection">
                <span className="text-ejp text-lg md:text-3xl">Login</span>
              </Link>
            </div>
            <form
              onSubmit={handleRegister}
              className="flex flex-col items-center gap-y-5"
            >
              <div className="flex flex-col md:flex-row w-full gap-y-5 md:gap-x-5">
                <div className="flex flex-col gap-y-3 md:w-1/2">
                  <label htmlFor="name" className="text-xl">
                    Name
                  </label>
                  <input
                    type="text"
                    className="p-3 rounded-lg bg-[#DDD5D5] text-black"
                    id="name"
                    value={dataRegister.name}
                    onChange={handleChange}
                    placeholder="Input Your Name"
                  />
                  {errors.name && (
                    <span className="text-red-500">{errors.name}</span>
                  )}
                </div>
                <div className="flex flex-col gap-y-3 md:w-1/2">
                  <label htmlFor="username" className="text-xl">
                    Username
                  </label>
                  <input
                    type="text"
                    className="p-3 rounded-lg bg-[#DDD5D5] text-black"
                    id="username"
                    value={dataRegister.username}
                    onChange={handleChange}
                    placeholder="Input Your Username"
                  />
                  {errors.username && (
                    <span className="text-red-500">{errors.username}</span>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-y-3 w-full">
                <label htmlFor="telepon" className="text-xl">
                  Telepon
                </label>
                <input
                  type="number"
                  className="p-3 rounded-lg bg-[#DDD5D5] text-black"
                  id="telepon"
                  value={dataRegister.telepon}
                  onChange={handleChange}
                  placeholder="Input Your Telepon"
                />
                {errors.telepon && (
                  <span className="text-red-500">{errors.telepon}</span>
                )}
              </div>
              <div className="flex flex-col gap-y-3 w-full">
                <label htmlFor="email" className="text-xl">
                  Email
                </label>
                <input
                  type="email"
                  className="p-3 rounded-lg bg-[#DDD5D5] text-black"
                  id="email"
                  value={dataRegister.email}
                  onChange={handleChange}
                  placeholder="Input Your Email"
                />
                {errors.email && (
                  <span className="text-red-500">{errors.email}</span>
                )}
              </div>
              <div className="flex flex-col gap-y-3 w-full">
                <label htmlFor="password" className="text-xl">
                  Password
                </label>
                <div className="flex items-center relative">
                  <input
                    type="password"
                    className="p-3 rounded-lg bg-[#DDD5D5] w-full text-black"
                    id="password"
                    value={dataRegister.password}
                    onChange={handleChange}
                    placeholder="*******"
                  />
                  <i
                    className="fa fa-fw fa-eye absolute right-3 cursor-pointer text-black"
                    onClick={handlePassword}
                  ></i>
                </div>
                {errors.password && (
                  <span className="text-red-500">{errors.password}</span>
                )}
              </div>
              <div className="flex flex-col gap-y-3 w-full">
                <label htmlFor="confirmPassword" className="text-xl">
                  Confirm Password
                </label>
                <div className="flex items-center relative">
                  <input
                    type="password"
                    className="p-3 rounded-lg bg-[#DDD5D5] w-full text-black"
                    id="confirmPassword"
                    value={dataRegister.confirmPassword}
                    onChange={handleChange}
                    placeholder="*******"
                  />
                  <i
                    className="fa fa-fw fa-eye absolute right-3 cursor-pointer text-black"
                    onClick={handleConfirmPassword}
                  ></i>
                </div>
                {errors.confirmPassword && (
                  <span className="text-red-500">{errors.confirmPassword}</span>
                )}
              </div>
              <button
                type="submit"
                className="p-3 bg-ejp text-white rounded-lg w-56 md:w-80 md:text-xl"
              >
                Register
              </button>
            </form>
          </div>
        </section>
      </main>

      {/* Pop-up message */}
      {isPopupOpen && (
        <div
          className={`fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50 p-5`}
        >
          <div className="bg-white p-5 rounded-lg shadow-lg text-center w-full flex flex-col gap-y-5 max-w-md">
            {isSuccess ? (
              <h1 className="text-black font-bold">
                Selamat Tuan {dataRegister.username} Anda Sudah Terdaftar
              </h1>
            ) : (
              <h1 className="text-black font-bold">
                Maaf Tuan {dataRegister.username} Anda Gagal Mendaftar
              </h1>
            )}
            <h2
              className={`text-2xl font-bold mb-4 ${
                isSuccess ? "text-green-500" : "text-red-500"
              }`}
            >
              {popupMessage}
            </h2>
            <button
              onClick={handlePopupClose}
              className="bg-[#296ED3] text-white px-4 py-2 rounded-lg"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Register;
