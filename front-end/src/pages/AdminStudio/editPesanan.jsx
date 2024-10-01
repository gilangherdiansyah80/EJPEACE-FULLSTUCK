import { useEffect, useState } from "react"
import AuthLayoutAdmin from "../../component/Layouts/AuthLayoutAdmin"
import { useParams } from "react-router-dom"

const EditPesanan = () => {
    const [dataBook, setDataBook] = useState([])
    const { id } = useParams()

    const endPoint = `http://localhost:3000/api/booking/${id}`

    useEffect(() => {
        const getFetchData = async () => {
            const response = await fetch(endPoint)
            const data = await response.json()
            setDataBook(data.payload.data)
        }

        getFetchData()
    }, [id, endPoint])

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
                        {dataBook.map((item) => (
                            <form key={item.id} action="">
                                <div>
                                    <label htmlFor="date">Tanggal</label>
                                    <input type="date" name="date" id="date" defaultValue={item.date} />
                                </div>
                                <div>
                                    <label htmlFor="timeStart">Jam Mulai</label>
                                    <input type="time" name="timeStart" id="timeStart" defaultValue={item.timeStart} />
                                </div>
                                <div>
                                    <label htmlFor="timeEnd">Jam Selesai</label>
                                    <input type="time" name="timeEnd" id="timeEnd" defaultValue={item.timeEnd} />
                                </div>

                                <div>
                                    <button>Cancel</button>
                                    <button>Save</button>
                                </div>
                            </form>
                        ))}
                    </div>
                </section>

                {/* {afterDelete && (
                    <section className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-5">
                        <div className="bg-white w-full md:w-1/2 lg:w-1/3 p-5 rounded-lg shadow-lg text-center flex flex-col gap-y-5">
                            <h2 className="text-2xl font-semibold">Order has been deleted</h2>
                            <i className="fas fa-check-circle text-5xl text-green-500"></i>
                        </div>
                    </section>
                )} */}
            </main>
        </div>
    )
}

export default EditPesanan