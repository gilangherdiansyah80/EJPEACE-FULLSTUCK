import { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../component/Layouts/AuthLayout";
import HeroAcademySection from "../component/Fragments/HeroAcademySection";
import Card from "../component/Elements/Card";

const AcademyUser = () => {
    const [isLogoutPopupOpen, setIsLogoutPopupOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [packageData, setPackageData] = useState([]);
    const [purchasedPackages, setPurchasedPackages] = useState([]);
    const navigate = useNavigate();

    const API_BASE_URL = 'http://localhost:3000/api';

    const fetchPackageData = useCallback(async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/package`);
            if (!response.ok) throw new Error('Failed to fetch package data');
            const data = await response.json();
            setPackageData(data.payload.datas);
        } catch (error) {
            console.error('Failed to fetch package data:', error);
            // Consider adding user-friendly error handling here
        }
    }, []);

    const fetchPurchasedPackages = useCallback(async (userId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/siswa/${userId}`);
            if (!response.ok) throw new Error('Failed to fetch purchased packages');
            const data = await response.json();
            if (data.payload && data.payload.datas && Array.isArray(data.payload.datas)) {
                const purchasedIds = data.payload.datas.map(item => item.id_paket);
                setPurchasedPackages(purchasedIds);
            } else {
                console.error('Unexpected data structure:', data);
                setPurchasedPackages([]);
            }
        } catch (error) {
            console.error('Failed to fetch purchased packages:', error);
            setPurchasedPackages([]);
        }
    }, []);

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('user'));
        if (userData) {
            setUser(userData);
            fetchPackageData();
            fetchPurchasedPackages(userData.user_id);
        } else {
            navigate("/loginsection");
        }
    }, [fetchPackageData, fetchPurchasedPackages, navigate]);

    const handleLogout = () => setIsLogoutPopupOpen(true);

    const confirmLogout = () => {
        localStorage.removeItem('user');
        setIsLogoutPopupOpen(false);
        navigate("/loginsection");
    };

    const isPackagePurchased = (packageId) => {
        return purchasedPackages.includes(packageId);
    };

    return (
        <AuthLayout 
            bg='bg-[#FBA9DB]'
            hover='hover:text-[#DE4FC1]'
            bgColor='bg-[#3FD6EB]'
            menu1='Package'
            button1={user ? `Selamat Datang Tuan, ${user.username}` : 'Guest'}
            button2='Logout'
            style2='p-3 bg-[#DE4FC1] text-white rounded-xl hover:bg-white hover:text-black'
            onClick={handleLogout}
        >
            <main className="w-full p-3 lg:p-20 flex flex-col gap-10 md:gap-20 mt-32" id="home">
                <HeroAcademySection />
                <section className="mb-52">
                    <h1 className="text-center text-6xl font-bold">Package</h1>
                    <div className="md:grid md:grid-cols-2 md:gap-3 flex flex-col gap-y-3 lg:grid-cols-3 mt-20">
                        {packageData.map((item) => {
                            const isPurchased = isPackagePurchased(item.id_paket);
                            return (
                                <Card 
                                    key={item.id_paket}
                                    style="w-full bg-white text-black shadow-2xl rounded-lg flex flex-col gap-3 p-3"
                                    src={item.image_url}
                                    name={item.nama_paket}
                                    deskripsi={item.deskripsi}
                                    className="flex flex-col gap-y-3"
                                    bgImage="bg-gray-300"
                                >
                                    <Link to={isPurchased ? `/academylevel` : `/detailpackage/${item.id_paket}`}>
                                        <button className="bg-[#FBA9DB] rounded-lg justify-center text-black p-2 flex gap-3 font-swiss w-full">
                                            {isPurchased ? 'Masuk Kelas' : 'Beli'}
                                            <span>
                                                <i className="fas fa-arrow-right"></i>
                                            </span>
                                        </button>
                                    </Link>
                                </Card>
                            );
                        })}
                    </div>
                </section>

                {isLogoutPopupOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-5">
                        <div className="bg-white w-full md:w-1/2 lg:w-1/3 p-5 rounded-lg shadow-lg text-center flex flex-col gap-y-5">
                            <h2 className="text-2xl font-semibold">Are you sure you want to logout?</h2>
                            <div className="flex justify-center gap-5">
                                <button
                                    onClick={confirmLogout}
                                    className="bg-[#DE4FC1] text-white px-4 py-2 rounded-lg hover:bg-red-700"
                                >
                                    Yes, Logout
                                </button>
                                <button
                                    onClick={() => setIsLogoutPopupOpen(false)}
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