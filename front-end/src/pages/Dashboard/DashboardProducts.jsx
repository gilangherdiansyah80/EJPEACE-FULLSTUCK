import AuthLayoutAdmin from "../../component/Layouts/AuthLayoutAdmin";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const DashboardProducts = () => {
  const [dataProducts, setDataProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/product")
      .then((response) => response.json())
      .then((data) => setDataProducts(data.payload.datas));
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/product/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Product deleted successfully!");
        window.location.href = "/Dashboard/DashboardProducts";
      } else {
        console.error("Failed to delete product:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };
  return (
    <AuthLayoutAdmin>
      <main className="flex flex-col gap-y-5">
        <h1 className="text-2xl font-bold">Data Products</h1>
        <section className="flex justify-between items-center">
          <button className="flex justify-center items-center bg-gradient-to-r from-[#f6df3c] to-[#74690f] text-white rounded-md p-3">
            <Link
              to="/Dashboard/DashboardAddProducts"
              className="flex gap-x-3 items-center"
            >
              <i className="fas fa-add"></i>
              <h1>Tambah Data</h1>
            </Link>
          </button>
        </section>
        <section className="overflow-x-auto w-full">
          <table className="min-w-full divide-y divide-gray-200 border border-gray-300 rounded-xl">
            <thead className="bg-yellowejp text-ejp">
              <tr>
                <th className="px-6 py-3 text-center text-sm font-semibold">
                  No
                </th>
                <th className="px-6 py-3 text-center text-sm font-semibold">
                  Title
                </th>
                <th className="px-6 py-3 text-center text-sm font-semibold">
                  Price
                </th>
                <th className="px-6 py-3 text-center text-sm font-semibold">
                  Description
                </th>
                <th className="px-6 py-3 text-center text-sm font-semibold">
                  Category
                </th>
                <th className="px-6 py-3 text-center text-sm font-semibold">
                  Sub-Category
                </th>
                <th className="px-6 py-3 text-center text-sm font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {dataProducts.map((item, index) => (
                <tr key={item.product_id}>
                  <td className="px-6 py-4 text-gray-700 text-center">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 text-gray-700 text-center">
                    {item.title}
                  </td>
                  <td className="px-6 py-4 text-gray-700 text-center">
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
                  </td>
                  <td className="px-6 py-4 text-gray-700 text-center">
                    {item.description}
                  </td>
                  <td className="px-6 py-4 text-gray-700 text-center">
                    {item.category}
                  </td>
                  <td className="px-6 py-4 text-gray-700 text-center">
                    {item.sub_category}
                  </td>
                  <td className="px-4 py-2 flex gap-x-3 w-full">
                    <Link
                      to={`/Dashboard/DashboardEditdProducts/${item.product_id}`}
                      className="w-1/2 bg-yellowejp text-black px-4 py-2 rounded-md text-center"
                    >
                      <button className=" text-ejp font-bold py-2 px-4 rounded">
                        Edit
                      </button>
                    </Link>
                    <button
                      className="bg-red-600 text-white px-4 py-2 rounded-md w-1/2"
                      onClick={() => handleDelete(item.product_id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </AuthLayoutAdmin>
  );
};

export default DashboardProducts;
