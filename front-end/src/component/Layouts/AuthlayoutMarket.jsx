import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import RefundPopup from "../Elements/RefundPopup";
import TermPopup from "../Elements/TermPopup";

const AuthLayoutMarket = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenSearch, setIsOpenSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [notFound, setNotFound] = useState("");
  const [openCart, setOpenCart] = useState(false);
  const [dataCart, setDataCart] = useState([]);
  const [openResultSearch, setOpenResultSearch] = useState(false);
  const [user, setUser] = useState(null);
  const [isUser, setIsUser] = useState(false);
  const [activeMenu, setActiveMenu] = useState("home");
  const [userId, setUserId] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [cartCheckout, setCartCheckout] = useState([]);
  const [showSelect, setShowSelect] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showRefund, setShowRefund] = useState(false);

  const handleShowSelect = () => {
    setShowSelect(!showSelect);
  };

  // Handle quantity change per item
  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return;

    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  useEffect(() => {
    if (query.trim() === "") {
      setSearchResults([]);
      setOpenResultSearch(false);
      return;
    }

    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://ejpeaceentertainment.com/api/search?query=${query}`
        );
        const data = await response.json();

        if (response.ok) {
          setSearchResults(data.payload.datas);
          setOpenResultSearch(true);
        } else {
          setNotFound("Data not found");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Debounce pencarian untuk mengurangi request API
    const timeoutId = setTimeout(fetchData, 300);
    return () => clearTimeout(timeoutId);
  }, [query]);

  const handleSearch = async () => {
    if (!query.trim()) {
      alert("Please enter a search term.");
      return;
    }

    try {
      const res = await fetch(
        `https://ejpeaceentertainment.com/api/product/${query}`
      );
      if (!res.ok) {
        throw new Error("Failed to fetch data.");
      }

      const data = await res.json();
      setSearchResults(data.payload.datas || []); // Pastikan data selalu dalam format yang diharapkan
    } catch (error) {
      console.error("Error fetching search results:", error);
      setSearchResults([]);
    }
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleToggleSearch = () => {
    setIsOpenSearch(!isOpenSearch);
  };

  const handleToggleCart = () => {
    setOpenCart(!openCart);
  };

  const handleRemoveCart = (id) => {
    try {
      fetch(`https://ejpeaceentertainment.com/api/carts/${id}`, {
        method: "DELETE",
      });
      fetchDataCart();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getData = async (id) => {
    try {
      const response = await fetch(
        `https://ejpeaceentertainment.com/api/cartId/${id}`
      );
      const data = await response.json();
      setCartCheckout(data.payload.datas);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData(selectedProducts);
  }, [selectedProducts]);

  const calculateTotal = (selectedIds = []) => {
    const filteredCart =
      selectedIds.length > 0
        ? cart.filter((item) => selectedIds.includes(item.cart_id)) // Sesuaikan dengan item._id jika perlu
        : cart;

    return filteredCart.reduce(
      (acc, item) => acc + Number(item.finally_price || 0),
      0
    );
  };

  const checkLoginStatus = () => {
    const storedUser = JSON.parse(localStorage.getItem("users"));
    if (storedUser) {
      setUser(storedUser);
      setIsUser(true);
      setUserId(storedUser.user_id);
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const handleLogout = () => {
    // Remove user data from localStorage
    localStorage.removeItem("users");

    // Reset user state
    setUser(null);
    setIsUser(false);
    alert("Logout successful!");

    // Optionally, redirect to login page or home page
    window.location.to = "/";
    window.location.reload();
  };

  const handleClickMenu = (menu) => {
    setActiveMenu(menu);
  };

  const resetSearch = () => {
    setSearchResults([]);
    setOpenResultSearch(false);
    setQuery("");
  };

  const fetchDataCart = async () => {
    try {
      const response = await fetch(
        "https://ejpeaceentertainment.com/api/carts"
      );
      const data = await response.json();
      setDataCart(data.payload.datas);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchDataCart();
  }, []);

  const cart = dataCart.filter((item) => item.user_id === userId);

  const handleSelectProduct = (id) => {
    setSelectedProducts((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((selectedId) => selectedId !== id)
        : [...prevSelected, id]
    );
  };

  const handleCheckout = async () => {
    try {
      const response = await fetch(
        "https://ejpeaceentertainment.com/api/create-invoice",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            external_id: "Order " + Math.random().toString(36).slice(2, 7),
            amount: calculateTotal(selectedProducts),
            description: `Order barang ${cartCheckout
              .map((item) => item.title)
              .join(", ")}`,
            invoice_duration: 86400,
            customer: {
              given_names: `${cartCheckout
                .map((item) => item.name)
                .join(", ")}`,
              email: `${cartCheckout.map((item) => item.email).join(", ")}`,
              mobile_number: `${cartCheckout
                .map((item) => item.telepon)
                .join(", ")}`,
            },
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Gagal membuat invoice");
      }

      const invoiceData = await response.json();
      console.log("Invoice berhasil dibuat:", invoiceData);
      // console.log(invoiceData.data.invoice_url);
      window.location.href = invoiceData.data.invoice_url;

      // Jika ingin redirect ke invoice_url misalnya:
      // window.location.href = invoiceData.invoice_url;
    } catch (error) {
      console.error("Error saat membuat invoice:", error.message);
    }
  };

  const linkDetail = cartCheckout.map((item) => item.product_id);

  return (
    <section className="bg-white text-black w-full flex flex-col gap-y-10">
      <header className="bg-gradient-to-r from-[#f6df3c] to-[#74690f] fixed top-0 w-full lg:flex lg:justify-center z-10 p-5">
        {/* Navbar for Mobile */}
        <section className="block md:hidden">
          <section className="flex justify-between items-center">
            <section className="flex items-center gap-x-5 md:hidden">
              {isOpen ? (
                <i
                  className="fas fa-times text-2xl cursor-pointer text-white"
                  onClick={handleToggle}
                ></i>
              ) : (
                <i
                  className="fas fa-bars text-2xl cursor-pointer text-white"
                  onClick={handleToggle}
                ></i>
              )}
              <Link to="/Marketplace/MarketplaceHome">
                <img
                  src="/images/logo2.png"
                  alt="PT EJPeace Karya Indonesia"
                  className="w-40 absolute -mt-20"
                />
              </Link>
            </section>

            <section className="flex gap-x-5">
              <i
                className="fas fa-search text-2xl cursor-pointer text-white"
                onClick={handleToggleSearch}
              ></i>
              {!isUser ? (
                <Link to="/loginsection">
                  <i className="fas fa-user text-2xl cursor-pointer text-white"></i>
                </Link>
              ) : (
                <i
                  className="fas fa-outdent text-2xl cursor-pointer text-red-600"
                  onClick={handleLogout}
                ></i>
              )}
              <button onClick={handleToggleCart}>
                <i className="fas fa-cart-shopping text-2xl cursor-pointer text-white"></i>
              </button>
            </section>
          </section>
          {isOpenSearch && (
            <div className="p-3 w-full text-white flex flex-col gap-y-5 justify-center items-center">
              <section className="flex w-full">
                <div className="relative w-full">
                  <input
                    type="text"
                    placeholder="Search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full p-4 rounded-l-md text-black"
                  />
                  {query.length > 0 && (
                    <i
                      className="fas fa-times text-2xl cursor-pointer text-black absolute right-3 top-3"
                      onClick={resetSearch}
                    ></i>
                  )}
                </div>
                <button
                  className="bg-yellowejp rounded-r-md p-3"
                  onClick={handleSearch}
                >
                  <i className="fas fa-search text-2xl cursor-pointer text-white"></i>
                </button>
              </section>

              <section className="w-full">
                {searchResults == "" ? (
                  <p className="text-center">{notFound}</p>
                ) : (
                  <ul className="flex flex-col gap-y-3 h-[650px] overflow-y-scroll">
                    <h2>PRODUCTS</h2>
                    <hr className="border border-gray-300 w-full" />
                    {searchResults.map((item) => (
                      <Link
                        to={`/Marketplace/DetailProduct/${item.product_id}`}
                      >
                        <li
                          key={item.product_id}
                          className="flex gap-x-5 bg-ejp p-3 rounded-lg items-center"
                        >
                          <div className="bg-white rounded-lg">
                            <img
                              src="/images/logo2.png"
                              alt={item.title}
                              className="w-20 rounded-xl"
                            />
                          </div>
                          <article className="flex flex-col gap-y-2">
                            <p>{item.title}</p>
                            <p className="text-sm text-white">
                              {item.price.includes("-")
                                ? item.price
                                    .split("-")
                                    .map((price) =>
                                      Number(price.trim()).toLocaleString(
                                        "id-ID",
                                        {
                                          style: "currency",
                                          currency: "IDR",
                                        }
                                      )
                                    )
                                    .join(" - ")
                                : Number(item.price).toLocaleString("id-ID", {
                                    style: "currency",
                                    currency: "IDR",
                                  })}
                            </p>
                          </article>
                        </li>
                      </Link>
                    ))}
                  </ul>
                )}
              </section>
            </div>
          )}
          {isOpen && (
            <nav className="w-full text-white md:hidden">
              <ul className="flex flex-col gap-y-5 mt-5">
                <li
                  onClick={() => handleClickMenu("home")}
                  className={`${
                    activeMenu === "home" ? "text-ejp" : "hover:text-ejp"
                  }`}
                >
                  <Link
                    to="/Marketplace/MarketplaceHome"
                    onClick={handleToggle}
                  >
                    Home
                    <div
                      className={`${
                        activeMenu === "home"
                          ? "bg-ejp w-11 h-1 rounded-full"
                          : ""
                      }`}
                    ></div>
                  </Link>
                </li>
                <li
                  onClick={() => handleClickMenu("allproducts")}
                  className={`${
                    activeMenu === "allproducts" ? "text-ejp" : "hover:text-ejp"
                  }`}
                >
                  <Link to="/Marketplace/AllProducts" onClick={handleToggle}>
                    All Product
                    <div
                      className={`${
                        activeMenu === "allproducts"
                          ? "bg-ejp w-20 h-1 rounded-full"
                          : ""
                      }`}
                    ></div>
                  </Link>
                </li>
                <li
                  onClick={() => handleClickMenu("back")}
                  className={`${
                    activeMenu === "back" ? "text-ejp" : "hover:text-ejp"
                  }`}
                >
                  <Link to="/" onClick={handleToggle}>
                    Back to Main Page
                  </Link>
                </li>
              </ul>
            </nav>
          )}
        </section>
        {/* Navbar for Tablet */}

        {/* Navbar for Desktop */}
        <section className="hidden lg:block w-3/5">
          <section className="flex flex-col gap-y-3 p-5">
            <section className="flex items-center  gap-x-10">
              <section className="hidden lg:block">
                <Link
                  to="/Marketplace/MarketplaceHome"
                  className="absolute -mt-24 -ml-7"
                >
                  <img
                    src="/images/logo2.png"
                    alt="PT.Ejpeace Karya Indonesia"
                    className="w-52"
                  />
                </Link>
              </section>

              <div className="text-white flex flex-col justify-center w-full items-center ml-36">
                <section className="flex w-full">
                  <div className="relative w-full">
                    <input
                      type="text"
                      placeholder="Search"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      className="w-full p-4 rounded-l-md text-black"
                    />
                    {query.length > 0 && (
                      <i
                        className="fas fa-times text-2xl cursor-pointer text-black absolute right-3 top-3"
                        onClick={resetSearch}
                      ></i>
                    )}
                  </div>
                  <button
                    className="bg-yellowejp rounded-r-md p-3"
                    onClick={handleSearch}
                  >
                    <i className="fas fa-search text-2xl cursor-pointer text-white"></i>
                  </button>
                </section>
                {openResultSearch && (
                  <section className="w-[635px] -ml-12 mt-[500px] rounded-xl bg-white text-black p-3 fixed shadow-lg">
                    {searchResults === "" ? (
                      <p className="text-center">{notFound}</p>
                    ) : (
                      <ul className="flex flex-col gap-y-3 overflow-y-scroll max-h-[400px]">
                        <h2 className="font-semibold text-lg mb-2">PRODUCTS</h2>
                        <hr className="border border-gray-300 w-full" />
                        {searchResults.map((item) => (
                          <Link
                            key={item.product_id}
                            to={`/Marketplace/DetailProduct/${item.product_id}`}
                          >
                            <li className="flex gap-x-5 items-center border p-2 rounded-md hover:bg-gray-100 transition">
                              <div className="w-20 h-25 flex justify-center items-center overflow-hidden rounded-md bg-ejp">
                                <img
                                  src="/images/logo2.png"
                                  alt={item.title}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <article className="flex flex-col gap-y-1">
                                <p className="font-medium text-sm text-gray-800">
                                  {item.title}
                                </p>
                                <p className="text-sm text-ejp">
                                  {item.price.includes("-")
                                    ? item.price
                                        .split("-")
                                        .map((price) =>
                                          Number(price.trim()).toLocaleString(
                                            "id-ID",
                                            {
                                              style: "currency",
                                              currency: "IDR",
                                            }
                                          )
                                        )
                                        .join(" - ")
                                    : Number(item.price).toLocaleString(
                                        "id-ID",
                                        {
                                          style: "currency",
                                          currency: "IDR",
                                        }
                                      )}
                                </p>
                              </article>
                            </li>
                          </Link>
                        ))}
                      </ul>
                    )}
                  </section>
                )}
              </div>

              <section className="">
                <section className="flex gap-x-10 items-center">
                  {!isUser ? (
                    <Link to="/loginsection">
                      <h1 className="text-lg text-white font-semibold">
                        Login
                      </h1>
                    </Link>
                  ) : (
                    <button
                      onClick={handleLogout}
                      className="bg-red-700 p-3 rounded-lg text-white"
                    >
                      Logout
                    </button>
                  )}

                  <hr className="border border-gray-300 h-8" />
                  <hr className="border border-gray-300 h-8" />

                  <button
                    onClick={handleToggleCart}
                    className="flex gap-x-5 items-center"
                  >
                    <i className="fas fa-cart-shopping text-2xl cursor-pointer text-white"></i>
                    <p className="text-white text-lg">Cart</p>
                  </button>
                </section>

                {openCart && (
                  <section className="p-5 flex flex-col gap-y-5 bg-white w-[720px] absolute mt-8 -ml-52 h-96">
                    {cart.length === 0 ? (
                      // Keranjang kosong
                      <section className="flex flex-col justify-center items-center">
                        <section className="flex flex-col justify-center items-center gap-y-3">
                          <i className="fas fa-cart-shopping text-5xl cursor-pointer text-yellowejp"></i>
                          <h1 className="text-center text-ejp">
                            Your cart is empty
                          </h1>
                        </section>

                        {/* Tombol Shop Our Products */}
                        <section className="flex flex-col gap-y-5 p-3">
                          <Link
                            to="/Marketplace/AllProducts"
                            className="bg-yellowejp text-black p-3 rounded-lg w-72 flex justify-center"
                          >
                            Shop Our Products
                          </Link>
                        </section>
                      </section>
                    ) : (
                      // Keranjang berisi produk
                      <section className="flex flex-col gap-y-5 h-[250px] overflow-y-auto pr-5">
                        <article className="flex justify-between items-center">
                          <div>
                            <h1 className="text-2xl font-bold">My Cart</h1>
                            <p className="text-sm text-gray-600">
                              {cart.length} items
                            </p>
                          </div>
                          <span
                            onClick={handleShowSelect}
                            className="cursor-pointer bg-yellowejp text-black p-3 rounded-lg"
                          >
                            Choose Product
                          </span>
                        </article>
                        <hr className="border border-gray-300" />
                        {cart.map((product) => (
                          <div
                            key={product.cart_id}
                            className="flex items-center gap-x-5 pb-4"
                          >
                            {showSelect && (
                              <input
                                type="checkbox"
                                checked={selectedProducts.includes(
                                  product.cart_id
                                )}
                                onChange={() =>
                                  handleSelectProduct(product.cart_id)
                                }
                                className="w-6 h-6"
                              />
                            )}

                            {/* Gambar produk */}
                            <div className="bg-ejp rounded-lg">
                              <img
                                src="/images/logo2.png"
                                alt={product.title}
                                className="w-24 h-24 rounded-lg object-cover"
                              />
                            </div>

                            {/* Detail produk */}
                            <section className="flex flex-1 flex-col gap-y-2">
                              <p className="text-gray-600 text-sm">
                                {product.category}
                              </p>
                              <h2 className="text-yellowejp font-bold text-2xl">
                                {product.title}
                              </h2>
                              <p className="text-gray-600">
                                <p className="text-gray-600">
                                  {product.finally_price !== null
                                    ? product.finally_price.toLocaleString(
                                        "id-ID",
                                        {
                                          style: "currency",
                                          currency: "IDR",
                                        }
                                      )
                                    : Number(product.price).toLocaleString(
                                        "id-ID",
                                        {
                                          style: "currency",
                                          currency: "IDR",
                                        }
                                      )}
                                </p>
                              </p>
                            </section>

                            {/* Tombol pengaturan jumlah dan hapus */}
                            <button
                              className="bg-yellowejp text-ejp p-3 rounded-md"
                              onClick={() => handleRemoveCart(product.cart_id)}
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      </section>
                    )}
                    {/* Bagian total harga dan aksi */}
                    <section
                      className={`mt-5 ${cart.length === 0 ? "hidden" : ""}`}
                    >
                      <hr className="border border-gray-300" />
                      <section className="flex justify-between mt-3">
                        <p className="text-gray-600 font-medium">Total</p>
                        <p className="text-yellowejp">
                          {Number(
                            calculateTotal(selectedProducts)
                          ).toLocaleString("id-ID", {
                            style: "currency",
                            currency: "IDR",
                          })}
                        </p>
                      </section>

                      {/* Tombol View Cart dan Checkout */}
                      <section className="flex justify-between mt-5 gap-x-3">
                        <Link
                          className="bg-yellowejp text-ejp p-3 rounded-lg w-1/2 text-center"
                          to={`/Marketplace/DetailProduct/${linkDetail}`}
                        >
                          <button>View Cart</button>
                        </Link>
                        <button
                          className="bg-yellowejp text-ejp p-3 rounded-lg w-1/2"
                          onClick={handleCheckout}
                        >
                          Checkout
                        </button>
                      </section>
                    </section>
                  </section>
                )}
              </section>
            </section>
            <nav className="w-full text-white">
              <ul className="flex gap-x-5">
                <li
                  onClick={() => handleClickMenu("home")}
                  className={`${
                    activeMenu === "home" ? "text-ejp" : "hover:text-ejp"
                  }`}
                >
                  <Link
                    to="/Marketplace/MarketplaceHome"
                    onClick={handleToggle}
                  >
                    Home
                    <div
                      className={`${
                        activeMenu === "home"
                          ? "bg-ejp w-11 h-1 rounded-full"
                          : ""
                      }`}
                    ></div>
                  </Link>
                </li>
                <li
                  onClick={() => handleClickMenu("allproduct")}
                  className={`${
                    activeMenu === "allproduct" ? "text-ejp" : "hover:text-ejp"
                  } relative`}
                >
                  <Link to="/Marketplace/AllProducts">
                    All Product
                    <div
                      className={`${
                        activeMenu === "allproduct"
                          ? "bg-ejp w-20 h-1 rounded-full"
                          : ""
                      }`}
                    ></div>
                  </Link>
                </li>
                <li
                  onClick={() => handleClickMenu("back")}
                  className={`${
                    activeMenu === "back" ? "text-ejp" : "hover:text-ejp"
                  }`}
                >
                  <Link to="/">Back to Main Page</Link>
                </li>
              </ul>
            </nav>
          </section>
        </section>
      </header>

      {openCart && (
        <section className="p-5 flex flex-col gap-y-5 bg-white w-full fixed mt-16 lg:hidden z-50 h-screen">
          {cart.length === 0 ? (
            <section className="flex flex-col justify-center items-center">
              <section className="flex flex-col justify-center items-center gap-y-3 mt-10">
                <i className="fas fa-cart-shopping text-5xl cursor-pointer text-ejp"></i>
                <h1 className="text-center text-ejp">Your cart is empty</h1>
              </section>

              <section className="fixed bottom-0 right-0 w-full flex flex-col gap-y-5 p-3">
                <Link
                  to="/Marketplace/MarketplaceHome"
                  className="bg-ejp text-white p-3 rounded-lg w-full flex justify-center"
                >
                  Shop Our Products
                </Link>
              </section>
            </section>
          ) : (
            <main className="flex flex-col gap-y-3">
              <article className="flex justify-between items-center">
                <div>
                  <h1 className="text-2xl font-bold">My Cart</h1>
                  <p className="text-sm text-gray-600">{cart.length} items</p>
                </div>
                <span
                  onClick={handleShowSelect}
                  className="cursor-pointer bg-yellowejp text-black p-3 rounded-lg"
                >
                  Choose Product
                </span>
              </article>
              <hr className="border border-gray-300" />
              {cart.map((product) => (
                <div
                  key={product.cart_id}
                  className="flex gap-x-5 w-full items-center"
                >
                  {showSelect && (
                    <input
                      type="checkbox"
                      checked={selectedProducts.includes(product.product_id)}
                      onChange={() => handleSelectProduct(product.product_id)}
                      className="w-6 h-6"
                    />
                  )}
                  <div className="bg-ejp rounded-lg flex items-center">
                    <img
                      src="/images/logo2.png"
                      alt={product.title}
                      className="w-28 h-28 rounded-xl"
                    />
                  </div>
                  <section className="flex flex-col gap-y-1">
                    <p className="text-gray-600">{product.category}</p>
                    <h2 className="text-yellowejp font-bold text-2xl">
                      {product.title}
                    </h2>
                    <p className="text-gray-600">
                      {product.finally_price !== null
                        ? product.finally_price
                        : Number(product.price).toLocaleString("id-ID", {
                            style: "currency",
                            currency: "IDR",
                          })}
                    </p>
                    <p>Keterangan: {product.information}</p>
                    <section className="flex gap-x-5">
                      {/* <div>
                        <button
                          className="border border-gray-300 px-3 py-1"
                          onClick={() =>
                            handleQuantityChange(
                              product.id,
                              product.quantity - 1
                            )
                          }
                        >
                          -
                        </button>
                        <button className="border border-gray-300 px-3 py-1">
                          {product.quantity}
                        </button>
                        <button
                          className="border border-gray-300 px-3 py-1"
                          onClick={() =>
                            handleQuantityChange(
                              product.id,
                              product.quantity + 1
                            )
                          }
                        >
                          +
                        </button>
                      </div> */}
                      <button
                        className="bg-yellowejp text-white p-3 rounded-lg"
                        onClick={() => handleRemoveCart(product.cart_id)}
                      >
                        <p className="text-ejp">Remove</p>
                      </button>
                    </section>
                  </section>
                </div>
              ))}
              <section className="fixed bottom-0 right-0 w-full flex flex-col gap-y-5 p-3">
                <hr className="border border-gray-300 w-full" />
                <section className="flex justify-between">
                  <p className="text-gray-600">Total</p>
                  <p className="text-yellowejp">
                    {calculateTotal().toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })}
                  </p>
                </section>
                <section className="flex justify-center gap-x-5 w-full">
                  <Link
                    to={`/Marketplace/DetailProduct/${selectedProducts}`}
                    className="bg-yellowejp text-ejp p-3 rounded-lg w-1/2 text-center"
                  >
                    <button>View Cart</button>
                  </Link>
                  <button className="bg-yellowejp text-ejp p-3 rounded-lg w-1/2">
                    Checkout
                  </button>
                </section>
              </section>
            </main>
          )}
        </section>
      )}

      <main className="mt-14 lg:w-3/5 lg:self-center lg:mt-44">
        {children}
        <Link
          to="http://Wa.me/6289635773270"
          className="bg-green-500 w-16 h-16 rounded-full flex justify-center items-center fixed right-5 bottom-5 z-30"
        >
          <i className="fa-brands fa-whatsapp text-4xl text-white"></i>
        </Link>
      </main>

      <footer
        className={`bg-gradient-to-r from-[#f6df3c] to-[#74690f] text-white flex flex-col p-3 gap-y-3 lg:gap-y-10 justify-between items-center w-full`}
      >
        <h1 className="text-2xl lg:text-4xl font-semibold text-white font-helvetica">
          Sosial Media
        </h1>
        <div className="flex gap-3 lg:gap-x-10">
          <Link to="https://www.facebook.com/profile.php?id=61556646910015">
            <img
              src="/images/facebook.png"
              className="w-12 md:w-14 h-12 md:h-14 grayscale hover:grayscale-0"
              alt="Facebook"
            />
          </Link>
          <Link to="https://www.tiktok.com/@ejpeace.ent?is_from_webapp=1&sender_device=pc">
            <img
              src="/images/tiktok.png"
              className="w-12 md:w-14 h-12 md:h-14 grayscale hover:grayscale-0"
              alt="Tiktok"
            />
          </Link>
          <Link to="https://www.instagram.com/ejpeace.entertainment/">
            <img
              src="/images/instagram.png"
              className="w-12 md:w-14 h-12 md:h-14 grayscale hover:grayscale-0"
              alt="Instagram"
            />
          </Link>
          <Link to="https://www.youtube.com/@ejpeace">
            <img
              src="/images/youtube.png"
              className="w-12 md:w-14 h-12 md:h-14 grayscale hover:grayscale-0"
              alt="Youtube"
            />
          </Link>
        </div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.562811319889!2d107.6208535110669!3d-6.942735667937234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e862246d4d8b%3A0xe9bef92e40558057!2sJl.%20Mutumanikam%20No.69%2C%20Cijagra%2C%20Kec.%20Lengkong%2C%20Kota%20Bandung%2C%20Jawa%20Barat%2040265!5e0!3m2!1sid!2sid!4v1751366683352!5m2!1sid!2sid"
          className="w-full h-96"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
        <div className="text-center text-sm md:text-base">
          <p>
            © 2025 EJPeace Entertainment. All Rights Reserved. |{" "}
            <button
              onClick={() => setShowTerms(true)}
              className="underline hover:text-blue-300 cursor-pointer"
            >
              Terms & Conditions
            </button>{" "}
            |{" "}
            <button
              onClick={() => setShowRefund(true)}
              className="underline hover:text-blue-300 cursor-pointer"
            >
              Refund Policy
            </button>
          </p>
        </div>
      </footer>

      {showTerms && <TermPopup button={() => setShowTerms(false)} />}
      {showRefund && <RefundPopup button={() => setShowRefund(false)} />}
    </section>
  );
};

export default AuthLayoutMarket;
