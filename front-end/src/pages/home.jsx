import AuthLayout from "../component/Layouts/AuthLayout"
import HeroSection from "../component/Fragments/HeroSection"
import About from "../component/Fragments/About"
import UnitBisnis from "../component/Fragments/UnitBisnis"
import ProgramKerja from "../component/Fragments/Program"
import Contact from "../component/Fragments/Contact"

const Home = () => {
    return (
        <AuthLayout menu1={'About'} menu2={'Unit Bisnis'} menu3={'Contact'} bgColor={'bg-ejp'} hover={'hover:bg-yellowejp hover:text-ejp p-3 rounded-lg'} menuActive={'bg-yellowejp text-ejp'}>
            <main className="w-full lg:w-3/4 p-3 lg:p-20 flex flex-col gap-10 lg:gap-44 md:gap-20 mt-44" id="home">
                <HeroSection />
                <About />
                <UnitBisnis />
                <ProgramKerja />
                <Contact />
            </main>
        </AuthLayout>
    )
}

export default Home;