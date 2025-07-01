import { Fragment } from "react";
import AboutData from "../../utils/about";

const About = () => {
  return (
    <Fragment>
      <section className="flex flex-col gap-y-10 bg-black rounded-md text-white p-3 md:p-5">
        <h1
          className="text-center text-2xl font-bold md:text-3xl lg:text-4xl"
          data-aos="fade-down"
        >
          About Us
        </h1>
        <article className="text-center" data-aos="fade-down">
          Sejak 2018, EJPEACE Entertainment telah melahirkan berbagai idol dan
          grup musik dengan karakter unik dan orisinal. Mulai dari Blekjek (kini
          EJPEACE), boyband comedy yang menjadi ikon hiburan, Asha girlband
          generasi pertama, Coco kids girlband yang debut di 2025, hingga
          Pappilonia band pop-punk beranggotakan wanita yang akan segera
          menghadirkan warna baru di dunia musik Indonesia.
        </article>
        <section className="w-full flex flex-col md:flex-row md:gap-x-3 gap-x-3 md:justify-center md:items-center p-6 bg-[#74690f] rounded-lg">
          {AboutData.map((item) => (
            <div
              className="flex flex-col gap-y-3 justify-center items-center w-1/3"
              key={item.id}
            >
              <img
                src={item.image}
                className="rounded-xl w-full"
                alt=""
                data-aos="flip-right"
                data-aos-duration="500"
                data-aos-delay="50"
              />
              <article className="flex flex-col gap-y-3">
                <h1 className="text-2xl font-bold text-yellowejp">
                  {item.title}
                </h1>
                <p>{item.description}</p>
              </article>
            </div>
          ))}
        </section>
        <div className="flex flex-col text-black gap-y-3 md:flex-row md:justify-center md:gap-x-3 w-full">
          <div
            className="bg-gradient-to-r from-[#f6df3c] to-[#74690f] rounded-md text-center p-5 flex flex-col gap-y-5 w-full"
            data-aos="flip-right"
            data-aos-duration="500"
            data-aos-delay="50"
          >
            <h2 className="text-3xl font-bold">7</h2>
            <p>Years on Industry</p>
          </div>
          <div
            className="bg-gradient-to-r from-[#f6df3c] to-[#74690f] rounded-md text-center p-5 flex flex-col gap-y-5 w-full"
            data-aos="flip-right"
            data-aos-duration="1000"
            data-aos-delay="100"
          >
            <h2 className="text-3xl font-bold">99+</h2>
            <p>KOL & Influencer</p>
          </div>
          <div
            className="bg-gradient-to-r from-[#f6df3c] to-[#74690f] rounded-md text-center p-5 flex flex-col gap-y-5 w-full"
            data-aos="flip-right"
            data-aos-duration="1500"
            data-aos-delay="150"
          >
            <h2 className="text-3xl font-bold">99+</h2>
            <p>Brand Handle</p>
          </div>
          <div
            className="bg-gradient-to-r from-[#f6df3c] to-[#74690f] rounded-md text-center p-5 flex flex-col gap-y-5 w-full"
            data-aos="flip-right"
            data-aos-duration="2000"
            data-aos-delay="100"
          >
            <h2 className="text-3xl font-bold">5</h2>
            <p>Intellectual Property</p>
          </div>
        </div>

        <div id="ourservice" />
      </section>
    </Fragment>
  );
};

export default About;
