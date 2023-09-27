import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaCircleChevronLeft } from "react-icons/fa6";
import {
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "../../slices/productsApiSlice";
import toast from "react-hot-toast";

function EditProduct() {
  const { id: productId } = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const {
    data: product,
    refetch,
    isLoading,
    error,
  } = useGetProductByIdQuery(productId);

  const [updateProduct, { isLoading: loadingUpdate }] =
    useUpdateProductMutation();
  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description);
      setImageUrl(product.imageUrl);
      setBrand(product.brand);
      setCategory(product.category);
      setPrice(product.price);
      setCountInStock(product.countInStock);
    }
  }, [product]);

  const navigate = useNavigate();

  const updateProductHandler = async (e) => {
    e.preventDefault();
    const updatedProduct = {
      productId,
      name,
      description,
      imageUrl,
      brand,
      category,
      price,
      countInStock,
    };
    try {
      const res = await updateProduct(updatedProduct);
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
      <div className="pt-7 pl-1 md:pl-10">
        <Link
          className="bg-slate-600 p-2 rounded-md text-white"
          to="/admin/products"
        >
          <span className="px-2">
            <FaCircleChevronLeft className="inline" />
          </span>
          Go back
        </Link>
      </div>
      <div className="container mx-auto mt-12">
        <h1 className="text-2xl text-center font-bold pb-8">
          Update Product of the inventory
        </h1>
        {isLoading && (
          <img
            width="450px"
            src="https://i.pinimg.com/originals/59/22/20/5922208e18658f5e83b6ad801b895f71.gif"
            alt="Loading ..."
          />
        )}
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
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
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
              onClick={updateProductHandler}
            >
              Update Product
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default EditProduct;
