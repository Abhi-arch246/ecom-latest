import { Link, useParams, useNavigate } from "react-router-dom";
import { useGetOrderByIdQuery } from "../slices/ordersApiSlice";

function OrderPage() {
  const { id: orderId } = useParams();
  const { data: order, isLoading, isError } = useGetOrderByIdQuery(orderId);
  console.log(order);
  return (
    <div className="container mx-auto">
      {/* <div className="md:flex gap-3">
        <div className="w-1/2">
          <h1 className="text-2xl font-bold">Shipping Details</h1>
          <div className="p-3">
            <h2 className="font-bold py-3">Address:</h2>
            <p>
              {address}, {city}, {state}, {country} - {postalCode}
            </p>
          </div>
        </div>
        <div className="w-1/2">
          <h1 className="text-2xl font-bold">Order Summary</h1>
          <div className="p-3 float-right">
            <p className="py-2">Items Price: ₹{itemsPrice} /-</p>
            <p className="py-2">Shipping Price: ₹{shippingPrice} /-</p>
            <p className="py-2">Tax Price: ₹{taxPrice} /-</p>
            <hr />
            <h2 className="font-bold py-3">Total price: ₹{totalPrice} /-</h2>
          </div>
        </div>
      </div> */}
      <div className="my-4">
        {isLoading && (
          <img
            className="mx-auto"
            width="450px"
            src="https://i.pinimg.com/originals/59/22/20/5922208e18658f5e83b6ad801b895f71.gif"
            alt="Loading ..."
          />
        )}
      </div>
    </div>
  );
}

export default OrderPage;
