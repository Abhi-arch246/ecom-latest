import { Link, useParams, useNavigate } from "react-router-dom";
import {
  useGetOrderByIdQuery,
  usePayOrderMutation,
  useGetPaypalClientIdQuery,
} from "../slices/ordersApiSlice";
import moment from "moment";
import { useSelector } from "react-redux";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useEffect } from "react";

function OrderPage() {
  const { id: orderId } = useParams();
  const { userInfo } = useSelector((state) => state.auth);
  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderByIdQuery(orderId);
  const [payOrder, { isLoading: payLoading }] = usePayOrderMutation();
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  const {
    data: paypal,
    isLoading: paypalLoading,
    error: paypalError,
  } = useGetPaypalClientIdQuery();
  //   console.log(order);
  useEffect(() => {
    if (!paypalError && !paypalLoading && paypal.clientId) {
      const loadPaypalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: { "client-id": paypal.clientId, currency: "USD" },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };
      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadPaypalScript();
        }
      }
    }
  }, [order, paypal, paypalDispatch, payLoading, paypalError]);
  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: order.totalPrice,
            },
          },
        ],
      })
      .then((orderId) => {
        return orderId;
      });
  };
  const onApprove = (data, actions) => {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details });
        refetch();
        alert("paid success");
      } catch (error) {
        alert(error.data);
      }
    });
  };
  const onError = (err) => {
    console.log(err.data);
  };

  return (
    <div className="container mx-auto">
      <div className="my-4">
        <div className="">
          <h1 className="text-3xl text-center font-bold">Ordered Info</h1>
        </div>
        {isLoading ? (
          <img
            className="mx-auto"
            width="450px"
            src="https://i.pinimg.com/originals/59/22/20/5922208e18658f5e83b6ad801b895f71.gif"
            alt="Loading ..."
          />
        ) : error ? (
          <h1>{error}</h1>
        ) : (
          <div className="py-6 mx-auto">
            <>
              <table className="m-4 w-auto mx-auto">
                <thead>
                  <tr className="border-solid border-b-2">
                    <th className="text-md p-6">Product Image</th>
                    <th className="text-md p-6">Product Name</th>
                    <th className="text-md p-6">Price</th>
                    <th className="text-md p-6">Quantity</th>
                    <th className="text-md p-6">Tax</th>
                    <th className="text-md p-6">Total Price</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {order.orderItems.map((item) => {
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
                        <td>${item.price} /-</td>
                        <td>{item.qty}</td>
                        <td>${order.taxPrice}</td>
                        <td>${order.totalPrice}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </>
            <div className="flex gap-8">
              <div className="w-1/2 shadow-lg rounded-lg p-6">
                <h2 className="text-2xl text-center font-bold mt-8">
                  Shipping Details
                </h2>
                <p className="mt-6 mb-2">
                  <span className="font-bold">Name: </span>
                  {userInfo.name}
                </p>
                <p className="mb-2">
                  <span className="font-bold">Email: </span>
                  {userInfo.email}
                </p>
                <p className="mb-2">
                  <span className="font-bold">Address: </span>
                  {order.shippingAddress.address}, {order.shippingAddress.city},
                  {order.shippingAddress.state}, {order.shippingAddress.country}
                  - {order.shippingAddress.postalCode}
                </p>
              </div>
              <div className="w-1/2 rounded-lg shadow-lg p-6">
                <h2 className="text-2xl text-center font-bold mt-8">
                  Order Details
                </h2>
                <p className="mt-6 mb-2">
                  <span className="font-bold">Order time: </span>
                  {moment(order.createdAt).format("LLL")}
                </p>
                <h2 className="mb-2">
                  <span className="font-bold">Delivery status: </span>
                  {order.isDelivered ? (
                    <span className="bg-green-400 p-1 rounded-md">
                      Delivered
                    </span>
                  ) : (
                    <span className="bg-red-400 p-1 rounded-md">
                      Not Delivered
                    </span>
                  )}
                </h2>
                <h2 className="mb-2">
                  <span className="font-bold">Payment status: </span>
                  {order.isPaid ? (
                    <span className="bg-green-400 p-1 rounded-md">Paid</span>
                  ) : (
                    <span className="bg-red-400 p-1 rounded-md">Not Paid</span>
                  )}
                </h2>
              </div>
            </div>

            {!order.isPaid && (
              <>
                {payLoading && <h1>Loading...</h1>}
                {isPending ? (
                  <h1>Loading...</h1>
                ) : (
                  <div className="w-1/3 mx-auto my-6">
                    <PayPalButtons
                      createOrder={createOrder}
                      onApprove={onApprove}
                      onError={onError}
                    ></PayPalButtons>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderPage;
