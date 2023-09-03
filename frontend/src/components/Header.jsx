import React, { useState } from "react";
import { TbDeviceComputerCamera } from "react-icons/tb";
import { AiFillCloseCircle, AiFillHome } from "react-icons/ai";
import { CgMenuRightAlt } from "react-icons/cg";
import { FaCircleUser, FaCartShopping, FaBoxOpen } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const [nav, setNav] = useState(false);
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <>
      <div className="flex justify-around bg-slate-600 text-white w-full px-3 h-16 items-center shadow-lg">
        <div className="w-full">
          <Link className="text-xl font-bold" to="/">
            <span>
              <TbDeviceComputerCamera className="inline" size={27} />
            </span>
            MERN Ecom
          </Link>
        </div>

        <ul className="hidden w-1/2 md:flex md:justify-center">
          <Link className="flex px-2" to="/">
            <span className="px-1">
              <AiFillHome className="inline" size={20} />
            </span>
            Home
          </Link>
          {userInfo ? (
            <>
              <Link className="flex px-2" to="/myorders">
                <span className="px-1">
                  <FaBoxOpen className="inline" size={20} />
                </span>
                My Orders
              </Link>
              <Link className="flex px-2" to="/profile">
                <span className="px-1">
                  <FaCircleUser className="inline" size={20} />
                </span>
                {userInfo.name}
              </Link>
            </>
          ) : (
            <Link className="flex" to="/login">
              <span className="px-1">
                <FaCircleUser className="inline" size={20} />
              </span>
              Login
            </Link>
          )}

          <Link className="flex px-2" to="/cart">
            <span className="px-1">
              <FaCartShopping className="inline" size={20} />
            </span>
            Cart
            <span className="bg-blue-500 rounded-lg mx-1 px-2">
              {cartItems.length}
            </span>
          </Link>
        </ul>
        <div onClick={handleNav} className="block md:hidden">
          {nav ? <AiFillCloseCircle size={25} /> : <CgMenuRightAlt size={25} />}
        </div>
        <div
          className={
            nav
              ? "fixed left-0 top-12 z-10 bg-slate-600 border-b-2 text-white w-full h-32 p-4 shadow-lg ease-in-out"
              : "hidden"
          }
        >
          <ul className="">
            {userInfo ? (
              <Link className="block border-b-2 p-2" to="/profile">
                <span className="px-1">
                  <FaCircleUser className="inline" size={20} />
                </span>
                {userInfo.name}
              </Link>
            ) : (
              <Link className="block border-b-2 p-2" to="/login">
                <span className="px-1">
                  <FaCircleUser className="inline" size={20} />
                </span>
                Login
              </Link>
            )}

            <Link className="block border-b-2 p-2" to="/cart">
              <span className="px-1">
                <FaCartShopping className="inline" size={20} />
              </span>
              Cart {cartItems.length}
            </Link>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Header;
