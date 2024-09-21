import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const BackToMain = ({bgColor}) => {
    return (
        <div id="contact" className="flex justify-center">
            <Link to='/'>
                <button className={`${bgColor} w-60 py-5 rounded-lg text-white flex gap-x-3 items-center justify-center`}>
                    <i className="fas fa-arrow-left"></i>
                    <p>Kemabli Ke Halaman Utama</p>
                </button>
            </Link>
        </div>
    )
}

export default BackToMain;