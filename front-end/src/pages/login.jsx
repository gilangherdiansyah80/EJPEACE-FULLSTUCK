import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const roles = ["Creator", "Dance", "Acting"];

const LoginSection = () => {
  const [dataUsers, setDataUsers] = useState([]);
  const [dataLogin, setDataLogin] = useState({
    username: "",
    password: "",
  });
  const [popup, setPopup] = useState({
    message: "",
    isVisible: false,
    isSuccess: false,
  });
  const [redirectTo, setRedirectTo] = useState("");
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

  const endPoint = "http://localhost:3000/api/users";
  const navigate = useNavigate();

  const fetchData = async () => {
    const response = await fetch(endPoint);
    const data = await response.json();
    setDataUsers(data.payload.datas);
    console.log(data.payload.datas);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    const user = dataUsers.find((user) => user.username === dataLogin.username);
    const isPasswordCorrect = dataUsers.find(
      (user) => user.password === dataLogin.password
    );
    const isAdmin = user && user.role === "Admin";
    const isUser = user && user.role === "User";

    if (user && isPasswordCorrect) {
      localStorage.setItem("users", JSON.stringify(user));
      setPopup({ message: "Login Berhasil", isVisible: true, isSuccess: true });
      setRedirectTo(
        isAdmin
          ? "/Dashboard/DashboardHome"
          : isUser
          ? "/Marketplace/MarketplaceHome"
          : "/"
      );
    } else if (user && !isPasswordCorrect) {
      setPopup({
        message: "Password Salah",
        isVisible: true,
        isSuccess: false,
      });
    } else if (!user && isPasswordCorrect) {
      setPopup({
        message: "Username Salah",
        isVisible: true,
        isSuccess: false,
      });
    } else if (!user && !isPasswordCorrect) {
      setPopup({
        message: "Username dan Password Salah",
        isVisible: true,
        isSuccess: false,
      });
    }
  };

  const handleChange = (e) => {
    setDataLogin({
      ...dataLogin,
      [e.target.id]: e.target.value,
    });
  };

  const handlePassword = () => {
    const password = document.getElementById("password");
    password.type = password.type === "password" ? "text" : "password";
  };

  const closePopup = () => {
    setPopup({ ...popup, isVisible: false });
    if (popup.isSuccess) {
      navigate(redirectTo);
    }
  };

  return (
    <section className="text-white w-full md:h-screen p-3 bg-gradient-to-r from-[#f6df3c] to-[#74690f] flex flex-col gap-y-5 md:gap-y-44 items-center">
      <header className="w-full flex justify-between items-center px-5 lg:justify-around">
        <section className="bg-ejp w-28 h-28 rounded-full flex justify-center items-center">
          <img className="w-52" src="/images/EJP-Creative.png" alt="Logo" />
        </section>
        <nav>
          <ul className="flex gap-x-5 text-lg md:text-2xl lg:gap-x-20 text-white">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/help">Help</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className="w-full lg:w-2/3 flex flex-col gap-y-14 md:gap-y-48 lg:flex-row-reverse justify-center items-center lg:justify-between">
        <section className="w-full flex flex-col justify-center items-center">
          <h1 className="text-white font-bold font-helvetica text-4xl md:text-6xl text-center lg:text-8xl">
            {text} <span className="block">Class</span>
          </h1>
        </section>

        {/* form login */}
        <section className="w-full flex flex-col justify-center items-center">
          <div className="flex flex-col gap-y-3 w-full p-3">
            <h1 className="text-center text-4xl font-bold md:text-5xl">
              Welcome Back
            </h1>
            <div className="flex gap-x-1 justify-center">
              <p className="text-lg md:text-3xl">Dont Have An Account?</p>
              <Link to="/register">
                <span className="text-ejp text-lg md:text-3xl">Register</span>
              </Link>
            </div>
            <form
              onSubmit={handleLogin}
              className="flex flex-col items-center gap-y-5"
            >
              <div className="flex flex-col gap-y-3 w-full">
                <label htmlFor="username" className="text-xl">
                  Username
                </label>
                <input
                  type="text"
                  className="p-3 rounded-lg bg-[#DDD5D5] text-black"
                  id="username"
                  value={dataLogin.username}
                  onChange={handleChange}
                  placeholder="Input Your Username"
                />
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
                    value={dataLogin.password}
                    onChange={handleChange}
                    placeholder="*******"
                  />
                  <i
                    className="fa fa-fw fa-eye absolute right-3 cursor-pointer text-black"
                    onClick={handlePassword}
                  ></i>
                </div>
              </div>
              <button
                type="submit"
                className="p-3 bg-ejp text-white rounded-lg w-56 md:w-80 md:text-xl"
              >
                Login
              </button>
            </form>
          </div>
        </section>
      </main>

      {/* Pop-up card */}
      {popup.isVisible && (
        <div
          className={`fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50 p-5`}
        >
          <div className="bg-white md:w-1/2 lg:w-1/3 p-5 rounded-lg shadow-lg text-center w-full flex flex-col gap-y-5">
            {popup.isSuccess ? (
              <h1 className="text-black font-bold">
                Selamat Datang Tuan {dataLogin.username}
              </h1>
            ) : (
              <h1 className="text-black font-bold">
                Maaf Tuan {dataLogin.username}, Anda Tidak Bisa Login
              </h1>
            )}
            <h2
              className={`${
                popup.isSuccess ? "text-green-500" : "text-red-500"
              } text-2xl`}
            >
              {popup.message}
            </h2>
            <button
              onClick={closePopup}
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

export default LoginSection;
