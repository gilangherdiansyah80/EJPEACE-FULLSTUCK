import { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [dataRegister, setDataRegister] = useState({
    name: "",
    username: "",
    telepon: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState({});
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    const validationErrors = validateInputs();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/v1/create-users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: dataRegister.name,
          username: dataRegister.username,
          telepon: dataRegister.telepon,
          email: dataRegister.email,
          password: dataRegister.password,
        }),
      });
  
      const data = await response.json();
      if (response.ok) {
        setIsPopupOpen(true);
      } else {
        alert(`Registrasi Gagal: ${data.message}`);
      }
    } catch (error) {
      console.error('An error occurred:', error);
      alert('Terjadi kesalahan saat registrasi.');
    }
  };

  const validateInputs = () => {
    const validationErrors = {};

    if (!dataRegister.name) validationErrors.name = "Name harus diisi";
    if (!dataRegister.username) validationErrors.username = "Username harus diisi";
    if (!dataRegister.telepon) validationErrors.telepon = "Telepon harus diisi";
    if (!dataRegister.email) validationErrors.email = "Email harus diisi";
    if (!dataRegister.password) validationErrors.password = "Password harus diisi";
    if (!dataRegister.confirmPassword) validationErrors.confirmPassword = "Confirm Password harus diisi";
    if (dataRegister.password !== dataRegister.confirmPassword) validationErrors.confirmPassword = "Password tidak sesuai";

    return validationErrors;
  };

  const handleChange = (e) => {
    setDataRegister({
      ...dataRegister,
      [e.target.id]: e.target.value
    });
    setErrors({
      ...errors,
      [e.target.id]: null
    });
  };

  const handlePassword = () => {
    const password = document.getElementById("password");
    password.type = password.type === "password" ? "text" : "password";
  }

  const handleConfirmPassword = () => {
    const confirmPassword = document.getElementById("confirmPassword");
    confirmPassword.type = confirmPassword.type === "password" ? "text" : "password";
  }

  return (
    <section className="text-white w-full p-3 bg-gradient-to-r from-[#296ED3] to-[#3ED0EA] flex flex-col gap-y-5  items-center">
      <header className="h-28 lg:h-36 w-full flex justify-between items-center px-5">
        <img className="w-52 mt-5 -ms-8" src="/images/EJP-Creative.png" alt="" />
        <nav>
          <ul className="flex gap-x-5 text-lg text-white">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/academy">Help</Link></li>
          </ul>
        </nav>
      </header>
      <main className="w-full flex flex-col gap-y-14 justify-center items-center">
        <section className="w-full flex flex-col justify-center items-center">
          <h1 className="text-white font-bold font-helvetica text-4xl">ACTING <span className="block">CLASS</span></h1>
        </section>
        
        <section className="w-full flex flex-col justify-center items-center">
          <div className="flex flex-col gap-y-3 w-full p-3">
            <h1 className="text-center text-3xl font-bold">Create New Account</h1>
            <div className="flex gap-x-1 justify-center">
              <p className="text-lg">Have A Account?</p>
              <Link to="/loginsection">
                <span className="text-[#DE4FC1] text-lg">Login</span>
              </Link>
            </div>
            <form onSubmit={handleRegister} className="flex flex-col items-center gap-y-5">
              <div className="flex flex-col gap-y-3 w-full">
                <label htmlFor="name" className="text-xl">Name</label>
                <input type="text" className="p-3 rounded-lg bg-[#DDD5D5] text-black" id="name" value={dataRegister.name} onChange={handleChange} placeholder="Input Your Name" />
                {errors.name && <span className="text-red-500">{errors.name}</span>}
              </div>
              <div className="flex flex-col gap-y-3 w-full">
                <label htmlFor="username" className="text-xl">Username</label>
                <input type="text" className="p-3 rounded-lg bg-[#DDD5D5] text-black" id="username" value={dataRegister.username} onChange={handleChange} placeholder="Input Your Username" />
                {errors.username && <span className="text-red-500">{errors.username}</span>}
              </div>
              <div className="flex flex-col gap-y-3 w-full">
                <label htmlFor="telepon" className="text-xl">Telepon</label>
                <input type="number" className="p-3 rounded-lg bg-[#DDD5D5] text-black" id="telepon" value={dataRegister.telepon} onChange={handleChange} placeholder="Input Your Telepon" />
                {errors.telepon && <span className="text-red-500">{errors.telepon}</span>}
              </div>
              <div className="flex flex-col gap-y-3 w-full">
                <label htmlFor="email" className="text-xl">Email</label>
                <input type="email" className="p-3 rounded-lg bg-[#DDD5D5] text-black" id="email" value={dataRegister.email} onChange={handleChange} placeholder="Input Your Email" />
                {errors.email && <span className="text-red-500">{errors.email}</span>}
              </div>
              <div className="flex flex-col gap-y-3 w-full">
                <label htmlFor="" className="text-xl">Password</label>
                <div className="flex items-center relative">
                  <input type="password" className="p-3 rounded-lg bg-[#DDD5D5] w-full text-black" id="password" value={dataRegister.password} onChange={handleChange} placeholder="*******" />
                  <i className="fa fa-fw fa-eye absolute right-3 cursor-pointer text-black" onClick={handlePassword}></i>
                </div>
                {errors.password && <span className="text-red-500">{errors.password}</span>}
              </div>
              <div className="flex flex-col gap-y-3 w-full">
                <label htmlFor="confirmPassword" className="text-xl">Confirm Password</label>
                <div className="flex items-center relative">
                  <input type="password" className="p-3 rounded-lg bg-[#DDD5D5] w-full text-black" id="confirmPassword" value={dataRegister.confirmPassword} onChange={handleChange} placeholder="*******" />
                  <i className="fa fa-fw fa-eye absolute right-3 cursor-pointer text-black" onClick={handleConfirmPassword}></i>
                </div>
                {errors.confirmPassword && <span className="text-red-500">{errors.confirmPassword}</span>}
              </div>
              <button type="submit" className="p-3 bg-[#DE4FC1] text-white rounded-lg w-56">Register</button>
            </form>
          </div>
        </section>
      </main>

      {/* Pop-up success message */}
      {isPopupOpen && (
        <div className={`fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50 p-5`}>
          <div className="bg-white p-5 rounded-lg shadow-lg text-center w-full flex flex-col gap-y-5">
            <h2 className="text-2xl text-green-500 font-bold mb-4">Registrasi Berhasil!</h2>
            <button
              onClick={() => (window.location.href = "/loginsection")}
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
