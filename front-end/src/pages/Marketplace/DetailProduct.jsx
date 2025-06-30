import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import AuthLayoutMarket from "../../component/Layouts/AuthlayoutMarket";

const DetailProduct = () => {
  const { id } = useParams();
  const [detailProduct, setDetailProduct] = useState([]);
  const [userRole, setUserRole] = useState("");
  const [userId, setUserId] = useState();
  const [showNotification, setShowNotification] = useState(false);
  const [dataForm, setDataForm] = useState({
    information: "",
  });

  const handleChange = (e) => {
    setDataForm({
      ...dataForm,
      [e.target.name]: e.target.value,
    });
  };

  const fetchDetailProduct = async () => {
    const response = await fetch(`http://localhost:3000/api/productId/${id}`);
    const data = await response.json();
    setDetailProduct(data.payload.datas);
  };

  useEffect(() => {
    fetchDetailProduct();
  }, [id]);

  useEffect(() => {
    const userData = localStorage.getItem("users");
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUserRole(parsedUser.role || "");
        setUserId(parsedUser.user_id || "");
      } catch (error) {
        console.error("Invalid user data in localStorage:", error);
      }
    }
  }, []);

  const mappingProduct = detailProduct.map((item) =>
    item.price.includes("-")
      ? Number(item.price.split("-")[0])
      : Number(item.price)
  )[0];

  const handleAddToCart = async (product) => {
    if (!userId) {
      alert("Please log in first.");
      return;
    }

    const cartData = {
      user_id: userId, // ID pengguna yang login
      product_id: product, // ID produk yang dipilih
      information: dataForm.information || null, // Informasi tambahan dari form
      finally_price: JSON.parse(mappingProduct),
    };

    console.log("Data to be sent to the server:", cartData); // Debugging: cek data yang dikirim

    try {
      const response = await fetch("http://localhost:3000/api/carts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cartData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Gagal menambahkan ke keranjang");
      }

      const data = await response.json();
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
        window.location.reload();
      }, 3000);
    } catch (error) {
      console.error("Error saat menambahkan ke keranjang:", error);
      alert(`Gagal menambahkan ke keranjang: ${error.message}`);
    }
  };

  return (
    <>
      <main className="overflow-x-auto pb-32 lg:hidden">
        <header className="bg-gradient-to-r from-[#f6df3c] to-[#74690f] p-3 flex gap-x-3 items-center">
          <Link to={"/Marketplace/MarketplaceHome"}>
            <i className="fas fa-arrow-left text-xl"></i>
          </Link>
          <p className="font-bold text-2xl">Detail Product</p>
        </header>
        {detailProduct.map((product) => (
          <section key={product.id}>
            <article className="p-3">
              <div className="bg-gradient-to-r from-[#f6df3c] to-[#74690f] p-3 rounded-xl flex flex-col gap-y-3">
                <div className="bg-black rounded-lg">
                  <img
                    src="/images/EJP-Creative.png"
                    alt="PT EJPeace Karya Indonesia"
                  />
                </div>
                <h1 className="font-semibold text-2xl text-ejp">
                  {product.title}
                </h1>
                <hr />
                <h2>Description:</h2>
                <p>{product.description}</p>

                {product.price.includes("-") && (
                  <input
                    type="text"
                    onChange={handleChange}
                    value={dataForm.information}
                    name="information"
                    placeholder="Masukan informasi tambahan"
                    className="border-2 border-gray-300 rounded-md p-2 w-full"
                  />
                )}
              </div>
            </article>

            <section className="bg-gradient-to-r from-[#f6df3c] to-[#74690f] p-3 fixed bottom-0 w-full flex justify-between items-center">
              <p className="font-semiboldtext-gray-600">
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
              {userRole === "User" ? (
                <button
                  className="bg-black text-white p-3 rounded-lg"
                  onClick={() => handleAddToCart(product.product_id)}
                >
                  Add to Cart
                </button>
              ) : (
                <Link to={`/loginsection`}>
                  <button>
                    <h1 className="bg-ejp p-2 rounded-xl text-white">
                      Add to Cart
                    </h1>
                  </button>
                </Link>
              )}
            </section>
          </section>
        ))}
      </main>

      <AuthLayoutMarket>
        <main className="hidden lg:block mt-20">
          {detailProduct.map((product) => (
            <>
              <div
                key={product.product_id}
                className="bg-gradient-to-r from-[#f6df3c] to-[#74690f] rounded-xl flex flex-col gap-y-3"
              >
                <section className="p-3 flex flex-col gap-y-3">
                  <div className="bg-black rounded-lg flex justify-center">
                    <img
                      src="/images/EJP-Creative.png"
                      alt="PT EJPeace Karya Indonesia"
                      className="w-52"
                    />
                  </div>
                  <h1 className="font-semibold text-2xl text-ejp">
                    {product.title}
                  </h1>
                  <hr />
                  <h2>Description:</h2>
                  <p>{product.description}</p>
                  {product.price.includes("-") && (
                    <input
                      type="text"
                      onChange={handleChange}
                      value={dataForm.information}
                      name="information"
                      placeholder="Masukan informasi tambahan"
                      className="border-2 border-gray-300 rounded-md p-2 w-full"
                    />
                  )}
                </section>

                <section className="bg-ejp p-3 w-full flex justify-between items-center rounded-t-2xl">
                  <p className="font-semibold text-yellowejp">
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
                  {userRole === "User" ? (
                    <button
                      className="bg-yellowejp text-ejp p-3 rounded-lg"
                      onClick={() => handleAddToCart(product.product_id)}
                    >
                      Add to Cart
                    </button>
                  ) : (
                    <Link to={`/loginsection`}>
                      <button>
                        <h1 className="bg-yellowejp p-2 rounded-xl text-ejp">
                          Add to Cart
                        </h1>
                      </button>
                    </Link>
                  )}
                </section>
              </div>

              {showNotification && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50 p-5">
                  <main className="bg-yellowejp md:w-1/2 lg:w-1/3 p-5 rounded-lg shadow-lg text-center w-full flex flex-col gap-y-5 justify-center items-center">
                    <section className="flex items-center justify-center w-24 h-24 rounded-full bg-green-500">
                      <i className="fa-solid fa-check text-4xl font-bold text-white"></i>
                    </section>
                    <h1 className="text-2xl font-semibold">
                      Berhasil menambahkan {product.title} ke keranjang
                    </h1>
                  </main>
                </div>
              )}
            </>
          ))}
        </main>
      </AuthLayoutMarket>
    </>
  );
};

export default DetailProduct;
