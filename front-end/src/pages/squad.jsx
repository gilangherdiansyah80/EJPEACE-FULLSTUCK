import AuthLayout from "../component/Layouts/AuthLayout"
import HeroSquadSection from "../component/Fragments/HeroSquad"
import ProgramHighlightSquad from "../component/Fragments/ProgramHighlightSquad"
import OurMember from "../component/Fragments/OurMember"
import ContactSquad from "../component/Fragments/ContactSquad"
import BackToMain from "../component/Elements/BackToMain"

const Squad = () => {
    return (
        <AuthLayout bg={'bg-[#2098B5]'} hover={'hover:text-[#FFC255]'} bgColor={'bg-[#FB7316]'} menu1={'About'} menu2={'Contact'} menu3={'Unit Bisnis'}>
            <main className="w-full p-3 lg:p-20 flex flex-col gap-10 md:gap-20 mt-32" id="home">
                <HeroSquadSection />
                <ProgramHighlightSquad />
                <section className="flex flex-col justify-center items-center gap-y-20">
                    <h1 className="text-center text-6xl font-bold">Category</h1>
                    <div className="lg:grid lg:grid-cols-3 lg:gap-5">
                        <div className="bg-[#FB7316] py-5 w-52 rounded-md text-white text-center">Category</div>
                        <div className="bg-[#FB7316] py-5 w-52 rounded-md text-white text-center">Category</div>
                        <div className="bg-[#FB7316] py-5 w-52 rounded-md text-white text-center">Category</div>
                        <div className="bg-[#FB7316] py-5 w-52 rounded-md text-white text-center">Category</div>
                        <div className="bg-[#FB7316] py-5 w-52 rounded-md text-white text-center">Category</div>
                        <div className="bg-[#FB7316] py-5 w-52 rounded-md text-white text-center">Category</div>
                    </div>
                </section>
                <OurMember />
                <ContactSquad />
                <BackToMain />
            </main>
        </AuthLayout>
    )
}

export default Squad;