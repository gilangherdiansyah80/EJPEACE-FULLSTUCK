import AuthLayout from "../component/Layouts/AuthLayout";
import HeroSection from "../component/Fragments/HeroSection";
import About from "../component/Fragments/About";
import ProgramKerja from "../component/Fragments/Program";
import Contact from "../component/Fragments/Contact";

const Home = () => {
  return (
    <AuthLayout
      menu1={"About Us"}
      menu2={"Our Service"}
      menu3={"Contact"}
      menu4={"Marketplace"}
      bgColor={"bg-ejp"}
      hover={"hover:bg-yellowejp hover:text-ejp p-3 rounded-lg"}
      menuActive={"bg-yellowejp text-ejp"}
    >
      <main
        className="w-full lg:w-3/4 p-3 flex flex-col gap-y-10 mt-32 md:mt-44"
        id="home"
      >
        <HeroSection />
        <About />
        <ProgramKerja />
        <Contact />
      </main>
    </AuthLayout>
  );
};

export default Home;
