import Package from "../../utils/package";
import Card from "../Elements/Card";
import { Link } from "react-router-dom";

const PacakgeAcademy = () => {
    return (
        <section className="lg:mb-52">
                    <h1 className="text-center text-6xl font-bold">Pacakge</h1>
                    <div className="md:grid md:grid-cols-2 md:gap-3 flex flex-col gap-y-3 lg:grid-cols-3 mt-20">
                            {Package.map((item) => (
                                <Card 
                                    key={item.id} 
                                    style={`w-full bg-white text-black shadow-2xl rounded-lg flex flex-col gap-3 p-3`} 
                                    src={item.image} 
                                    name={item.name} 
                                    deskripsi={item.deskripsi} 
                                    link={item.link} 
                                    className={'flex flex-col gap-y-3'} 
                                    bgImage={'bg-gray-300'}
                                >
                                    <Link to='/loginsection'>
                                        <button className="bg-[#FBA9DB] rounded-lg justify-center text-black p-2 flex gap-3 font-swiss w-full">
                                            Beli
                                            <span>
                                                <i className="fas fa-arrow-right"></i>
                                            </span>
                                        </button>
                                    </Link>
                                </Card>
                            ))}
                    </div>

                    <div id="unitBisnis"></div>
        </section>
    )
}

export default PacakgeAcademy;