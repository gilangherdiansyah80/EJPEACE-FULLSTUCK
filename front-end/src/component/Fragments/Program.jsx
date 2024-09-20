import { Fragment, useState } from "react";
import Program from "../../utils/program.jsx";
import Card from "../Elements/Card.jsx";

const ProgramKerja = () => {
    const [currentCategory, setCurrentCategory] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 6;

    // Filter program berdasarkan kategori
    const filteredProgram = currentCategory === "All"
        ? Program
        : Program.filter((item) => item.name === currentCategory);

    // Menentukan data yang akan ditampilkan berdasarkan halaman aktif
    const paginatedProgram = filteredProgram.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const totalPages = Math.ceil(filteredProgram.length / itemsPerPage);

    const handleCategoryClick = (category) => {
        setCurrentCategory(category);
        setCurrentPage(1); // Reset halaman ke 1 ketika kategori berubah
    };

    const handlePageClick = (page) => {
        setCurrentPage(page);
    };

    return (
        <Fragment>
            <section className="flex flex-col gap-3">
                <h1 className="text-3xl font-bold mb-5 lg:text-6xl lg:mb-28 font-helvetica">Program Kegiatan</h1>
                <div className="flex gap-2 justify-center flex-wrap lg:mb-10">
                    <button onClick={() => handleCategoryClick("All")} className="border-2 border-black text-black px-3 py-1 rounded-lg font-swiss">All</button>
                    <button onClick={() => handleCategoryClick("Squad")} className="border-2 border-black text-black px-3 py-1 rounded-lg font-swiss">Squad</button>
                    <button onClick={() => handleCategoryClick("Coffee")} className="border-2 border-black text-black px-3 py-1 rounded-lg font-swiss">Coffee</button>
                    <button onClick={() => handleCategoryClick("Studio")} className="border-2 border-black text-black px-3 py-1 rounded-lg font-swiss">Studio</button>
                    <button onClick={() => handleCategoryClick("Academy")} className="border-2 border-black text-black px-3 py-1 rounded-lg font-swiss">Academy</button>
                    <button onClick={() => handleCategoryClick("Entertaiment")} className="border-2 border-black text-black px-3 py-1 rounded-lg font-swiss">Entertaiment</button>
                </div>

                <div className="md:grid md:grid-cols-2 lg:grid-cols-3 md:grid-rows-2 flex flex-col gap-y-3 md:gap-3 lg:gap-5">
                    {paginatedProgram.map((item) => (
                        <Card style={`w-full bg-black text-white shadow-2xl rounded-lg flex flex-col gap-3 p-3`} key={item.id} src={item.image} name={item.name} deskripsi={item.deskripsi} link={item.link} className={'flex flex-col gap-y-3'} bgImage={'bg-white'}>
                            <button className="bg-white rounded-lg justify-center text-black p-2 flex gap-3 font-swiss w-full">
                              Selengkapnya
                              <span>
                              <i className="fas fa-arrow-right"></i>
                              </span>
                          </button>
                        </Card>
                    ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-center items-center rounded-lg gap-x-3 p-3 lg:mt-10">
                    <button
                        onClick={() => handlePageClick(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="flex items-center gap-x-3 lg:p-3 rounded-md bg-gray-100 justify-center"
                    >
                        <i className="fas fa-arrow-left lg:text-2xl"></i>
                        <p className="lg:text-2xl font-swiss">Kembali</p>
                    </button>

                    <div className="flex gap-x-3">
                        {[...Array(totalPages)].map((_, index) => (
                            <button
                                key={index}
                                onClick={() => handlePageClick(index + 1)}
                                className={`lg:text-2xl font-swiss ${currentPage === index + 1 ? 'bg-black px-3 py-1 text-white rounded-md' : ''}`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={() => handlePageClick(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="flex items-center gap-x-3 lg:p-3 rounded-md bg-gray-100 justify-center"
                    >
                        <p className="lg:text-2xl font-swiss">Selanjutnya</p>
                        <i className="fas fa-arrow-right lg:text-2xl"></i>
                    </button>
                </div>
            </section>
            <div id="contact"></div>
        </Fragment>
    );
};

export default ProgramKerja;
