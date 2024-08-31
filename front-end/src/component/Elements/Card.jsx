// eslint-disable-next-line react-refresh/only-export-components, react/prop-types
import { Link } from "react-router-dom";
// eslint-disable-next-line react/prop-types
const Card = ( {key, className, image, src, style, name, deskripsi, children, link, color, padding, bgImage}) => {
    return (
            <div
              key={key}
              className={`w-full ${color} shadow-2xl rounded-xl flex flex-col gap-3 ${padding} ${style}`}
            >
              <div className={`rounded-xl ${bgImage}`}>
                <img src={src} className={image} alt="" />
              </div>
              <div className={className}>
                <h1 className="text-xl font-bold font-helvetica">{name}</h1>
                <p className="font-swiss">{deskripsi}</p>
                <Link to={link}>
                    {children}
                </Link>
              </div>
            </div>
    )
}

export default Card;