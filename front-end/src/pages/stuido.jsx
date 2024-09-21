import AuthLayout from "../component/Layouts/AuthLayout"
import Hero from "../component/Elements/Hero"
import Facility from "../component/Fragments/Facility"
import Booking from "../component/Fragments/Booking"

const Stuido = () => {
    return (
        <AuthLayout bg={'bg-yellowejp'} menu1={'Our Facility'} menu2={'Jadwal Booking'} menu3={'Unit Binsis'} bgColor={'bg-ejp'} hover={'hover:bg-yellowejp hover:text-ejp p-3 rounded-lg'}>
            <main className="w-full flex flex-col gap-10 lg:gap-44 md:gap-20 mt-44 bg-yellowejp" id="home">
                <section className="flex flex-col w-full">
                    <Hero src={'images/EJP-Creative.png'} title={'EJ Peace Studio'} description={'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque perferendis exercitationem quas error necessitatibus officiis explicabo est mollitia maiores sed fugiat velit.'} buttonText={'Booking'} buttonStyle={'bg-yellowejp rounded-lg w-28 text-black h-10 p-2'} />
                    <div id="about"></div>
                </section>
                <Facility />
                <Booking />
            </main>
        </AuthLayout>
    )
}

export default Stuido;