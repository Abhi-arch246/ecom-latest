import products from "../products";
import hero_img from "../assets/hero_img.png";
import Product from "../components/Product";
import Rating from "react-rating";

function Home() {
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
          <h2 className="text-3xl font-bold py-6">Latest Products</h2>
          <div className="grid grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 gap-y-6">
            {products.map((product) => (
              <Product product={product} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
