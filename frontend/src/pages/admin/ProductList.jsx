import { Link } from "react-router-dom";
import { useGetProductsQuery } from "../../slices/productsApiSlice";
import { FaCircleChevronLeft } from "react-icons/fa6";

function ProductList() {
  const { data: products, isLoading, error } = useGetProductsQuery();
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
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-14">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-2">
              <div className="overflow-hidden">
                <table className="min-w-full m-2 mb-6 text-left text-sm font-light">
                  <thead className="border-b text-center bg-slate-500 font-medium ">
                    <tr>
                      <th className="text-md p-4">Product Id</th>
                      <th className="text-md p-4">Image</th>
                      <th className="text-md p-4">Name</th>
                      <th className="text-md p-4">No. of Products</th>
                      <th className="text-md p-4">Brand</th>
                      <th className="text-md p-4">Category</th>
                      <th className="text-md p-4">Price</th>
                      <th className="text-md p-4">Rating</th>
                      <th className="text-md p-4">Reviews</th>
                    </tr>
                  </thead>
                  <tbody>
                    {isLoading && (
                      <img
                        width="450px"
                        src="https://i.pinimg.com/originals/59/22/20/5922208e18658f5e83b6ad801b895f71.gif"
                        alt="Loading ..."
                      />
                    )}
                    {products?.map((item) => {
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
                        </tr>
                      );
                    })}
                  </tbody>
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
