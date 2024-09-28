import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AuthLayout from "../component/Layouts/AuthLayout";

const DetailPackage = () => {
    const { id } = useParams(); // Ambil id dari parameter URL
    const [packageData, setPackageData] = useState([]); // Data paket
    const [dataPackage, setDataPackage] = useState([])
    const [user, setUser] = useState(null); // Data user
    const [userData, setUserData] = useState(null); // Data user dari backend
    const [popup, setPopup] = useState(false); // Untuk pop-up logout
    const [handleCheckout, setHandleCheckout] = useState(false);

    const endPoint = `http://localhost:3000/api/packageid/${id}`; // API endpoint yang mengembalikan data berdasarkan ID paket

    useEffect(() => {
        // Fungsi untuk mengambil data paket
        const fetchPackage = async () => {
            const response = await fetch(endPoint);
            const data = await response.json();
            setPackageData(data.payload.datas);
        };

        // Mengambil data user dari localStorage
        const userDataFromStorage = JSON.parse(localStorage.getItem('user'));
        if (userDataFromStorage) {
            setUser(userDataFromStorage);
        } else {
            // Jika tidak ada data pengguna, redirect ke halaman login
            window.location.href = "/loginsection"; // Ganti dengan rute login yang sesuai
        }

        if (userDataFromStorage) {
            setUser(userDataFromStorage);

            // Verifikasi user di backend
            fetch('http://localhost:3000/verify-user', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: userDataFromStorage.user_id })
            })
            .then(res => res.json())
            .then(data => {
                if (data.user) {
                    setUserData(data.user); // Menyimpan data user yang valid
                }
            })
            .catch(error => console.error('Error verifying user:', error));
        }

        fetchPackage();
    }, [id, endPoint]);

    // Trigger pop-up confirmation before logout
    const handleLogout = () => {
        setPopup(true);
    };

    // Close pop-up and perform actual logout
    const confirmLogout = () => {
        localStorage.removeItem('user');
        setPopup(false);
        window.location.href = "/loginsection";
    };

    // Close pop-up without logging out
    const cancelLogout = () => {
        setPopup(false);
    };

    const generateBookingId = () => {
        const uniqueId = Math.floor(Math.random() * 90000) + 1;
        return `ORDER-${uniqueId}`;
    }

    function addMonthToDate(startDate) {
        // Membuat objek Date dari tanggal mulai
        const date = new Date(startDate);
        
        // Menambahkan satu bulan ke tanggal mulai
        date.setMonth(date.getMonth() + 1);
        
        // Mengembalikan tanggal selesai dalam format YYYY-MM-DD
        return date.toISOString().slice(0, 10);
    }

    const toggleCheckout = async () => {
        setHandleCheckout(!handleCheckout);
        try {
            const response = await fetch('http://localhost:3000/api/create-transaction/package', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    order_id: generateBookingId(),
                    nama: userData.name,
                    email: userData.email,
                    noTelepon: userData.telepon,
                    level: 1, // Level default
                    total: 50000
                }),
            });
    
            const data = await response.json();
            window.snap.embed(data.token, {
                embedId: 'snap-container',
                onSuccess: function(result) {
                    console.log('success');
                    console.log(result);
                    // Kirim data pembayaran ke backend dengan order_id yang benar
                    fetch('http://localhost:3000/api/payment-package', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            user_id: userData.user_id,
                            id_paket: id,
                            tanggal_payment: new Date().toISOString().slice(0, 10),
                            tanggal_selesai: addMonthToDate(new Date().toISOString().slice(0, 10)),
                        }),
                    }).then(response => response.text())
                      .then(text => console.log('Backend response:', text))
                      .catch(error => console.error('Error:', error));
                },
                onPending: function(result) {
                    console.log('pending');
                    console.log(result);
                },
                onError: function(result) {
                    console.log('error');
                    console.log(result);
                },
                onClose: function() {
                    console.log('customer closed the popup without finishing the payment');
                }
            });
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    useEffect(() => {
        const snapScript = 'https://app.sandbox.midtrans.com/snap/snap.js'
        const clinetKey = 'SB-Mid-client-4uXuTfW_Jy2oysvc'

        const script = document.createElement('script')
        script.src = snapScript
        script.setAttribute('data-client-key', clinetKey)
        script.async = true

        document.body.appendChild(script)

        return () => {
            document.body.removeChild(script)
        }
    }, [])

    const getPackage = async () => {
        const response = await fetch('http://localhost:3000/api/package')
        const data = await response.json();
        setDataPackage(data.payload.datas);
    }

    useEffect(() => {
        getPackage();
    }, [])

    return (
        <AuthLayout 
            bg={'bg-[#FBA9DB]'} 
            hover={'hover:text-[#DE4FC1]'} 
            bgColor={'bg-[#3FD6EB]'}  
            button1={user ? `Selamat Datang Tuan, ${user.username}` : 'Guest'} 
            button2={'Logout'} 
            style2={'p-3 bg-[#DE4FC1] text-white rounded-xl hover:bg-white hover:text-black'} 
            onClick={handleLogout}
        >
            <main className="w-full p-3 lg:p-20 flex flex-col gap-10 md:gap-20 mt-32 lg:w-3/4" id="home">
                <div className="w-full flex flex-col lg:flex-row gap-y-5 lg:gap-x-10">
                    <section className="lg:w-2/6 bg-[#3FD6EB] rounded-lg">
                       <div className="p-3 flex flex-col gap-y-3">
                       {dataPackage.map((item) => (
                             <div key={item.id_paket} className="flex items-start gap-x-5">
                                    <div className="bg-[#FBA9DB] rounded-xl">
                                       <img src={item.image_url} className="w-40 h-40" alt="" />
                                    </div>
                                    <div>
                                        <h1>Paket : {item.nama_paket}</h1>
                                        <p>Harga : {item.harga}</p>
                                        <p>Level : 1</p>
                                    </div>
                                </div>
                       ))}
                       </div>
                    </section>

                    <section className="lg:w-2/6 bg-white p-3 rounded-lg">
                        <div className="flex flex-col gap-y-5">
                            {packageData.map((data) => (
                                <div key={data.id_paket} className="flex items-start gap-x-5">
                                    <div className="bg-[#FBA9DB] rounded-xl">
                                       <img src={data.image_url} className="w-40 h-40" alt="" />
                                    </div>
                                    <div>
                                        <h1>Paket : {data.nama_paket}</h1>
                                        <p>Harga : {data.harga}</p>
                                        <p>Level : 1</p>
                                        <p>{data.id_paket}</p>
                                    </div>
                                </div>
                            ))}

                            {/* Menampilkan data user */}
                            {userData && (
                                <div className="flex flex-col gap-y-2">
                                    <h2>Nama: {userData.name}</h2>
                                    <p>Email: {userData.email}</p>
                                    <p>No Telepon: {userData.telepon}</p>
                                </div>
                            )}
                            <button onClick={toggleCheckout} className="bg-blue-500 text-white px-4 py-2 rounded">
                                {handleCheckout ? 'Cancel Checkout' : 'Proceed to Checkout'}
                            </button>
                        </div>
                    </section>

                    <section className={`rounded-lg ${handleCheckout ? 'w-full' : 'hidden'} lg:w-1/6`} id="snap-container"></section>
                </div>

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

export default DetailPackage;
