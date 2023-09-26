import React from "react";
import ProductSvg from "../../assets/products.svg";
import OrderSvg from "../../assets/orders.svg";
import UserSvg from "../../assets/users.svg";
import { Link } from "react-router-dom";

function AdminPage() {
  return (
    <div className="container mx-auto p-5">
      <h1 className="text-2xl text-center font-bold mt-5">
        Welcome to Admin Home Page
      </h1>
      <div className="md:flex justify-between gap-5 my-16">
        <div className=" mx-auto border-2 px-20 pb-8 rounded-lg">
          <Link to="/admin/products">
            <h2 className="text-xl text-center py-8 font-bold">Products</h2>
            <img
              className="mx-auto"
              src={ProductSvg}
              alt="Products"
              width="160px"
            />
          </Link>
        </div>
        <div className="mx-auto border-2 px-20 pb-8 rounded-xl">
          <Link to="/admin/orders">
            <h2 className="text-xl text-center py-8 font-bold">Orders</h2>
            <img
              className="mx-auto"
              src={OrderSvg}
              alt="Products"
              width="160px"
            />
          </Link>
        </div>
        <div className="mx-auto border-2 px-20 pb-8 rounded-lg">
          <Link to="/admin/users">
            <h2 className="text-xl text-center py-8 font-bold">Users</h2>
            <img
              className="mx-auto"
              src={UserSvg}
              alt="Products"
              width="160px"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
