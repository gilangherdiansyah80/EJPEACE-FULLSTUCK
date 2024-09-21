import { Fragment } from "react"
import Card from "../Elements/Card"
import OurFacility from "../../utils/facility"

const Facility = () => {
    return (
        <Fragment>
            <section className="p-3 lg:px-10 lg:w-3/4 self-center flex flex-col">
                <h1 className="text-3xl font-bold mb-5 text-center lg:text-6xl lg:mb-20 font-helvetica">Our Facility</h1>
                <div className="flex flex-col gap-y-5">
                    <article className="text-center">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem quaerat repellat enim labore. Corrupti fugiat officia deserunt, pariatur accusantium at sapiente numquam voluptatem impedit odio earum, architecto, aperiam quia provident nihil quas ex! Delectus consequuntur, error deserunt a, numquam fuga nam facilis expedita id incidunt natus molestias veniam amet reiciendis?
                    </article>
                    <div className="md:grid md:grid-cols-2 lg:grid-cols-3 md:grid-rows-2 flex flex-col gap-y-3 md:gap-3 lg:gap-5">
                        {OurFacility.map((item) => (
                            <Card color={'bg-black'} image={'rounded-t-xl'} className={'p-5 flex flex-col gap-y-5'} style={`w-full shadow-2x text-white flex flex-col gap-3 p-3"`} key={item.id} src={item.image} name={item.name} deskripsi={item.deskripsi} />
                        ))}  
                    </div>
                </div>
                <div id="unitBisnis" />
            </section>
        </Fragment>
    )
}

export default Facility;