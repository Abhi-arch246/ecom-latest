import { Link } from "react-router-dom";
import { FaCartShopping, FaStar, FaRegStar } from "react-icons/fa6";
import Rating from "react-rating";

function Product({ product }) {
  return (
    <div className="shadow-lg border-slate-200 border-2 rounded-lg p-4">
      <div key={product._id}>
        {/* <h3>{product.brand}</h3> */}
        <Link to={`/product/${product._id}`}>
          <img
            className="pic-style rounded-md mx-auto"
            src={product.imageUrl}
            width="150"
            height="50"
            alt={product.name}
          />

          {/* <h3 className="p-3">{product.desciption}</h3> */}
          <h3 className="text-xl font-bold py-2 text-center hover:underline">
            {product.name}
          </h3>
        </Link>

        <h3 className="font-bold text-center text-xl">
          Price : ₹ <span className="text-green-800">{product.price}</span>/-
        </h3>
        <div className="flex justify-around py-3">
          <h3>Rating : {product.rating}</h3>
          <Rating
            style={{ color: "orange" }}
            initialRating={product.rating}
            readonly
            fractions={2}
            fullSymbol={<FaStar />}
            emptySymbol={<FaRegStar />}
          />
        </div>
        <div className="flex justify-center">
          <button className="bg-slate-600 p-2 rounded-lg text-white">
            <span className="px-2">
              <FaCartShopping className="inline" size={20} />
            </span>
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default Product;
