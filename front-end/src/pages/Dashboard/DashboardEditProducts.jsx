import AuthLayoutAdmin from "../../component/Layouts/AuthLayoutAdmin";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const DashboardEditProducts = () => {
  const [dataForm, setDataForm] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    sub_category: "",
  });

  const { id } = useParams();

  const handleChange = (e) => {
    setDataForm({
      ...dataForm,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/productId/${id}`
        );
        const result = await response.json();

        const product = result.payload.datas;

        if (product) {
          setDataForm({
            title: product.title || "",
            price: product.price || "",
            description: product.description || "",
            category: product.category || "",
            sub_category: product.sub_category || "",
          });
        } else {
          console.warn("Produk tidak ditemukan!");
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:3000/api/product/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataForm),
    })
      .then((response) => {
        if (response.ok) {
          alert("Product updated successfully!");
          window.location.href = "/Dashboard/DashboardProducts";
        } else {
          console.error("Failed to update product:", response.statusText);
        }
      })
      .catch((error) => {
        console.error("Error updating product:", error);
      });
  };

  return (
    <AuthLayoutAdmin>
      <main className="flex flex-col gap-y-5">
        <h1 className="text-2xl font-bold">Edit Product</h1>

        <form className="flex flex-col gap-y-3 w-full" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-y-3">
            <label htmlFor="title">Name</label>
            <input
              type="text"
              name="title"
              onChange={handleChange}
              value={dataForm.title}
              id="title"
              className="border border-yellow-300 p-3 rounded-lg"
              placeholder="Input your product name"
            />
          </div>

          <div className="flex flex-col gap-y-3">
            <label htmlFor="price">Price</label>
            <input
              type="text"
              onChange={handleChange}
              value={dataForm.price}
              name="price"
              id="price"
              className="border border-yellow-300 p-3 rounded-lg"
              placeholder="Input your product price. example (1000000) or (100000 - 5000000)"
            />
          </div>

          <div className="flex flex-col gap-y-3">
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              onChange={handleChange}
              value={dataForm.description}
              id="description"
              className="border border-yellow-300 p-3 rounded-lg"
              placeholder="Input your product description"
            />
          </div>

          <div className="flex flex-col gap-y-3">
            <label htmlFor="category">Category</label>
            <input
              type="text"
              onChange={handleChange}
              value={dataForm.category}
              name="category"
              id="category"
              className="border border-yellow-300 p-3 rounded-lg"
              placeholder="Input your product category"
            />
          </div>

          <div className="flex flex-col gap-y-3">
            <label htmlFor="sub_category">Sub-Category</label>
            <input
              type="text"
              onChange={handleChange}
              value={dataForm.sub_category}
              name="sub_category"
              id="sub_category"
              className="border border-yellow-300 p-3 rounded-lg"
              placeholder="Input your product sub-category"
            />
          </div>

          <div className="flex gap-x-3 w-full">
            <Link
              to="/Dashboard/DashboardProducts"
              className="bg-red-500 text-white p-3 rounded-lg w-1/2 text-center"
            >
              Cancel
            </Link>
            <button
              className="bg-yellow-300 text-black p-3 rounded-lg w-1/2"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </main>
    </AuthLayoutAdmin>
  );
};

export default DashboardEditProducts;
