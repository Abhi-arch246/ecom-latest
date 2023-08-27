import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../slices/cartSlice";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  var subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkOutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <>
      <div className="container mx-auto shadow-lg p-4 ">
        {cartItems.length > 0 ? (
          <>
            <table className="m-4 w-auto mx-auto">
              <thead>
                <tr className="border-solid border-b-2">
                  <th className="text-md p-6">Product Image</th>
                  <th className="text-md p-6">Product Name</th>
                  <th className="text-md p-6">Category</th>
                  <th className="text-md p-6">Price</th>
                  <th className="text-md p-6">Quantity</th>
                  <th className="text-md p-6">Total Price</th>
                  <th className="text-md p-6">Delete</th>
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
                      <td>
                        <select
                          value={item.qty}
                          onChange={(e) =>
                            addToCartHandler(item, e.target.value)
                          }
                        >
                          {[...Array(item.countInStock).keys()].map((i) => {
                            return (
                              <option key={i + 1} value={i + 1}>
                                {i + 1}
                              </option>
                            );
                          })}
                        </select>
                      </td>
                      <td>${item.qty * item.price} /-</td>
                      <td>
                        <button
                          onClick={() => removeFromCartHandler(item._id)}
                          className="px-6 bg-red-500 rounded-lg text-white py-2"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <h1 className="text-center m-4 font-bold text-xl">
              Subtotal : ${subtotal} /-
            </h1>
            <div className="text-center mt-8">
              <button
                onClick={checkOutHandler}
                className="bg-slate-500 text-center rounded-md p-3 text-white"
              >
                Proceed to checkout
              </button>
            </div>
          </>
        ) : (
          <>
            <img
              className="mx-auto"
              width="250px"
              src="https://img.freepik.com/premium-vector/shopping-cart-with-cross-mark-wireless-paymant-icon-shopping-bag-failure-paymant-sign-online-shopping-vector_662353-912.jpg"
              alt="Empty cart"
            />
            <h1 className="text-center p-6">No items in the bag.</h1>
          </>
        )}
      </div>
    </>
  );
}

export default Cart;
