import { useEffect, useState } from "react";
import AuthLayout from "../component/Layouts/AuthLayout";
import HeroAcademySection from "../component/Fragments/HeroAcademySection";
import Card from "../component/Elements/Card";
import { Link } from "react-router-dom";

const AcademyUser = () => {
    const [popup, setPopup] = useState(false);
    const [user, setUser] = useState(null);
    const [packageData, setPackageData] = useState([]);

    const endPoint = 'http://localhost:3000/api/package';

    const fetchData = async () => {
        const response = await fetch(endPoint);
        const data = await response.json();
        setPackageData(data.payload.datas);
    };

    useEffect(() => {
        fetchData();
        // Ambil data pengguna dari localStorage
        const userData = JSON.parse(localStorage.getItem('user'));

        if (userData) {
            setUser(userData);
        } else {
            // Jika tidak ada data pengguna, redirect ke halaman login
            window.location.href = "/loginsection"; // Ganti dengan rute login yang sesuai
        }
    }, []);

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
            menu1={'About'} 
            menu2={'Contact'} 
            menu3={'Unit Bisnis'} 
            button1={user ? `Selamat Datang Tuan, ${user.username}` : 'Guest'} // Menampilkan nama pengguna dari localStorage
            button2={'Logout'} 
            style2={'p-3 bg-[#DE4FC1] text-white rounded-xl hover:bg-white hover:text-black'} 
            onClick={handleLogout}
        >
            <main className="w-full p-3 lg:p-20 flex flex-col gap-10 md:gap-20 mt-32" id="home">
                <HeroAcademySection />
                <section className="mb-52">
                    <h1 className="text-center text-6xl font-bold">Package</h1>
                    <div className="md:grid md:grid-cols-2 md:gap-3 flex flex-col gap-y-3 lg:grid-cols-3 mt-20">
                        {packageData.map((item) => (
                            <Card 
                                key={item.id_paket} 
                                style={`w-full bg-white text-black shadow-2xl rounded-lg flex flex-col gap-3 p-3`} 
                                src={item.image_url} 
                                name={item.nama_paket} 
                                deskripsi={item.deskripsi} 
                                className={'flex flex-col gap-y-3'} 
                                bgImage={'bg-gray-300'}
                            >
                                <Link to={`/detailpackage/${item.id_paket}`}>
                                <button className="bg-[#FBA9DB] rounded-lg justify-center text-black p-2 flex gap-3 font-swiss w-full">
                                    Beli
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
    );
};

export default AcademyUser;
