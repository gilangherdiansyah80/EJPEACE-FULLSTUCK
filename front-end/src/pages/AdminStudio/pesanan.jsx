import { useEffect, useState } from "react"
import AuthLayoutAdmin from "../../component/Layouts/AuthLayoutAdmin"
import { Link } from "react-router-dom"

const Pesanan = () => {
    const [dataBooks, setDataBooks] = useState([])
    const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false)
    const [deleteId, setDeleteId] = useState(null)
    const [afterDelete, setAfterDelete] = useState(false)

    const getFetchData = async () => {
        const response = await fetch('http://localhost:3000/api/books')
        const data = await response.json()
        setDataBooks(data.payload.datas)
    }

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/api/booking/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error(`Error deleting the booking with id ${id}`);
            }

            // Refresh data setelah delete
            getFetchData();

            // Reset ID dan tutup popup setelah penghapusan
            setDeleteId(null);
            setIsDeletePopupOpen(false);

        } catch (err) {
            console.error("Error during deletion:", err.message || err);
        }
    };

    const confirmDelete = (id) => {
        setDeleteId(id);
        setIsDeletePopupOpen(true);  // Buka popup untuk konfirmasi
    };

    const cancelDelete = () => {
        setDeleteId(null);  // Reset ID jika penghapusan dibatalkan
        setIsDeletePopupOpen(false);  // Tutup popup
    };

    const proceedDelete = () => {
        if (deleteId) {
            handleDelete(deleteId);  // Lakukan penghapusan
            setAfterDelete(true);
        }
    };

    setTimeout(() => {
        if (afterDelete) {
            setAfterDelete(false);
        }
    }, 3000);

    useEffect(() => {
        getFetchData()
    }, [])

    return (
            <AuthLayoutAdmin>
                <header className="flex justify-between items-center">
                    <p className="text-xl font-semibold">Hi, admin have a nice day</p>
                    <i className="fas fa-user text-black text-xl"></i>
                </header>

                <section className="flex flex-col gap-y-5 items-center w-full">
                    <h1 className="text-xl font-bold">Pesanan</h1>

                    <div className="flex flex-col gap-y-3 w-full">
                        {dataBooks.map((item, index) => (
                            <div key={item.id} className="bg-ejp p-3 rounded-md flex flex-col gap-y-3">
                                <h1 className="text-white text-center font-bold text-2xl">Order #{index + 1}</h1>

                                <div className="text-white">
                                    <p>Order Id : {item.order_id}</p>
                                    <p>Nama : {item.name}</p>
                                    <p>Phone : {item.phone}</p>
                                    <p>Tanggal : {item.date.slice(0, 10)}</p>
                                    <p>Jam Order : {item.time_start} - {item.time_end}</p>
                                </div>

                                <div className="flex gap-x-3 w-full">
                                    <Link to={`/editpesanan/${item.id}`} className="bg-white rounded-lg p-3 w-1/2 text-center">
                                        <button>Edit</button>
                                    </Link>
                                    <button
                                        className="bg-red-700 rounded-lg p-3 text-white w-1/2"
                                        onClick={() => confirmDelete(item.id)}
                                    >
                                        Hapus
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {isDeletePopupOpen && (
                    <section className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-5">
                        <div className="bg-white w-full md:w-1/2 lg:w-1/3 p-5 rounded-lg shadow-lg text-center flex flex-col gap-y-5">
                            <h2 className="text-2xl font-semibold">Are you sure you want to delete this order?</h2>
                            <div className="flex justify-center gap-5">
                                <button
                                    onClick={proceedDelete}
                                    className="bg-ejp text-white px-4 py-2 rounded-lg hover:bg-red-700"
                                >
                                    Yes, Delete
                                </button>
                                <button
                                    onClick={cancelDelete}
                                    className="bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </section>
                )}

                {afterDelete && (
                    <section className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-5">
                        <div className="bg-white w-full md:w-1/2 lg:w-1/3 p-5 rounded-lg shadow-lg text-center flex flex-col gap-y-5">
                            <h2 className="text-2xl font-semibold">Order has been deleted</h2>
                            <i className="fas fa-check-circle text-5xl text-green-500"></i>
                        </div>
                    </section>
                )}
        </AuthLayoutAdmin>
    )
}

export default Pesanan
