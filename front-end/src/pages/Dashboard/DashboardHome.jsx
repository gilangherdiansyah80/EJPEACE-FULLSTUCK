import AuthLayoutAdmin from "../../component/Layouts/AuthLayoutAdmin";
import { useState, useEffect } from "react";

const DashboardHome = () => {
  const [dataProducts, setDataProducts] = useState([]);
  const [dataKerusakan, setDataKerusakan] = useState([]);
  const [dataCarts, setDataCarts] = useState([]);
  const [dataForm, setDataForm] = useState({
    finally_price: "",
  });

  const handleChange = (e) => {
    setDataForm({
      ...dataForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (id) => {
    try {
      const response = await fetch(
        `https://ejpeaceentertainment.com/api/carts/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataForm),
        }
      );
      if (response.ok) {
        alert("Data updated successfully!");
      } else {
        alert("Failed to update data");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetch("https://ejpeaceentertainment.com/api/product")
      .then((response) => response.json())
      .then((data) => setDataProducts(data.payload.datas));
  }, []);

  useEffect(() => {
    fetch("https://ejpeaceentertainment.com/api/kerusakan")
      .then((response) => response.json())
      .then((data) => setDataKerusakan(data.payload.datas));
  }, []);

  useEffect(() => {
    fetch("https://ejpeaceentertainment.com/api/carts")
      .then((response) => response.json())
      .then((data) => setDataCarts(data.payload.datas));
  }, []);

  const filteredCarts = dataCarts.filter(
    (item) =>
      item.information !== undefined &&
      item.information !== null &&
      item.information.trim() !== ""
  );

  return (
    <AuthLayoutAdmin>
      <main className="flex flex-col gap-y-3">
        <ul className="flex gap-x-3 w-full">
          <li className="bg-gradient-to-r from-[#f6df3c] to-[#74690f] p-3 rounded-lg text-ejp w-1/2 flex gap-y-3 items-center justify-between">
            <i className="fa-solid fa-cube text-4xl"></i>
            <section className="flex flex-col gap-y-1 items-center">
              <h1 className="text-white">Total Products</h1>
              <h2 className="text-white">{dataProducts.length}</h2>
            </section>
          </li>
          <li className="bg-gradient-to-r from-[#f6df3c] to-[#74690f] p-3 rounded-lg text-white w-1/2 flex gap-y-3 items-center justify-between">
            <i className="fa-solid fa-chart-line text-4xl text-ejp"></i>
            <section className="flex flex-col gap-y-1 items-center">
              <h1>Total Penjualan</h1>
              <h2>{dataKerusakan.length}</h2>
            </section>
          </li>
          <li className="bg-gradient-to-r from-[#f6df3c] to-[#74690f] p-3 rounded-lg text-white w-1/2 flex gap-y-3 items-center justify-between">
            <i className="fa-solid fa-dollar text-4xl text-ejp"></i>
            <section className="flex flex-col gap-y-1 items-center">
              <h1>Total Pendapatan</h1>
              <h2>{dataKerusakan.length}</h2>
            </section>
          </li>
        </ul>

        <section className="flex flex-col gap-y-3 border border-yellowejp rounded-xl p-3">
          <h1 className="text-xl font-bold">Ajuan Pembelian</h1>
          <article className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 w-full">
            {filteredCarts.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-y-3 bg-[#74690f] p-3 rounded-lg text-white w-full"
              >
                <div className="flex items-center bg-white rounded-xl justify-center w-full">
                  <img
                    src="/images/EJP-Creative.png"
                    alt={item.title}
                    className="w-52"
                  />
                </div>
                <div className="flex justify-between">
                  <h1 className="font-bold text-2xl text-yellowejp">
                    {item.title}
                  </h1>
                  <p className="text-white">{item.category}</p>
                </div>
                <span className="text-white">
                  {item.price.includes("-")
                    ? item.price
                        .split("-")
                        .map((price) =>
                          Number(price.trim()).toLocaleString("id-ID", {
                            style: "currency",
                            currency: "IDR",
                          })
                        )
                        .join(" - ")
                    : Number(item.price).toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })}
                </span>
                <p>Request by: {item.name}</p>
                <p className="text-white">Information: {item.information}</p>
                <input
                  type="number"
                  name="finally_price"
                  id="finally_price"
                  onChange={handleChange}
                  value={dataForm.finally_price}
                  className="w-full border border-black rounded-lg p-3 text-ejp"
                  placeholder="Tentukan Harga"
                />
                <button
                  className="flex gap-x-3 bg-yellowejp rounded-lg p-3 justify-center items-center text-ejp"
                  onClick={() => handleSubmit(item.cart_id)}
                >
                  <div className="bg-green-500 w-10 h-10 rounded-full flex justify-center items-center">
                    <i className="fa-solid fa-check"></i>
                  </div>
                  Kirim Pengajuan
                </button>
              </div>
            ))}
          </article>
        </section>
      </main>
    </AuthLayoutAdmin>
  );
};

export default DashboardHome;
