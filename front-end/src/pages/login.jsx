import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const LoginSection = () => {
    const [dataUsers, setDataUsers] = useState([])
    const [dataLogin, setDataLogin] = useState({
        username: '',
        password: ''
    })

    const endPoint = 'http://localhost:3000/api/users'

    const fetchData = async () => {
        const response = await fetch(endPoint);
        const data = await response.json();
        setDataUsers(data.payload.datas);
        console.log(data.payload.datas)
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleLogin = (e) => {
        e.preventDefault()
    
        const user = dataUsers.find((user) => user.username === dataLogin.username && user.password === dataLogin.password && user.role === "user")
        const admin = dataUsers.find((user) => user.username === dataLogin.username && user.password === dataLogin.password && user.role === "admin")
    
        if (user) {
          alert("Login Berhasil")
          console.log(dataLogin.username)
          window.location.href = "/academy"
        } else if (admin) {
            alert("Login Berhasil")
            console.log(dataLogin.username)
            window.location.href = "/"
        } else {
            alert("Login Gagal")
        }
    }

    const handleChange = (e) => {
        setDataLogin({
            ...dataLogin,
            [e.target.id]: e.target.value
        })
    }

    return (
        <div className=" text-black w-full justify-center flex items-center min-h-screen">
            <div className="bg-blue-500 rounded-xl shadow-xl flex flex-col gap-y-3 w-1/3 p-3">
                <h1 className="text-center text-4xl font-bold">Form Login</h1>
                <form action="" onSubmit={handleLogin} className="flex flex-col gap-y-3">
                <div className="flex flex-col gap-y-3">
                    <label htmlFor="" className="text-xl">Username</label>
                    <input type="text" className="p-3 rounded-lg" id="username" value={dataLogin.username} onChange={handleChange} />
                </div>
                <div className="flex flex-col gap-y-3">
                    <label htmlFor="" className="text-xl">Password</label>
                    <input type="password" className="p-3 rounded-lg" id="password" value={dataLogin.password} onChange={handleChange} />
                </div>
                <div className="flex gap-x-1">
                    <p>Belum punya akun?</p>
                    <Link to="/register">
                        <span className="text-red-500">Register</span>
                    </Link>
                </div>
                <button type="submit" className="p-3 bg-black text-white rounded-lg">Login</button>
                </form>
            </div>
        </div>
    )
}

export default LoginSection;