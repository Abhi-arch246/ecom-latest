import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useCreateOrderMutation } from "../slices/ordersApiSlice";
import { clearCartItems } from "../slices/cartSlice";
import toast from "react-hot-toast";

function OrderScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    cartItems,
    shippingAddress,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
    paymentMethod,
  } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const { address, city, state, country, postalCode } = shippingAddress;
  const [createOrder, { isLoading, isError }] = useCreateOrderMutation();

  useEffect(() => {
    if (!address) {
      navigate("/shipping");
    }
  }, [address, navigate]);

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        userId: userInfo._id,
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        orderAmount: itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      }).unwrap();
      if (res.success) {
        toast.success("Order Successful");
        dispatch(clearCartItems());
        navigate(`/order/${res.creatingOrder._id}`);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error(error.data);
    }
  };
  return (
    <>
      <div className="container mx-auto my-8 px-3">
        <div className="md:flex gap-3">
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
              <p className="py-2">Items Price: ${itemsPrice} /-</p>
              <p className="py-2">Shipping Price: ${shippingPrice} /-</p>
              <p className="py-2">Tax Price: ${taxPrice} /-</p>
              <hr />
              <h2 className="font-bold py-3">Total price: ${totalPrice} /-</h2>
            </div>
          </div>
        </div>
        <div className="my-4">
          {isLoading && (
            <img
              className="mx-auto"
              width="450px"
              src="https://i.pinimg.com/originals/59/22/20/5922208e18658f5e83b6ad801b895f71.gif"
              alt="Loading ..."
            />
          )}
          <h1 className="text-3xl text-center font-bold">Order items</h1>
          <div>
            <table className="m-4 w-auto mx-auto">
              <thead>
                <tr className="border-solid border-b-2">
                  <th className="text-md p-6">Product Image</th>
                  <th className="text-md p-6">Product Name</th>
                  <th className="text-md p-6">Category</th>
                  <th className="text-md p-6">Price</th>
                  <th className="text-md p-6">Quantity</th>
                  <th className="text-md p-6">Total Price</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {cartItems.map((item) => {
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
                      <td>{item.category}</td>
                      <td>${item.price} /-</td>
                      <td>{item.qty}</td>
                      <td>${item.qty * item.price} /-</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="text-center py-8">
          <button
            onClick={placeOrderHandler}
            className="bg-slate-500 text-white py-2 px-3 rounded-md"
          >
            Order now
          </button>
        </div>
      </div>
    </>
  );
}

export default OrderScreen;
