import { Link, useParams } from "react-router-dom";
import products from "../products";
import {
  FaCartShopping,
  FaStar,
  FaRegStar,
  FaCircleChevronLeft,
} from "react-icons/fa6";
import Rating from "react-rating";

function ProductDesc() {
  const { id: productId } = useParams();
  const product = products.find((pro) => pro._id == productId);

  return (
    <>
      <div className="pt-14 pl-14">
        <Link className="bg-slate-600 p-2 rounded-md text-white" to="/">
          <span className="px-2">
            <FaCircleChevronLeft className="inline" />
          </span>
          Go back
        </Link>
      </div>
      <div className="container mx-auto p-6 md:flex">
        <div className="flex-col p-3 md:w-1/2">
          <h1 className="text-center font-bold text-2xl my-6">
            {product.name}
          </h1>
          <img
            className="desc-style rounded-md mx-auto"
            src={product.imageUrl}
            width="150"
            height="50"
            alt={product.name}
          />
        </div>
        <div className="flex-col p-4 md:w-1/2 my-auto">
          <p className="my-3">Brand : {product.brand}</p>
          <p className="my-3">Category : {product.category}</p>
          <p className="my-3">Description : {product.desciption}</p>
          <h3>Rating : {product.rating}</h3>

          <Rating
            style={{ color: "orange" }}
            initialRating={product.rating}
            readonly
            fractions={2}
            fullSymbol={<FaStar />}
            emptySymbol={<FaRegStar />}
          />
          <h2 className="font-bold my-6 text-right text-2xl">
            Price : ₹{product.price}
          </h2>
          <div className="text-right my-8">
            <button className="bg-slate-600 p-2 md:text-right rounded-lg text-white">
              <span className="px-2">
                <FaCartShopping className="inline" size={20} />
              </span>
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDesc;
