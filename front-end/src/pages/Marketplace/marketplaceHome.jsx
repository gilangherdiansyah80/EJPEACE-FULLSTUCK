import { Link } from "react-router-dom";
import AuthLayoutMarket from "../../component/Layouts/AuthlayoutMarket";
import { useState, useEffect, useRef } from "react";

const MarketplaceHome = () => {
  const [dataProducts, setDataProducts] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("All");
  const [isCategoryActive, setIsCategoryActive] = useState("All");

  const categoryRef = useRef(null); // 👉 Referensi untuk kategori

  const filteredProducts =
    currentCategory === "All"
      ? dataProducts
      : dataProducts.filter((item) => item.category === currentCategory);

  const handleCategoryClick = (category) => {
    setCurrentCategory(category);
    setIsCategoryActive(category);
  };

  const fetchDataProducts = async () => {
    const response = await fetch("http://localhost:3000/api/product");
    const data = await response.json();
    setDataProducts(data.payload.datas);
  };

  const scrollRight = () => {
    categoryRef.current.scrollBy({
      left: 200, // Jumlah piksel geser
      behavior: "smooth",
    });
  };

  const scrollLeft = () => {
    categoryRef.current.scrollBy({
      left: -200,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    fetchDataProducts();
  }, []);

  return (
    <AuthLayoutMarket>
      <main className="p-3 flex flex-col gap-y-6">
        <section className="flex gap-x-2 items-center mt-10 lg:mt-10">
          <h1 className="font-bold text-xl md:text-3xl">Rekomended Products</h1>
          <div className="w-32 h-1 rounded-full bg-gradient-to-r from-[#f6df3c] to-[#74690f]"></div>
        </section>

        {/* 👉 Tombol geser kiri dan kanan */}
        <div className="flex items-center gap-2">
          <button
            onClick={scrollLeft}
            className="bg-ejp text-white p-2 rounded-full lg:hidden"
          >
            <i className="fas fa-chevron-left"></i>
          </button>

          <section
            ref={categoryRef}
            className="flex gap-x-3 overflow-x-auto w-full scrollbar-hide"
          >
            {[
              "All",
              "eJPeace Group",
              "Coco GirlGroup",
              "Music Production Services",
              "Social Media Marketing Agency",
            ].map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`whitespace-nowrap bg-yellowejp p-3 rounded-xl border-4 border-ejp ${
                  isCategoryActive === category ? "bg-ejp text-white" : ""
                }`}
              >
                <h1>{category}</h1>
              </button>
            ))}
          </section>

          <button
            onClick={scrollRight}
            className="bg-ejp text-white p-2 rounded-full lg:hidden"
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProducts.map((product) => (
            <div
              className="bg-yellowejp p-3 rounded-xl flex flex-col gap-y-2"
              key={product.product_id}
            >
              <div className="bg-ejp rounded-xl flex justify-center items-center h-52">
                <img
                  src="/images/EJP-Creative.png"
                  alt={product.title}
                  className="w-52"
                />
              </div>
              <div className="flex flex-col gap-y-1">
                <h2 className="font-bold text-xl">{product.title}</h2>
                <p className="text-sm text-gray-600">
                  {product.price.includes("-")
                    ? product.price
                        .split("-")
                        .map((price) =>
                          Number(price.trim()).toLocaleString("id-ID", {
                            style: "currency",
                            currency: "IDR",
                          })
                        )
                        .join(" - ")
                    : Number(product.price).toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })}
                </p>
              </div>
              <Link
                to={`/Marketplace/DetailProduct/${product.product_id}`}
                className="w-full"
              >
                <button className="bg-ejp text-white rounded-lg p-2 w-full">
                  Order Now
                </button>
              </Link>
            </div>
          ))}
        </section>
      </main>
    </AuthLayoutMarket>
  );
};

export default MarketplaceHome;
