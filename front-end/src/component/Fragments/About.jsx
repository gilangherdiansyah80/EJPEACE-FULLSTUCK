import { Fragment } from "react";

const About = () => {
  return (
    <Fragment>
      <section className="flex flex-col gap-y-10 bg-black rounded-md text-white p-3 md:p-5">
        <h1
          className="text-center text-2xl font-bold md:text-3xl lg:text-6xl"
          data-aos="fade-down"
        >
          About Us
        </h1>
        <article className="text-center" data-aos="fade-down">
          eJ Peace Entertainment est. in 2019. We are a creative enterprise that
          initially aimed to bridge the gap between companies seeking
          promotional endorsements through the creative industry. Over the
          years, eJ Peace Entertainment has evolved into a global service
          provider, catering to numerous clients not only in Indonesia but also
          on an international scale. Expanding its horizons, eJ Peace
          Entertainment has diversified its business lines to include ventures
          such as eJ Peace Academy, eJ Peace Coffee, eJ Peace Squad, and eJ
          Peace Studio.
        </article>
        <div className="w-full flex flex-col md:flex-row md:gap-x-3 gap-y-3 md:justify-center">
          <img
            src="images/image3.jpg"
            className="rounded-xl h-80 md:w-[250px] md:h-[250px]"
            alt=""
            data-aos="flip-right"
            data-aos-duration="500"
            data-aos-delay="50"
          />
          <img
            src="images/image2.jpg"
            className="rounded-xl md:w-[250px] md:h-[250px]"
            alt=""
            data-aos="flip-right"
            data-aos-duration="1000"
            data-aos-delay="100"
          />
          <img
            src="images/image2.jpg"
            className="rounded-xl md:w-[250px] md:h-[250px]"
            alt=""
            data-aos="flip-right"
            data-aos-duration="1500"
            data-aos-delay="150"
          />
        </div>
        <article className="text-center" data-aos="fade-down">
          To be a leading creative hub, fostering innovation and excellence in
          the entertainment industry, while establishing a strong presence in
          diverse sectors through our unique business lines.
        </article>
        <div className="flex flex-col text-black gap-y-3 md:flex-row md:justify-center md:gap-x-3">
          <div
            className="bg-white rounded-md text-center p-5 flex flex-col gap-y-5"
            data-aos="flip-right"
            data-aos-duration="500"
            data-aos-delay="50"
          >
            <h2 className="text-3xl font-bold">6</h2>
            <p>Tahun Berkarya</p>
          </div>
          <div
            className="bg-white rounded-md text-center p-5 flex flex-col gap-y-5"
            data-aos="flip-right"
            data-aos-duration="1000"
            data-aos-delay="100"
          >
            <h2 className="text-3xl font-bold">6</h2>
            <p>Tahun Berkarya</p>
          </div>
          <div
            className="bg-white rounded-md text-center p-5 flex flex-col gap-y-5"
            data-aos="flip-right"
            data-aos-duration="1500"
            data-aos-delay="150"
          >
            <h2 className="text-3xl font-bold">6</h2>
            <p>Tahun Berkarya</p>
          </div>
          <div
            className="bg-white rounded-md text-center p-5 flex flex-col gap-y-5"
            data-aos="flip-right"
            data-aos-duration="2000"
            data-aos-delay="100"
          >
            <h2 className="text-3xl font-bold">6</h2>
            <p>Tahun Berkarya</p>
          </div>
        </div>

        <div id="ourservice" />
      </section>
    </Fragment>
  );
};

export default About;
