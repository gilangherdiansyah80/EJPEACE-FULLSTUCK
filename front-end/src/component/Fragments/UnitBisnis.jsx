import { Fragment } from "react"
import Unit from "../../utils/unit.jsx";
import Card from "../Elements/Card.jsx";

const UnitBisnis = () => {
    return (
        <Fragment>
            <section className="flex flex-col gap-3">
          <h1 className="text-3xl font-bold mb-5 lg:text-6xl lg:mb-16 font-helvetica" data-aos="fade-down">Unit Bisnis</h1>
          <p className="lg:text-xl font-swiss" data-aos="fade-down">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo,
            temporibus culpa, ipsa corporis porro id et harum in laborum tempora
            vitae sed fugit rerum numquam? Laborum, temporibus molestias.
            Deserunt, delectus officiis temporibus assumenda impedit, aut adipisci
            voluptate fuga tempore, nemo iusto nam maiores repudiandae excepturi
            cum beatae quis facilis ipsum?
          </p>

          <div className="md:grid md:grid-cols-2 md:gap-3 flex flex-col gap-y-3 lg:grid-cols-3">
            {Unit.map((item) => (
              <Card style={`w-full bg-black text-white shadow-2xl rounded-lg flex flex-col gap-3 p-3 ${
                  item.id === 4 || item.id === 5 ? 'lg:ms-72' : ''
                } ${item.id === 5 ? 'md:ms-52' : ''}`} key={item.id} src={item.image} name={item.name} deskripsi={item.deskripsi} link={item.link} className={'flex flex-col gap-y-3'} bgImage={'bg-white'}>
                  <button className="bg-white rounded-lg justify-center text-black p-2 flex gap-3 font-swiss w-full">
                    Kunjungi
                    <span>
                    <i className="fas fa-arrow-right"></i>
                    </span>
                </button>
              </Card>
            ))}
          </div>
          
        </section>
        </Fragment>
    )
}

export default UnitBisnis;