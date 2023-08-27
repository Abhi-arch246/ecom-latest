import { useSelector } from "react-redux";
import { useGetMyOrdersQuery } from "../slices/ordersApiSlice";
function MyOrders() {
  const { userInfo } = useSelector((state) => state.auth);
  const { data: orders, isLoading, error } = useGetMyOrdersQuery();
  return (
    <div className="container mx-auto">
      <h1>{userInfo._id}</h1>
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
        <tbody className="text-center">
          {isLoading && (
            <img
              className="mx-auto"
              width="450px"
              src="https://i.pinimg.com/originals/59/22/20/5922208e18658f5e83b6ad801b895f71.gif"
              alt="Loading ..."
            />
          )}
          {/* {orders.map((item) => {
            return (
              <tr key={item._id} className="">
                <td>
                  <img
                    className="mx-auto pt-4"
                    src={item.imageUrl}
                    alt={item.name}
                    width="75px"
                  />
                </td>
                <td>{item.name}</td>
                <td>₹{item.price} /-</td>
                <td>{item.qty}</td>
                <td>₹{order.taxPrice}</td>
                <td>₹{order.totalPrice}</td>
              </tr>
            );
          })} */}
        </tbody>
      </table>
    </div>
  );
}
export default MyOrders;
