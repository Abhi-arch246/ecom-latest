import { Link } from "react-router-dom";
import { useGetMyOrdersQuery } from "../slices/ordersApiSlice";
import moment from "moment";

function MyOrders() {
  const { data: orders, isLoading, error } = useGetMyOrdersQuery();
  return (
    <div className="container mx-auto">
      <table className="m-4 w-auto mx-auto">
        <thead>
          <tr className="border-solid border-b-2">
            <th className="text-md p-6">Order Id</th>
            <th className="text-md p-6">No. of Products</th>
            <th className="text-md p-6">Total Price</th>
            <th className="text-md p-6">Payment Method</th>
            <th className="text-md p-6">Payment Status</th>
            <th className="text-md p-6">Delivery Status</th>
            <th className="text-md p-6">Date ordered</th>
          </tr>
        </thead>
        <tbody className="text-center mt-8">
          {isLoading && (
            <img
              width="450px"
              src="https://i.pinimg.com/originals/59/22/20/5922208e18658f5e83b6ad801b895f71.gif"
              alt="Loading ..."
            />
          )}
          {orders?.map((item) => {
            return (
              <tr key={item._id}>
                <Link className="hover:underline" to={`/order/${item._id}`}>
                  <td className="py-6 font-bold">{item._id}</td>
                </Link>

                <td>{item.orderItems.length}</td>
                <td>${item.totalPrice}</td>
                <td>{item.paymentMethod}</td>
                {item.isPaid ? (
                  <td>
                    <p className="bg-green-500 inline p-2 rounded-md">Paid</p>
                  </td>
                ) : (
                  <td>
                    <p className="bg-red-500 text-white inline p-2 rounded-md">
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
                    <p className="bg-red-500 text-white inline p-2 rounded-md">
                      Not Delivered
                    </p>
                  </td>
                )}

                <td>{moment(item.createdAt).format("LLL")}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
export default MyOrders;
