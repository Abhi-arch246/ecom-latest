import { Link, useParams, useNavigate } from "react-router-dom";
import { useGetProductByIdQuery } from "../slices/productsApiSlice";
import {
  FaCartShopping,
  FaStar,
  FaRegStar,
  FaCircleChevronLeft,
} from "react-icons/fa6";
import Rating from "react-rating";
import { useState } from "react";
import { addToCart } from "../slices/cartSlice";
import { useDispatch } from "react-redux";

function ProductDesc() {
  const { id: productId } = useParams();
  const [qty, setQty] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: product, isLoading, error } = useGetProductByIdQuery(productId);

  const addToCartHandler = async () => {
    dispatch(addToCart({ ...product, qty }));
  };
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
              <p className="my-3">Description : {product.description}</p>
              <h3>Rating : {product.rating}</h3>
              <Rating
                style={{ color: "orange" }}
                initialRating={product.rating}
                readonly
                fractions={2}
                fullSymbol={<FaStar />}
                emptySymbol={<FaRegStar />}
              />
              <h3 className="my-3">
                Status:
                {product.countInStock > 0 ? (
                  <>
                    <h2 className="bg-green-500 inline p-2 rounded-md text-white">
                      In Stock
                    </h2>
                    <select
                      value={qty}
                      onChange={(e) => setQty(Number(e.target.value))}
                    >
                      {[...Array(product.countInStock).keys()].map((i) => {
                        return (
                          <option key={i + 1} value={i + 1}>
                            {i + 1}
                          </option>
                        );
                      })}
                    </select>
                  </>
                ) : (
                  <h2 className="bg-red-500 inline p-2 rounded-md text-white">
                    Out of Stock
                  </h2>
                )}
              </h3>

              <h2 className="font-bold my-6 text-right text-2xl">
                Price : ₹{product.price}
              </h2>
              <div className="text-right my-8">
                <button
                  className="disabled:opacity-50 disabled:cursor-not-allowed bg-slate-600 p-2 md:text-right rounded-lg text-white"
                  // className={`${product.countInStock > 0} ? "bg-slate-600 p-2 md:text-right rounded-lg text-white" : "bg-slate-600 p-2 md:text-right rounded-lg text-white"`}
                  disabled={product.countInStock == 0}
                  onClick={addToCartHandler}
                >
                  <span className="px-2">
                    <FaCartShopping className="inline" size={20} />
                  </span>
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default ProductDesc;
