import AuthLayout from "../component/Layouts/AuthLayout"
import HeroAcademySection from "../component/Fragments/HeroAcademySection"
import ProgramHighlight from "../component/Fragments/ProgramHighlight"
import OurMember from "../component/Fragments/OurMember"
import TestimoniAcademy from "../component/Fragments/TestimoniAcademy"
import PacakgeAcademy from "../component/Fragments/PackageAcademy"
import ContactAcademy from "../component/Fragments/ContactAcademy"
import BackToMain from "../component/Elements/BackToMain"

const Academy = () => {
    return (
        <AuthLayout bg={'bg-[#FBA9DB]'} hover={'hover:bg-[#DE4FC1] hover:text-white p-3 rounded-lg'} bgColor={'bg-[#3FD6EB]'} menuActive={'bg-[#DE4FC1] text-white'} menu1={'About'} menu2={'Contact'} menu3={'Unit Bisnis'} button1={'Masuk'} button2={'Daftar'} style1={'p-3 bg-[#DE4FC1] rounded-xl hover:bg-white hover:text-black'} style2={'p-3 bg-white text-black rounded-xl hover:bg-[#DE4FC1] hover:text-white'} link1={'/loginsection'} link2={'/register'}>
            <main className="w-full p-3 lg:p-20 flex flex-col gap-10 md:gap-20 mt-32 lg:w-3/4" id="home">
                <HeroAcademySection />
                <ProgramHighlight />
                <OurMember />
                <TestimoniAcademy />
                <PacakgeAcademy />
                <ContactAcademy />
                <BackToMain bgColor={'bg-[#3FD6EB] mb-5 md:mb-10'} />
            </main>
        </AuthLayout>
    )
}

export default Academy;