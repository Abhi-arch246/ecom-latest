import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useCreateProductMutation } from "../../slices/productsApiSlice";
import toast from "react-hot-toast";

function AddProduct() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [createProduct, { isLoading }] = useCreateProductMutation();

  const addProductHandler = async (e) => {
    e.preventDefault();
    const newObj = {
      name,
      description,
      imageUrl,
      brand,
      category,
      price,
      stock,
    };

    try {
      const res = await createProduct({
        name,
        description,
        imageUrl,
        brand,
        category,
        price,
        stock,
      });
      if (res) {
        toast.success(res.data.msg);
        navigate("/admin/products");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <>
      <div className="container mx-auto mt-12">
        <h1 className="text-2xl text-center font-bold pb-8">
          Add Product to the inventory
        </h1>
        <form className="p-4">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-slate-600 peer"
              placeholder="Enter Name"
              required
            />
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <label className="block mb-2 text-lg font-medium text-gray-900">
              Description
            </label>
            <textarea
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="block p-2.5 w-full text-lg text-gray-900 bg-gray-50 rounded-md border border-gray-300 focus:ring-slate-500 focus:border-slate-600"
              placeholder="Enter Description..."
            ></textarea>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="block py-2.5 px-0 w-full text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-slate-600 peer"
              placeholder="Enter Image URL "
              required
            />
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="block py-2.5 px-0 w-full text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-slate-600 peer"
                placeholder="Enter Brand"
                required
              />
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="block py-2.5 px-0 w-full text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-slate-600 peer"
                placeholder="Enter Category "
                required
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="block py-2.5 px-0 w-full text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder="Enter Stock"
                required
              />
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="block py-2.5 px-0 w-full text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-slate-600 peer"
                placeholder="Enter Price "
                required
              />
            </div>
          </div>
          <div className="text-center py-6">
            <button
              type="submit"
              className="p-2 bg-slate-400 rounded-md"
              onClick={addProductHandler}
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddProduct;
