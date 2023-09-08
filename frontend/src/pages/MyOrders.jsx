import { Link } from "react-router-dom";
import { useGetMyOrdersQuery } from "../slices/ordersApiSlice";
import moment from "moment";

function MyOrders() {
  const { data: orders, isLoading, error } = useGetMyOrdersQuery();
  return (
    <div className="container mx-auto">
      <div className="flex flex-col">
        <h1 className="text-3xl py-4 font-bold text-center">My Orders</h1>
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div class="overflow-hidden">
              <table class="min-w-full m-4 text-left text-sm font-light">
                <thead className="border-b bg-slate-500 font-medium ">
                  <tr>
                    <th className="text-md p-5">Order Id</th>
                    <th className="text-md p-5">No. of Products</th>
                    <th className="text-md p-5">Total Price</th>
                    <th className="text-md p-5">Payment Method</th>
                    <th className="text-md p-5">Payment Status</th>
                    <th className="text-md p-5">Delivery Status</th>
                    <th className="text-md p-5">Date ordered</th>
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
                  {orders?.map((item) => {
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
  );
}
export default MyOrders;
