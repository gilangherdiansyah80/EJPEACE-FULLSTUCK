import { useEffect, useState } from "react"
import AuthLayoutAdmin from "../../component/Layouts/AuthLayoutAdmin"

const Pesanan = () => {
    const [dataBooks, setDataBooks] = useState([])

    const getFetchData = async () => {
        const response = await fetch('http://localhost:3000/api/books')
        const data = await response.json()
        setDataBooks(data.payload.datas)
    }

    useEffect(() => {
        getFetchData()
    }, [])
    return (
        <div className="bg-ejp min-h-screen p-3 flex flex-col gap-y-10">
            <AuthLayoutAdmin />

            <main className="bg-white p-3 rounded-md flex flex-col gap-y-10">
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
                                    <button className="bg-white rounded-lg p-3 w-1/2">Edit</button>
                                    <button className="bg-red-700 rounded-lg p-3 text-white w-1/2">Hapus</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    )
}

export default Pesanan