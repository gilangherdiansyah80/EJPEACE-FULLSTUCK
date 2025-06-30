import { useEffect, useState } from "react"
import AuthLayoutAdmin from "../../component/Layouts/AuthLayoutAdmin"
import { useParams, useNavigate } from "react-router-dom"

const EditPesanan = () => {
    const [dataBook, setDataBook] = useState(null)
    const [updateBooking, setUpdateBooking] = useState({
        date: '',
        time_start: '',
        time_end: ''
    })
    const { id } = useParams()
    const navigate = useNavigate()

    const endPoint = `http://localhost:3000/api/booking/${id}`
    const endPointPut = `http://localhost:3000/api/booking/${id}`

    useEffect(() => {
        const getFetchData = async () => {
            const response = await fetch(endPoint)
            const data = await response.json()
            const bookingData = data.payload.datas[0] // Ambil data pertama jika banyak
            setDataBook(bookingData)
            setUpdateBooking({
                date: bookingData.date ? new Date(bookingData.date).toISOString().split('T')[0] : '',
                time_start: bookingData.time_start || '',
                time_end: bookingData.time_end || ''
            })
        }

        getFetchData()
    }, [id, endPoint])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const response = await fetch(endPointPut, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateBooking)
        })

        if (response.ok) {
            alert('Data updated successfully!')
            navigate('/pesanan') // Redirect ke halaman booking list setelah update berhasil
        } else {
            alert('Failed to update data')
        }
    }

    const handleChange = (e) => {
        setUpdateBooking({
            ...updateBooking,
            [e.target.id]: e.target.value
        })
    }

    return (
        <AuthLayoutAdmin>
            <header className="flex justify-between items-center">
                <p className="text-xl font-semibold">Hi, admin have a nice day</p>
                <i className="fas fa-user text-black text-xl"></i>
            </header>

            <section className="flex flex-col gap-y-5 items-center w-full">
                <h1 className="text-xl font-bold">Edit Pesanan</h1>

                <div className="flex flex-col gap-y-3 w-full">
                    {dataBook && (
                        <form onSubmit={handleSubmit} className="flex flex-col gap-y-5">
                            <div className="flex flex-col gap-y-3">
                                <label htmlFor="date" className="font-bold">Tanggal</label>
                                <input
                                    type="date"
                                    name="date"
                                    id="date"
                                    onChange={handleChange}
                                    className="border-black border-2 rounded-md p-2"
                                    value={updateBooking.date}
                                />
                            </div>
                            <div className="flex flex-col gap-y-3">
                                <label htmlFor="time_start">Jam Mulai</label>
                                <input
                                    type="time"
                                    name="time_start"
                                    id="time_start"
                                    onChange={handleChange}
                                    className="border-black border-2 rounded-md p-2"
                                    value={updateBooking.time_start}
                                />
                            </div>
                            <div className="flex flex-col gap-y-3">
                                <label htmlFor="time_end">Jam Selesai</label>
                                <input
                                    type="time"
                                    name="time_end"
                                    id="time_end"
                                    onChange={handleChange}
                                    className="border-black border-2 rounded-md p-2"
                                    value={updateBooking.time_end}
                                />
                            </div>

                            <div className="flex gap-x-3 w-full">
                                <button
                                    type="button"
                                    className="bg-red-500 px-5 py-2 rounded-lg text-white w-1/2"
                                    onClick={() => navigate('/pesanan')}
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="bg-green-500 px-5 py-2 rounded-lg text-white w-1/2">
                                    Save
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </section>
        </AuthLayoutAdmin>
    )
}

export default EditPesanan
