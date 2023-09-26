import { useGetAllOrdersQuery } from "../../slices/ordersApiSlice";
import moment from "moment";
import { Link } from "react-router-dom";
import { FaCircleChevronLeft } from "react-icons/fa6";

function OrderList() {
  const { data: allorders, isLoading, error } = useGetAllOrdersQuery();
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
          <h1 className="text-3xl py-4 font-bold text-center">All Orders</h1>
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-14">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-2">
              <div className="overflow-hidden">
                <table className="min-w-full m-2 mb-6 text-left text-sm font-light">
                  <thead className="border-b bg-slate-500 font-medium ">
                    <tr>
                      <th className="text-md p-4">Order Id</th>
                      <th className="text-md p-4">No. of Products</th>
                      <th className="text-md p-4">Total Price</th>
                      <th className="text-md p-4">Payment Method</th>
                      <th className="text-md p-4">Payment Status</th>
                      <th className="text-md p-4">Delivery Status</th>
                      <th className="text-md p-4">Date ordered</th>
                      <th className="text-md p-4">Date Delivered</th>
                    </tr>
                  </thead>
                  <tbody>
                    {isLoading && (
                      <img
                        className="text-center"
                        width="450px"
                        src="https://i.pinimg.com/originals/59/22/20/5922208e18658f5e83b6ad801b895f71.gif"
                        alt="Loading ..."
                      />
                    )}
                    {allorders?.map((item) => {
                      return (
                        <tr
                          className="border-b text-center bg-neutral-100"
                          key={item._id}
                        >
                          <Link
                            className="hover:underline"
                            to={`/order/${item._id}`}
                          >
                            <td className="py-6 font-bold">{item._id}</td>
                          </Link>

                          <td>{item.orderItems.length}</td>
                          <td>${item.totalPrice}</td>
                          <td>{item.paymentMethod}</td>
                          {item.isPaid ? (
                            <td>
                              <p className="bg-green-500 inline p-2 rounded-md">
                                Paid
                              </p>
                            </td>
                          ) : (
                            <td>
                              <p className="bg-red-500 text-white inline md:p-2 p-1 rounded-md">
                                Not Paid
                              </p>
                            </td>
                          )}
                          {item.isDelivered ? (
                            <td>
                              <p className="bg-green-500 inline p-2 rounded-md">
                                Delivered
                              </p>
                            </td>
                          ) : (
                            <td>
                              <p className="bg-red-500 text-white inline md:p-2 p-1 rounded-md">
                                Not Delivered
                              </p>
                            </td>
                          )}

                          <td className="px-4">
                            {moment(item.createdAt).format("LLL")}
                          </td>
                          {item.isDelivered ? (
                            <td>
                              <p className=" inline p-2 rounded-md">
                                {moment(item.deliveredAt).format("LLL")}
                              </p>
                            </td>
                          ) : (
                            <td>
                              <p className="inline md:p-2 p-1 rounded-md">--</p>
                            </td>
                          )}
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

export default OrderList;
