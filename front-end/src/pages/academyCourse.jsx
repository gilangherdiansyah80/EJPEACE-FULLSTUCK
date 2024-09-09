import { useState, useEffect } from 'react';
import AuthLayout from '../component/Layouts/AuthLayout';
import HeroAcademySection from '../component/Fragments/HeroAcademySection';
import { useParams } from 'react-router-dom';

const AcademyCourse = () => {
    const [popup, setPopup] = useState(false);
    const [user, setUser] = useState(null);
    const [dataCourse, setDataCourse] = useState([]);
    const { id } = useParams();

    const endPoint = `http://localhost:3000/api/course/${id}`;

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
            // Jika tidak ada data pengguna, redirect ke halaman login
            window.location.href = "/loginsection"; // Ganti dengan rute login yang sesuai
        }

        fetchData();
    }, [id, endPoint]);

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
            <main className="w-full p-3 lg:p-20 flex flex-col gap-10 md:gap-20 mt-32" id="home">
                <HeroAcademySection />
                <section className="mb-52">
                    <h1 className="text-center text-6xl font-bold">Level</h1>
                    <div className="md:grid md:grid-cols-2 md:gap-3 flex flex-col gap-y-3 lg:grid-cols-3 mt-20">
                        {dataCourse.map((item) => (
                            <div key={item.id_course} className='flex flex-col'>
                                <h1>{item.course_name}</h1>
                                <a href={item.course_text} target='_blank'>course text</a>
                                <a href={item.course_video} target='_blank'>course video</a>
                            </div>
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

export default AcademyCourse;