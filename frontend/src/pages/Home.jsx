import { useGetProductsQuery } from "../slices/productsApiSlice";
import hero_img from "../assets/hero_img.png";
import Product from "../components/Product";
import { useState } from "react";

function Home() {
  const [search, setSearch] = useState("");
  const { data: products, isLoading, error } = useGetProductsQuery();
  return (
    <>
      <div className="container mx-auto p-6">
        {/* Hero Section */}
        <div className="flex flex-col md:flex-row border-slate-600 border-4 px-12 rounded-lg">
          <div className="md:w-2/5 my-auto">
            <h1 className="text-xl pb-4 font-bold">
              Our products are designed to make your life easier.
            </h1>

            <p className="py-3">
              MERN ECom is an online marketplace where you can find a wide
              variety of products, from clothes and electronics to home goods
              and groceries. We offer a wide range of shipping options, so you
              can get your products as quickly or as slowly as you need them.
              And our customer service team is available 24/7 to help you with
              any questions or problems.
            </p>

            <button className="bg-gradient-to-r from-gray-700 to-stone-500 p-2 rounded-md text-white hover:bg-violet-500">
              Shop now
            </button>
          </div>
          <div className="md:w-3/5">
            <img src={hero_img} alt="" />
          </div>
        </div>

        {/* Products section */}
        <div className="container py-6">
          <div className="md:flex justify-between py-8">
            <h2 className="text-3xl font-bold">Latest Products</h2>
            <input
              className="rounded-md m-2 p-2 invalid:border-red-400 border border-gray-300"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search product"
            />
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
            <>
              <div className="grid grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 gap-y-6">
                {products
                  .filter((product) => {
                    return search.toLowerCase() === ""
                      ? product
                      : product.name.toLowerCase().includes(search) ||
                          product.category.toLowerCase().includes(search);
                  })
                  .map((product) => (
                    <Product key={product._id} product={product} />
                  ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
