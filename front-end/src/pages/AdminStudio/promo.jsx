import AuthLayoutAdmin from "../../component/Layouts/AuthLayoutAdmin"

const Promo = () => {
    return (
        <div className="bg-ejp min-h-screen p-3 flex flex-col gap-y-10">
            <AuthLayoutAdmin />

            <main className="bg-white p-3 rounded-md flex flex-col gap-y-10">
                <header className="flex justify-between items-center">
                    <p className="text-xl font-semibold">Hi, admin have a nice day</p>
                    <i className="fas fa-user text-black text-xl"></i>
                </header>

                <section className="flex flex-col gap-y-5 items-center">
                    <h1 className="text-xl font-bold">Promo</h1>
                    
                </section>
            </main>
        </div>
    )
}

export default Promo