import { Link } from "react-router-dom";
import {
  useGetProductsQuery,
  useDeleteProductMutation,
} from "../../slices/productsApiSlice";
import { FaCircleChevronLeft } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
import { BiCartAdd } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import toast from "react-hot-toast";
import { useState } from "react";

function ProductList() {
  const [search, setSearch] = useState("");
  const { data: products, isLoading, error, refetch } = useGetProductsQuery();
  const [deleteProduct, { isLoading: loadingDelete }] =
    useDeleteProductMutation();

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure to delete?")) {
      try {
        await deleteProduct(id);
        refetch();
        toast.success(`Product deleted`);
      } catch (error) {
        toast.error("Something went wrong");
      }
    }
  };
  return (
    <>
      <div className="pt-7 pl-1 md:pl-10">
        <Link className="bg-slate-600 p-2 rounded-md text-white" to="/admin">
          <span className="px-2">
            <FaCircleChevronLeft className="inline" />
          </span>
          Go back
        </Link>
      </div>
      <div className="container mx-auto">
        <div className="flex flex-col">
          <h1 className="text-3xl py-4 font-bold text-center">All Products</h1>
          <div className="flex justify-between">
            <Link
              className="bg-slate-600 p-2 rounded-md text-white"
              to="/admin/addproduct"
            >
              <span className="px-2">
                <BiCartAdd className="inline" size={25} />
              </span>
              New Product
            </Link>
            <input
              className="rounded-md p-2 invalid:border-red-400 border border-gray-300"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products"
            />
          </div>
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-14">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-2">
              <div className="overflow-hidden">
                <table className="min-w-full m-2 mb-6 text-left text-sm font-light">
                  <thead className="border-b text-center bg-slate-500 font-medium ">
                    <tr>
                      <th className="text-md p-3">Product Id</th>
                      <th className="text-md p-3">Image</th>
                      <th className="text-md p-3">Name</th>
                      <th className="text-md p-3">No. of Products</th>
                      <th className="text-md p-3">Brand</th>
                      <th className="text-md p-3">Category</th>
                      <th className="text-md p-3">Price</th>
                      <th className="text-md p-3">Rating</th>
                      <th className="text-md p-3">Reviews</th>
                      <th className="text-md p-3">Edit</th>
                      <th className="text-md p-3">Delete</th>
                    </tr>
                  </thead>
                  {isLoading ? (
                    <div className="w-screen mx-auto">
                      <img
                        className="mx-auto"
                        src="https://i.pinimg.com/originals/59/22/20/5922208e18658f5e83b6ad801b895f71.gif"
                        alt="Loading ..."
                      />
                    </div>
                  ) : (
                    <tbody>
                      {products
                        ?.filter((item) => {
                          return search.toLowerCase() === ""
                            ? item
                            : item.name.toLowerCase().includes(search) ||
                                item.category.toLowerCase().includes(search) ||
                                item.brand.toLowerCase().includes(search);
                        })
                        .map((item) => {
                          return (
                            <tr
                              className="border-b text-center bg-neutral-100"
                              key={item._id}
                            >
                              <Link
                                className="hover:underline"
                                to={`/product/${item._id}`}
                              >
                                <td className="py-6 font-bold">{item._id}</td>
                              </Link>

                              <td>
                                <img
                                  className="mx-auto"
                                  src={item.imageUrl}
                                  alt={item.name}
                                  width="55px"
                                />
                              </td>
                              <td>{item.name}</td>
                              <td>{item.countInStock}</td>
                              <td>{item.brand}</td>
                              <td>{item.category}</td>
                              <td>${item.price}</td>
                              <td>{item.rating}</td>
                              <td>{item.reviews.length}</td>
                              <td>
                                <Link to={`/admin/product/${item._id}/edit`}>
                                  <FiEdit
                                    className="inline hover:cursor-pointer"
                                    size={20}
                                  />
                                </Link>
                              </td>
                              <td>
                                <MdDeleteOutline
                                  onClick={() => deleteHandler(item._id)}
                                  className="inline hover:cursor-pointer"
                                  size={25}
                                />
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  )}

                  {loadingDelete && (
                    <img
                      width="450px"
                      src="https://i.pinimg.com/originals/59/22/20/5922208e18658f5e83b6ad801b895f71.gif"
                      alt="Loading ..."
                    />
                  )}
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default ProductList;
