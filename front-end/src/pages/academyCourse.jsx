import { useState, useEffect } from 'react';
import AuthLayout from '../component/Layouts/AuthLayout';
import { useParams } from 'react-router-dom';

const AcademyCourse = () => {
    const [popup, setPopup] = useState(false);
    const [user, setUser] = useState(null);
    const [dataCourse, setDataCourse] = useState([]);
    const { id_level, id_paket } = useParams();
    const [arrow, setArrow] = useState([]);
    
    // State untuk bulan dan tahun
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

    const endPoint = `http://localhost:3000/api/course/${id_level}/${id_paket}`;

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(endPoint);
            const data = await response.json();
            setDataCourse(data.payload.datas);
        };

        // Ambil data pengguna dari localStorage
        const userData = JSON.parse(localStorage.getItem('user'));
        if (userData) {
            setUser(userData);
        } else {
            window.location.href = "/loginsection"; // Redirect ke halaman login jika tidak ada data pengguna
        }

        fetchData();
    }, [id_level, id_paket, endPoint]);

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

    const handleLogout = () => {
        setPopup(true);
    };

    const confirmLogout = () => {
        localStorage.removeItem('user');
        setPopup(false);
        window.location.href = "/loginsection";
    };

    const cancelLogout = () => {
        setPopup(false);
    };

    const handleArrow = (courseId) => {
        if (arrow.includes(courseId)) {
            setArrow(arrow.filter((id) => id !== courseId));
        } else {
            setArrow([...arrow, courseId]);
        }
    };

    const days = generateCalendarDays();

    return (
        <AuthLayout 
            bg={'bg-[#FBA9DB]'} 
            hover={'hover:text-[#DE4FC1]'} 
            bgColor={'bg-[#3FD6EB]'} 
            menu1={'Level'} 
            button1={user ? `Selamat Datang Tuan, ${user.username}` : 'Guest'} 
            button2={'Logout'} 
            style2={'p-3 bg-[#DE4FC1] text-white rounded-xl hover:bg-white hover:text-black'} 
            onClick={handleLogout}
        >
            <main className="w-full p-3 lg:p-20 flex flex-col gap-10 md:gap-20 mt-32" id="home">
                <section className='flex flex-col gap-y-3 text-center'>
                    <div className="bg-gray-400 rounded-md p-10">
                        <h1 className="text-xl text-center">No Information</h1>
                    </div>

                    <div className='bg-white flex flex-col gap-y-3 p-3 rounded-md'>
                        <div className="flex justify-between items-center">
                            <i onClick={handlePreviousMonth} className='cursor-pointer fas fa-arrow-left' />
                            <h2>{`${new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })} ${currentYear}`}</h2>
                            <i onClick={handleNextMonth} className='cursor-pointer fas fa-arrow-right' />
                        </div>

                        <table>
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
                    <h1 className="text-4xl md:text-6xl font-bold">Course</h1>
                    <div className="md:grid md:grid-cols-2 md:gap-3 flex flex-col gap-y-3 lg:grid-cols-3">
                        {dataCourse?.map((item) => (
                            <div key={item.id_course} className='flex flex-col gap-y-3'>
                                <div className='flex justify-between items-center' onClick={() => handleArrow(item.id_course)}>
                                    <h1 className='text-xl font-semibold'>{item.course_name}</h1>
                                    <div>
                                        {arrow.includes(item.id_course) ? (
                                            <i className='fas fa-chevron-down'></i>
                                        ) : (
                                            <i className='fas fa-chevron-up'></i>
                                        )}
                                    </div>
                                </div>
                                <hr className='border-black' />
                                {arrow.includes(item.id_course) && (
                                    <div className='flex flex-col gap-y-3'>
                                        <a href={item.course_text} target='_blank'>course text</a>
                                        <a href={item.course_video} target='_blank'>course video</a>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

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
    );
};

export default AcademyCourse;
