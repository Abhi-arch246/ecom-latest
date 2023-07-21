import React, { useState } from "react";
import { TbDeviceComputerCamera } from "react-icons/tb";
import { AiFillCloseCircle } from "react-icons/ai";
import { CgMenuRightAlt } from "react-icons/cg";
import { Link } from "react-router-dom";

function Header() {
  const [nav, setNav] = useState(false);

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
          <Link className="px-4" to="/login">
            Login
          </Link>
          <Link className="px-4" to="/register">
            Register
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
              Login
            </Link>

            <Link className="block border-b-2 p-2" to="/register">
              Register
            </Link>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Header;
