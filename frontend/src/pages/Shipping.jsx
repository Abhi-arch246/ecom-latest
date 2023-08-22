import { useEffect, useState } from "react";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingAddress, savePaymentMethod } from "../slices/cartSlice";

function Shipping() {
  const cart = useSelector((state) => state.cart);
  const { cartItems, shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress?.address || "");
  const [city, setCity] = useState(shippingAddress?.city || "");
  const [state, setState] = useState(shippingAddress?.state || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress?.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress?.country || "");
  const [logoutApiCall, { isLoading }] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!cartItems.length > 0) {
      navigate("/");
    }
  }, []);

  const shippingHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({ address, city, state, postalCode, country })
    );
    dispatch(savePaymentMethod("Paypal"));
    navigate("/placeorder");
  };
  return (
    <div className="container pt-8 mx-auto">
      <form>
        <div className="bg-slate-600 mx-auto rounded-3xl max-w-md p-12">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-4">
              Shipping Details
            </h2>

            <input
              className="w-full rounded-md p-2 invalid:border-red-400 border border-gray-300"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter address"
            />

            <input
              className="w-full rounded-md p-2 invalid:border-red-400 border border-gray-300"
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city"
            />

            <input
              className="w-full rounded-md p-2 invalid:border-red-400 border border-gray-300"
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              placeholder="Enter state"
            />

            <input
              className="w-full rounded-md p-2 invalid:border-red-400 border border-gray-300"
              type="text"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              placeholder="Enter postalCode"
            />

            <input
              className="w-full rounded-md p-2 invalid:border-red-400 border border-gray-300"
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Enter country"
            />

            <button
              onClick={shippingHandler}
              disabled={isLoading}
              className="rounded-md bg-gray-200 p-2 w-1/2 justify-center cursor-pointer"
              type="button"
            >
              Save
            </button>
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
      </form>
    </div>
  );
}

export default Shipping;
