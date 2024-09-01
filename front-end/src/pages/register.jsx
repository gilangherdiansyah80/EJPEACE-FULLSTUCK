import { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [dataRegister, setDataRegister] = useState({
    username: "",
    password: ""
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/v1/create-users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: dataRegister.username,
          password: dataRegister.password
        }),
      });
  
      const data = await response.json();
      if (response.ok) {
        // Jika registrasi berhasil, arahkan ke halaman login
        alert("Registrasi Berhasil!");
        window.location.href = "/loginsection";
      } else {
        // Tampilkan pesan error jika registrasi gagal
        alert(`Registrasi Gagal: ${data.message}`);
      }
    } catch (error) {
      console.error('An error occurred:', error);
      alert('Terjadi kesalahan saat registrasi.');
    }
  };

  const handleChange = (e) => {
    setDataRegister({
      ...dataRegister,
      [e.target.id]: e.target.value
    });
  };

  return (
    <div className="text-black w-full justify-center flex items-center min-h-screen">
      <div className="bg-blue-500 rounded-xl shadow-xl flex flex-col gap-y-3 w-1/3 p-3">
        <h1 className="text-center text-4xl font-bold">Form Register</h1>
        <form action="" onSubmit={handleRegister} className="flex flex-col gap-y-3">
          <div className="flex flex-col gap-y-3">
            <label htmlFor="username" className="text-xl">Username</label>
            <input
              type="text"
              className="p-3 rounded-lg"
              id="username"
              value={dataRegister.username}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-y-3">
            <label htmlFor="password" className="text-xl">Password</label>
            <input
              type="password"
              className="p-3 rounded-lg"
              id="password"
              value={dataRegister.password}
              onChange={handleChange}
            />
          </div>
          <div className="flex gap-x-1">
            <p>Sudah punya akun?</p>
            <Link to="/loginsection">
              <span className="text-red-500">Login</span>
            </Link>
          </div>
          <button type="submit" className="p-3 bg-black text-white rounded-lg">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
