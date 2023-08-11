import React, { useState } from "react";
import { TbDeviceComputerCamera } from "react-icons/tb";
import { AiFillCloseCircle } from "react-icons/ai";
import { CgMenuRightAlt } from "react-icons/cg";
import { FaCircleUser, FaCartShopping } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const [nav, setNav] = useState(false);
  const { cartItems } = useSelector((state) => state.cart);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <>
      <div className="flex justify-between bg-slate-600 text-white w-full px-4 h-16 items-center shadow-lg">
        <div className="w-full">
          <Link className="text-xl font-bold" to="/">
            <span>
              <TbDeviceComputerCamera className="inline" size={27} />
            </span>
            MERN Ecom
          </Link>
        </div>

        <ul className="hidden md:flex">
          <Link className="flex px-3" to="/login">
            <span className="px-1">
              <FaCircleUser className="inline" size={20} />
            </span>
            Login
          </Link>
          <Link className="flex px-3" to="/cart">
            <span className="px-1">
              <FaCartShopping className="inline" size={20} />
            </span>
            Cart
            <span className="bg-green-500 rounded-lg mx-1 px-2">
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
            <Link className="block border-b-2 p-2" to="/login">
              <span className="px-1">
                <FaCircleUser className="inline" size={20} />
              </span>
              Login
            </Link>

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
