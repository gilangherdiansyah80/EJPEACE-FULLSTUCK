import { Fragment, useState } from "react";
import Program from "../../utils/program.jsx";
import Card from "../Elements/Card.jsx";
import { Link } from "react-router-dom";

const ProgramKerja = () => {
  const [currentCategory, setCurrentCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [isCategoryActive, setIsCategoryActive] = useState("All");

  const itemsPerPage = 6;

  // Filter program berdasarkan kategori
  const filteredProgram =
    currentCategory === "All"
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
    setIsCategoryActive(category);
    setCurrentPage(1); // Reset halaman ke 1 ketika kategori berubah
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <Fragment>
      <section className="flex flex-col gap-3">
        <h1 className="text-3xl font-bold mb-5 lg:text-4xl  font-helvetica">
          Category Products
        </h1>
        {/* <div className="flex gap-2 justify-center flex-wrap lg:mb-10">
          <button
            onClick={() => handleCategoryClick("All")}
            className={`border-2 border-black text-black px-3 py-1 lg:py-2 rounded-lg font-swiss cursor-pointer ${
              isCategoryActive === "All" ? "bg-yellowejp text-ejp" : ""
            }`}
          >
            All
          </button>
          <button
            onClick={() => handleCategoryClick("Squad")}
            className={`border-2 border-black text-black px-3 py-1 lg:py-2 rounded-lg font-swiss cursor-pointer ${
              isCategoryActive === "Squad" ? "bg-yellowejp text-ejp" : ""
            }`}
          >
            Squad
          </button>
          <button
            onClick={() => handleCategoryClick("Coffee")}
            className={`border-2 border-black text-black px-3 py-1 lg:py-2 rounded-lg font-swiss cursor-pointer ${
              isCategoryActive === "Coffee" ? "bg-yellowejp text-ejp" : ""
            }`}
          >
            Coffee
          </button>
          <button
            onClick={() => handleCategoryClick("Studio")}
            className={`border-2 border-black text-black px-3 py-1 lg:py-2 rounded-lg font-swiss cursor-pointer ${
              isCategoryActive === "Studio" ? "bg-yellowejp text-ejp" : ""
            }`}
          >
            Studio
          </button>
          <button
            onClick={() => handleCategoryClick("Academy")}
            className={`border-2 border-black text-black px-3 py-1 lg:py-2 rounded-lg font-swiss cursor-pointer ${
              isCategoryActive === "Academy" ? "bg-yellowejp text-ejp" : ""
            }`}
          >
            Academy
          </button>
          <button
            onClick={() => handleCategoryClick("Entertaiment")}
            className={`border-2 border-black text-black px-3 py-1 lg:py-2 rounded-lg font-swiss cursor-pointer ${
              isCategoryActive === "Entertaiment" ? "bg-yellowejp text-ejp" : ""
            }`}
          >
            Entertaiment
          </button>
        </div> */}

        <div className="md:grid md:grid-cols-2 lg:grid-cols-4 flex flex-col gap-y-3 md:gap-3 lg:gap-5">
          {paginatedProgram.map((item) => (
            <Card
              style={`w-full bg-black text-white shadow-2xl rounded-lg flex flex-col gap-3 p-3`}
              key={item.id}
              src={item.image}
              name={item.name}
              deskripsi={item.deskripsi}
              link={item.link}
              className={"flex flex-col gap-y-3 self-start"}
              bgImage={"bg-white"}
            >
              <Link
                to={item.link}
                className="bg-white rounded-lg justify-center text-black p-2 flex gap-3 font-swiss w-full"
              >
                Selengkapnya
                <span>
                  <i className="fas fa-arrow-right"></i>
                </span>
              </Link>
            </Card>
          ))}
        </div>
      </section>
      <div id="contact"></div>
    </Fragment>
  );
};

export default ProgramKerja;
