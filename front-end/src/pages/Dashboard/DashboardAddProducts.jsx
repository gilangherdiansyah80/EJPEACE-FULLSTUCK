import AuthLayoutAdmin from "../../component/Layouts/AuthLayoutAdmin";
import { Link } from "react-router-dom";
import { useState } from "react";

const DashboardAddProducts = () => {
  const [dataForm, setDataForm] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    sub_category: "",
  });

  const handleChange = (e) => {
    setDataForm({
      ...dataForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    try {
      fetch("https://ejpeaceentertainment.com/api/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataForm),
      }).then((response) => {
        if (response.ok) {
          alert("Product added successfully!");
          setDataForm({
            title: "",
            price: "",
            description: "",
            category: "",
            sub_category: "",
          });
          window.location.reload();
          window.location.href = "/Dashboard/DashboardProducts";
        } else {
          alert("Failed to add product");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <AuthLayoutAdmin>
      <main className="flex flex-col gap-y-5">
        <h1 className="text-2xl font-bold">Add Product</h1>
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
              placeholder="Input your product dedscription"
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
              <button>Cancel</button>
            </Link>
            <button
              className="bg-yellowejp text-ejp p-3 rounded-lg w-1/2"
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

export default DashboardAddProducts;
