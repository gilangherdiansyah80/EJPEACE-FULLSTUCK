const Contact = () => {
    return (
        <section className="shadow-xl -mt-10 lg:-mt-44">
                    <div className='w-full flex bg-gray-400 h-52 flex-col justify-center items-center rounded-t-lg lg:h-[683px]'>
                        <img
                            className="opacity-50 object-cover rounded-xl lg:w-1/2 lg:h-full absolute"
                            src='/images/image1.png'
                            alt="Slide"
                        />
                        <div className="flex flex-col text-white w-full justify-center items-center p-3 gap-y-3 absolute">
                            <h1 className="text-4xl lg:text-8xl font-bold">Contact Us</h1>
                            <p className="text-center lg:text-3xl">Anda dapat menghubungi kami melalui kontak yang tersedia di bawah</p>
                        </div>
                    </div>
                    <div className="bg-gray-300 rounded-b-lg flex flex-col gap-y-3 p-3 md:flex-row md:justify-center md:gap-x-5 ">
                        <div className="bg-white flex justify-center items-center rounded-lg p-3 md:w-[400px] md:h-[441px]">
                            <div className="gap-y-3 flex flex-col lg:justify-evenly items-center lg:h-80">
                                <div className="flex flex-col gap-y-3 justify-center items-center">
                                    <i className="fas fa-home text-6xl"></i>
                                    <h1 className="lg:text-3xl font-bold">Alamat</h1>
                                </div>
                                <p className="text-center">Jl. Sritunggal No.4, Cigereleng, Kec. Regol, Kota Bandung, Jawa Barat 40253</p>
                                <button className="bg-ejp p-2 rounded-md text-white">Kunjungi</button>
                            </div>
                        </div>
                        <div className="bg-white flex justify-center items-center rounded-lg p-3 gap-y-3 md:w-[400px] md:h-[441px]">
                            <div className="gap-y-3 flex flex-col lg:gap-y-20 lg:justify-around items-center lg:h-80">
                                <div className="flex flex-col gap-y-3 justify-center items-center">
                                    <i className="fab fa-whatsapp text-6xl"></i>
                                    <h1 className="lg:text-3xl font-bold">Whatsapp</h1>
                                </div>
                                <button className="bg-ejp text-white rounded-md p-2">Hubungi</button>
                            </div>
                        </div>
                        <div className="bg-white flex justify-center items-center rounded-lg p-3 gap-y-3 md:w-[400px] md:h-[441px]">
                            <div className="gap-y-3 flex flex-col lg:gap-y-20 lg:justify-around items-center lg:h-80">
                                <div className="flex flex-col gap-y-3 justify-center items-center">
                                    <i className="far fa-envelope text-6xl"></i>
                                    <h1 className="lg:text-3xl font-bold">Email</h1>
                                </div>
                                <button className="bg-ejp text-white rounded-md p-2">Hubungi</button>
                            </div>
                        </div>
                    </div>  
                </section>
    )
}

export default Contact;