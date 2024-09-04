import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginSection = () => {
    const [dataUsers, setDataUsers] = useState([]);
    const [dataLogin, setDataLogin] = useState({
        username: '',
        password: ''
    });
    const [popup, setPopup] = useState({
        message: '',
        isVisible: false,
        isSuccess: false,
    });
    const [redirectTo, setRedirectTo] = useState("");

    const endPoint = 'http://localhost:3000/api/users';
    const navigate = useNavigate();

    const fetchData = async () => {
        const response = await fetch(endPoint);
        const data = await response.json();
        setDataUsers(data.payload.datas);
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();
        
        const user = dataUsers.find((user) => user.username === dataLogin.username);
        const isPasswordCorrect = dataUsers.find((user) => user.password === dataLogin.password);
        const isAdmin = user && user.role === "admin academy";
        const isUser = user && user.role === "user";
    
        if (user && isPasswordCorrect) {
            setPopup({ message: "Login Berhasil", isVisible: true, isSuccess: true });
            setRedirectTo(isAdmin ? "/" : isUser ? "/academy" : "/studio");
        } else if (user && !isPasswordCorrect) {
            setPopup({ message: "Password Salah", isVisible: true, isSuccess: false });
        } else if (!user && isPasswordCorrect) {
            setPopup({ message: "Username Salah", isVisible: true, isSuccess: false });
        } else if (!user && !isPasswordCorrect) {
            setPopup({ message: "Username dan Password Salah", isVisible: true, isSuccess: false });
        }
    }

    const handleChange = (e) => {
        setDataLogin({
            ...dataLogin,
            [e.target.id]: e.target.value
        });
    }

    const handlePassword = () => {
        const password = document.getElementById("password");
        password.type = password.type === "password" ? "text" : "password";
    }

    const closePopup = () => {
        setPopup({ ...popup, isVisible: false });
        if (popup.isSuccess) {
            navigate(redirectTo);
        }
    }

    return (
        <section className="text-white w-full md:h-screen p-3 bg-gradient-to-r from-[#296ED3] to-[#3ED0EA] flex flex-col gap-y-5 md:gap-y-44 items-center">
            <header className="h-28 w-full flex justify-between items-center px-5">
                <img className="w-52 mt-5 -ms-8" src="/images/EJP-Creative.png" alt="Logo" />
                <nav>
                    <ul className="flex gap-x-5 text-lg md:text-2xl text-white">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/academy">Help</Link></li>
                    </ul>
                </nav>
            </header>
            <main className="w-full flex flex-col gap-y-14 md:gap-y-48 justify-center items-center">
                <section className="w-full flex flex-col justify-center items-center">
                    <h1 className="text-white font-bold font-helvetica text-4xl md:text-6xl text-center">ACTING <span className="block">CLASS</span></h1>
                </section>
                
                {/* form login */}
                <section className="w-full flex flex-col justify-center items-center">
                    <div className="flex flex-col gap-y-3 w-full p-3">
                        <h1 className="text-center text-4xl font-bold">Welcome Back</h1>
                        <div className="flex gap-x-1 justify-center">
                            <p className="text-lg">Dont Have An Account?</p>
                            <Link to="/register">
                                <span className="text-[#DE4FC1] text-lg">Register</span>
                            </Link>
                        </div>
                        <form onSubmit={handleLogin} className="flex flex-col items-center gap-y-5">
                            <div className="flex flex-col gap-y-3 w-full">
                                <label htmlFor="username" className="text-xl">Username</label>
                                <input type="text" className="p-3 rounded-lg bg-[#DDD5D5] text-black" id="username" value={dataLogin.username} onChange={handleChange} placeholder="Input Your Username" />
                            </div>
                            <div className="flex flex-col gap-y-3 w-full">
                                <label htmlFor="password" className="text-xl">Password</label>
                                <div className="flex items-center relative">
                                  <input type="password" className="p-3 rounded-lg bg-[#DDD5D5] w-full text-black" id="password" value={dataLogin.password} onChange={handleChange} placeholder="*******" />
                                  <i className="fa fa-fw fa-eye absolute right-3 cursor-pointer text-black" onClick={handlePassword}></i>
                                </div>
                            </div>
                            <button type="submit" className="p-3 bg-[#DE4FC1] text-white rounded-lg w-56">Login</button>
                        </form>
                    </div>
                </section>
            </main>

            {/* Pop-up card */}
            {popup.isVisible && (
                <div className={`fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50 p-5`}>
                    <div className="bg-white p-5 rounded-lg shadow-lg text-center w-full flex flex-col gap-y-5">
                        <h2 className={`${popup.isSuccess ? "text-green-500" : "text-red-500"} text-2xl`}>{popup.message}</h2>
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
}

export default LoginSection;
