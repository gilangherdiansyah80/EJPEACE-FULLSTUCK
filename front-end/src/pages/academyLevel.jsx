import { useState, useEffect } from 'react';
import AuthLayout from '../component/Layouts/AuthLayout';
import Card from '../component/Elements/Card';
import { Link, useParams } from 'react-router-dom';
import Hero from '../component/Elements/Hero';
import HeroAcafemy from '../utils/heroAcademy';


const AcademyLevel = () => {
    const [popup, setPopup] = useState(false);
    const [user, setUser] = useState(null);
    const [dataLevel, setdataLevel] = useState([]);
    const { id } = useParams();

    // State untuk bulan dan tahun
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

    const endPoint = 'http://localhost:3000/api/level';
    
    useEffect(() => {
        const getPackage = async () => {
            const response = await fetch(endPoint);
            const data = await response.json();
            setdataLevel(data.payload.datas);
            console.log(data.payload.datas)
        }

        // Ambil data pengguna dari localStorage
        const userData = JSON.parse(localStorage.getItem('user'));

        if (userData) {
            setUser(userData);
        } else {
            // Jika tidak ada data pengguna, redirect ke halaman login
            window.location.href = "/loginsection"; // Ganti dengan rute login yang sesuai
        }

        getPackage();
    }, [endPoint, id]);

    // Fungsi untuk menghitung jumlah hari dalam bulan yang ditentukan
    const daysInMonth = (month, year) => {
        return new Date(year, month + 1, 0).getDate();
    };

    // Fungsi untuk mendapatkan hari pertama dalam bulan yang ditentukan
    const firstDayOfMonth = (month, year) => {
        return new Date(year, month, 1).getDay();
    };

    // Fungsi untuk menghasilkan array kalender
    const generateCalendarDays = () => {
        const days = [];
        const daysInCurrentMonth = daysInMonth(currentMonth, currentYear);
        const firstDay = firstDayOfMonth(currentMonth, currentYear);
        
        // Isi sel kosong sebelum tanggal pertama (untuk menyesuaikan hari pertama dengan minggu)
        for (let i = 0; i < firstDay; i++) {
            days.push(null);
        }

        // Isi tanggal
        for (let i = 1; i <= daysInCurrentMonth; i++) {
            days.push(i);
        }

        return days;
    };

    const handlePreviousMonth = () => {
        if (currentMonth === 0) {
            setCurrentMonth(11);
            setCurrentYear(currentYear - 1);
        } else {
            setCurrentMonth(currentMonth - 1);
        }
    };

    const handleNextMonth = () => {
        if (currentMonth === 11) {
            setCurrentMonth(0);
            setCurrentYear(currentYear + 1);
        } else {
            setCurrentMonth(currentMonth + 1);
        }
    };

    // Trigger pop-up confirmation before logout
    const handleLogout = () => {
        setPopup(true);
    };

    // Close pop-up and perform actual logout
    const confirmLogout = () => {
        // Hapus data pengguna dari localStorage
        localStorage.removeItem('user');
        
        setPopup(false);
        // Redirect user to login page
        window.location.href = "/loginsection"; // Ganti dengan rute login yang sesuai
    };

    // Close pop-up without logging out
    const cancelLogout = () => {
        setPopup(false);
    };

    const days = generateCalendarDays();

    const [currentSlide, setCurrentSlide] = useState(0);

    const handleNextSlide = () => {
        setCurrentSlide((prev) => (prev === HeroAcafemy.length - 1 ? 0 : prev + 1));
    };

    useEffect(() => {
        const interval = setInterval(() => {
            handleNextSlide();
        }, 15000);

        return () => clearInterval(interval);
    }, []);

    return (
        <AuthLayout 
            bg={'bg-[#FBA9DB]'} 
            hover={'hover:text-[#DE4FC1]'} 
            bgColor={'bg-[#3FD6EB]'} 
            menu1={'Level'} 
            button1={user ? `Selamat Datang Tuan, ${user.username}` : 'Guest'} // Menampilkan nama pengguna dari localStorage
            button2={'Logout'} 
            style2={'p-3 bg-[#DE4FC1] text-white rounded-xl hover:bg-white hover:text-black'} 
            onClick={handleLogout}
        >
            <main className="w-full p-3 lg:p-20 flex flex-col gap-10 md:gap-20 mt-32 lg:w-3/4" id="home">
            <Hero rounded={"rounded-xl"} src={HeroAcafemy[currentSlide].image} />
            <section className="flex flex-col items-center mt-3 gap-y-10">
                <div className="flex gap-2">
                    {HeroAcafemy.map((_, index) => (
                    <div
                        key={index}
                        className={`w-2 h-2 rounded-full ${
                        currentSlide === index ? "bg-black" : "bg-gray-300"
                        }`}
                    ></div>
                    ))}
                </div>                
            </section>
                <section className='flex flex-col gap-y-3 text-center lg:flex-row w-full lg:gap-x-5'>
                    <div className="bg-gray-400 rounded-md p-10 lg:w-5/6 flex flex-col justify-center items-center">
                        <h1 className="text-xl text-center">No Information</h1>
                    </div>

                    <div className='bg-white flex flex-col gap-y-3 rounded-md lg:w-1/3'>
                        <div className="flex justify-between items-center bg-[#3FD6EB] p-3">
                            <i onClick={handlePreviousMonth} className='cursor-pointer fas fa-arrow-left' />
                            <h2>{`${new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })} ${currentYear}`}</h2>
                            <i onClick={handleNextMonth} className='cursor-pointer fas fa-arrow-right' />
                        </div>

                        <table className='p-3 mb-2'>
                            <thead>
                                <tr>
                                    <th>Sun</th>
                                    <th>Mon</th>
                                    <th>Tue</th>
                                    <th>Wed</th>
                                    <th>Thu</th>
                                    <th>Fri</th>
                                    <th>Sat</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array(Math.ceil(days.length / 7)).fill().map((_, rowIndex) => (
                                    <tr key={rowIndex}>
                                        {days.slice(rowIndex * 7, rowIndex * 7 + 7).map((day, colIndex) => (
                                            <td key={colIndex}>{day || ''}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                <section className="mb-52 flex flex-col gap-y-7">
                    <h1 className="text-center text-4xl md:text-6xl font-bold">Level</h1>
                    <div className="md:grid md:grid-cols-2 md:gap-3 flex flex-col gap-y-3 lg:grid-cols-3">
                        {dataLevel?.map((item) => (
                            <Card 
                                key={item.id_course} 
                                style={`w-full bg-white text-black shadow-2xl rounded-lg flex flex-col gap-3 p-3`}
                                src={item.img_url}  
                                name={item.level}
                                className={'flex flex-col gap-y-3'} 
                                bgImage={'bg-gray-300'}
                            >
                                <Link to={`/academycourse/${id}/${item.id_level}`}>
                                <button className="bg-[#FBA9DB] rounded-lg justify-center text-black p-2 flex gap-3 font-swiss w-full">
                                    Masuk
                                    <span>
                                        <i className="fas fa-arrow-right"></i>
                                    </span>
                                </button>
                                </Link>
                            </Card>
                        ))}
                    </div>

                    <div id="unitBisnis"></div>
                </section>

                {/* Pop-up logout confirmation */}
                {popup && (
                    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50 p-5">
                        <div className="bg-white md:w-1/2 lg:w-1/3 p-5 rounded-lg shadow-lg text-center w-full flex flex-col gap-y-5">
                            <h2 className="text-2xl font-semibold">Are you sure you want to logout?</h2>
                            <div className="flex justify-center gap-5">
                                <button
                                    onClick={confirmLogout}
                                    className="bg-[#DE4FC1] text-white px-4 py-2 rounded-lg hover:bg-red-700"
                                >
                                    Yes, Logout
                                </button>
                                <button
                                    onClick={cancelLogout}
                                    className="bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </AuthLayout>
    )
}

export default AcademyLevel;