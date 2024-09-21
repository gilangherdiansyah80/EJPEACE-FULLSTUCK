import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import DynamicWeekCalendar from "../Elements/DynamicWeekCalendar";
import BackToMain from "../Elements/BackToMain";

const Booking = () => {
    const [showCard, setShowCard] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        date: "",
        timeStart: "",
        timeEnd: "",
    });

    const [formErrors, setFormErrors] = useState({});

    const handleShowCard = () => {
        const errors = validateForm(formData);
        setFormErrors(errors);

        if (Object.keys(errors).length === 0) {
            setShowCard(true);
        }
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const validateForm = (data) => {
        const errors = {};
        if (!data.name) errors.name = "Tolong inputkan nama anda";
        if (!data.email) errors.email = "Tolong inputkan email anda";
        if (!data.phone) errors.phone = "Tolong inputkan nomor anda";
        if (!data.date) errors.date = "Tolong inputkan tanggal booking anda";
        if (!data.timeStart) errors.timeStart = "Tolong inputkan jam mulai booking anda";
        if (!data.timeEnd) errors.timeEnd = "Tolong inputkan jam selesai booking anda";
        return errors;
    };

    const calculateDuration = () => {
        const start = new Date(`1970-01-01T${formData.timeStart}:00`);
        const end = new Date(`1970-01-01T${formData.timeEnd}:00`);
        const diff = (end - start) / 1000 / 60 / 60; // difference in hours
        return diff > 0 ? diff : 0;
    };

    const calculateTotal = () => {
        const duration = calculateDuration();
        const ratePerHour = 50000;
        return duration * ratePerHour;
    };

    const generateBookingId = () => {
        const uniqueId = Math.floor(Math.random() * 90000) + 1;
        return `BOOKING-${uniqueId}`;
    }

    const sendBookingToBackend = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/create-transaction/booking', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    booking_id: generateBookingId(),
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    date: formData.date,
                    timeStart: formData.timeStart,
                    timeEnd: formData.timeEnd,
                    duration: calculateDuration(),
                    total: calculateTotal(),
                }),
            });
    
            const data = await response.json();
        window.snap.pay(data.transactionToken, {
            onSuccess: function(result) {
                console.log('success');
                console.log(result);
                // Kirim data pembayaran ke backend dengan order_id yang benar
                fetch('http://localhost:3000/api/payment-notification', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        order_id: generateBookingId(), // Pastikan order_id benar-benar dikirim dari backend
                        name: formData.name,
                        email: formData.email,
                        phone: formData.phone,
                        date: formData.date,
                        timeStart: formData.timeStart,
                        timeEnd: formData.timeEnd,
                        duration: calculateDuration(),
                        total: calculateTotal(),
                        status: 'Paid',
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

    return (
        <section className="p-3 lg:px-10 lg:w-3/4 lg:self-center flex flex-col gap-y-5">
            <h1 className="text-center font-bold text-2xl lg:text-6xl lg:mb-20">Jadwal Booking</h1>
            <DynamicWeekCalendar />
            <div className="flex flex-col lg:flex-row lg:gap-x-3 gap-y-3">
                <section className="bg-ejp p-3 w-full h-fit flex flex-col gap-y-3 rounded-md lg:gap-y-10 justify-center">
                    {showCard ? (
                        <div className="bg-white p-3 flex flex-col gap-y-5 rounded-xl">
                            <div className="flex justify-between">
                                <h1 className="text-4xl font-bold">Card Booking</h1>
                                <i className="fas fa-times cursor-pointer text-3xl" onClick={() => setShowCard(false)}></i>
                            </div>
                            <div className="flex flex-col gap-y-3">
                                <span>Nama: {formData.name}</span>
                                <span>Email: {formData.email}</span>
                                <span>No Telp: {formData.phone}</span>
                                <span>Date: {formData.date}</span>
                                <span>Jam Mulai: {formData.timeStart} WIB</span>
                                <span>Jam Selesai: {formData.timeEnd} WIB</span>
                                <div className="flex flex-col gap-y-3">
                                    <h2 className="text-2xl font-bold">Total</h2>
                                    <div className="flex justify-between items-center">
                                        <div className="flex flex-col">
                                            <span>{formData.timeStart} WIB - {formData.timeEnd} WIB</span>
                                            <span>({calculateDuration()} jam) x Rp. 50.000</span>
                                        </div>
                                        <div>
                                            <span className="text-xl font-semibold">
                                                {calculateTotal().toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }).replace('IDR', '').trim()}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <button className="p-3 rounded-xl bg-yellowejp" onClick={sendBookingToBackend}>Bayar Sekarang</button>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <h1 className="text-white font-bold text-2xl text-center">Form Booking</h1>
                            <form action="" className="flex flex-col gap-y-3 lg:gap-y-5 w-full">
                                <div className="flex flex-col gap-y-3">
                                    <label htmlFor="name" className="text-white font-bold">Name</label>
                                    <input type="text" id="name" className="p-3 rounded-md" placeholder="Name" value={formData.name} onChange={handleInputChange} />
                                    {formErrors.name && <span className="text-red-500">{formErrors.name}</span>}
                                </div>
                                <div className="flex flex-col gap-y-3">
                                    <label htmlFor="email" className="text-white font-bold">Email</label>
                                    <input type="email" id="email" className="p-3 rounded-md" placeholder="example@gmail.com" value={formData.email} onChange={handleInputChange} />
                                    {formErrors.email && <span className="text-red-500">{formErrors.email}</span>}
                                </div>
                                <div className="flex flex-col gap-y-3">
                                    <label htmlFor="phone" className="text-white font-bold">No Telp</label>
                                    <input type="number" id="phone" className="p-3 rounded-md" placeholder="Masukan no telp dengan format 62xxxxxxx" value={formData.phone} onChange={handleInputChange} />
                                    {formErrors.phone && <span className="text-red-500">{formErrors.phone}</span>}
                                </div>
                                <div className="flex flex-col gap-y-3">
                                    <label htmlFor="date" className="text-white font-bold">Date</label>
                                    <input type="date" id="date" className="p-3 rounded-md" value={formData.date} onChange={handleInputChange} />
                                    {formErrors.date && <span className="text-red-500">{formErrors.date}</span>}
                                </div>
                                <div className="flex flex-col gap-y-3">
                                    <label htmlFor="timeStart" className="text-white font-bold">Jam Mulai</label>
                                    <input type="time" id="timeStart" className="p-3 rounded-md" value={formData.timeStart} onChange={handleInputChange} />
                                    {formErrors.timeStart && <span className="text-red-500">{formErrors.timeStart}</span>}
                                </div>
                                <div className="flex flex-col gap-y-3">
                                    <label htmlFor="timeEnd" className="text-white font-bold">Jam Selesai</label>
                                    <input type="time" id="timeEnd" className="p-3 rounded-md" value={formData.timeEnd} onChange={handleInputChange} />
                                    {formErrors.timeEnd && <span className="text-red-500">{formErrors.timeEnd}</span>}
                                </div>
                                <button type="button" className="p-3 bg-yellowejp rounded-md" onClick={handleShowCard}>Submit</button>
                            </form>
                        </div>
                    )}
                </section>

                <section className="bg-ejp p-3 w-full flex flex-col gap-y-3 rounded-md text-white">
                    <div>
                        <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.5629603064754!2d107.62087617573967!3d-6.942717967966481!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e862246d4d8b%3A0xe9bef92e40558057!2sJl.%20Mutumanikam%20No.69%2C%20Cijagra%2C%20Kec.%20Lengkong%2C%20Kota%20Bandung%2C%20Jawa%20Barat%2040265!5e0!3m2!1sid!2sid!4v1726916438232!5m2!1sid!2sid" 
                            allowFullScreen 
                            loading="lazy" 
                            className="rounded-md w-full h-80 md:h-[574px]" 
                            title="Our Location" />
                    </div>
                    <div className="text-center flex flex-col gap-y-3">
                        <h2 className="font-semibold text-xl">Our Location</h2>
                        <article>Jl. Mutumanikam No.69, Cijagra, Kec. Lengkong, Kota Bandung, Jawa Barat 40265</article>
                        <button className="bg-yellowejp p-3 rounded-md text-black flex gap-x-3 items-center justify-center">
                            <Link to="https://www.google.com/maps/place/Malabar+Mountain+Coffee/@-7.008226,107.629828,15z/data=!4m6!3m5!1s0x2e68e9b4b4e87dbf:0x7d5208789f1774e9!8m2!3d-7.0082264!4d107.629828!16s%2Fg%2F11fl_g5tbb?entry=ttu" className="font-semibold">Buka Maps</Link>
                        </button>
                    </div>
                </section>

                <div id="contact"></div>
            </div>

            <BackToMain bgColor={'bg-ejp'} />
        </section>
    );
};

export default Booking;
