import { useState } from "react"
import { Link } from "react-router-dom"

const AuthLayoutAdmin = () => {
    const [isOpen, setIsOpen] = useState(false)

    const handleOpen = () => {
        setIsOpen(!isOpen)
    }

    return (
        <aside className="p-3">
                {isOpen ? (
                    <i className="fas fa-times text-white text-xl" onClick={handleOpen}></i>
                ) : (
                    <i className="fas fa-bars text-white text-xl" onClick={handleOpen}></i>
                )}

                {/* Sidebar for Mobile Device and Tablet Device */}
                {isOpen && (
                    <nav className="min-h-screen flex flex-col items-center gap-y-10">
                        <div className="flex flex-col justify-between items-center">
                            <img className="w-52 lg:h-52 mt-5 lg:w-52" src="/images/EJP-Creative.png" alt="EJ PEACE" />
                            <div className="-mt-14 flex flex-col gap-y-2 justify-center items-center">
                                <div className="border-2 rounded-full w-12 h-12 flex justify-center items-center">
                                    <i className="fas fa-user text-white text-2xl"></i>
                                </div>
                                <h1 className="text-white font-bold text-xl">Admin</h1>
                            </div>
                        </div>
                        <ul className="w-full flex flex-col gap-y-5 justify-center items-center">
                            <Link to='/homeadminstudio' className={`text-xl p-3 text-white w-full ${location.pathname === '/homeadminstudio' ? 'bg-white text-black rounded-xl' : 'hover:text-black hover:bg-white hover:rounded-xl'}`} onClick={handleOpen}>
                                <li className={`flex items-center gap-x-3 justify-center`}>
                                    <i className={`fas fa-home ${location.pathname === '/homeadminstudio' ? 'text-black' : 'hover:text-black hover:bg-white hover:rounded-xl'}`}></i>
                                    <p className={`font-semibold ${location.pathname === '/homeadminstudio' ? 'text-black' : 'hover:text-black hover:bg-white hover:rounded-xl'}`}>Home</p>
                                </li>
                            </Link>
                            <Link to='/pesanan' className={`text-xl p-3 text-white w-full ${location.pathname === '/pesanan' ? 'bg-white text-black rounded-xl' : 'hover:text-black hover:bg-white hover:rounded-xl'}`} onClick={handleOpen}>
                                <li className={`flex items-center gap-x-3 justify-center`}>
                                    <i className={`fas fa-shopping-cart ${location.pathname === '/pesanan' ? 'text-black' : 'hover:text-black hover:bg-white hover:rounded-xl'}`}></i>
                                    <p className={`font-semibold ${location.pathname === '/pesanan' ? 'text-black' : 'hover:text-black hover:bg-white hover:rounded-xl'}`}>Pesanan</p>
                                </li>
                            </Link>
                            <Link to='/promo' className={`text-xl p-3 text-white w-full ${location.pathname === '/promo' ? 'bg-white text-black rounded-xl' : 'hover:text-black hover:bg-white hover:rounded-xl'}`} onClick={handleOpen}>
                                <li className={`flex items-center gap-x-3 justify-center`}>
                                    <i className={`fas fa-tag ${location.pathname === '/promo' ? 'text-black' : 'hover:text-black hover:bg-white hover:rounded-xl'}`}></i>
                                    <p className={`font-semibold ${location.pathname === '/promo' ? 'text-black' : 'hover:text-black hover:bg-white hover:rounded-xl'}`}>Promo</p>
                                </li>
                            </Link>
                        </ul>
                    </nav>
                )}
            </aside>
    )
}

export default AuthLayoutAdmin;