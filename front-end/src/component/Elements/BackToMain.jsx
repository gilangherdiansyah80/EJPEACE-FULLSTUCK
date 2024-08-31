import { Link } from "react-router-dom";

const BackToMain = () => {
    return (
        <div id="contact" className="flex justify-center">
            <Link to='/'>
                <button className="bg-[#3FD6EB] w-60 py-5 rounded-lg text-white flex gap-x-3 items-center justify-center">
                    <i className="fas fa-arrow-left"></i>
                    Kemabli Ke Halaman Utama
                </button>
            </Link>
        </div>
    )
}

export default BackToMain;