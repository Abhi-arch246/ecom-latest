import { Link, useParams, useNavigate } from "react-router-dom";
import {
  useGetProductByIdQuery,
  useCreateReviewMutation,
} from "../slices/productsApiSlice";
import {
  FaCartShopping,
  FaStar,
  FaRegStar,
  FaCircleChevronLeft,
} from "react-icons/fa6";
import Rating from "react-rating";
import { useState } from "react";
import { addToCart } from "../slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import moment from "moment";

function ProductDesc() {
  const { id: productId } = useParams();
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const {
    data: product,
    refetch,
    isLoading,
    error,
  } = useGetProductByIdQuery(productId);
  const [createReview, { isLoading: reviewLoading }] =
    useCreateReviewMutation(productId);

  const { userInfo } = useSelector((state) => state.auth);
  const addToCartHandler = async () => {
    dispatch(addToCart({ ...product, qty }));
  };

  const reviewHandler = async (e) => {
    e.preventDefault();
    if (comment === "") {
      toast.error("Oops that's not right");
    } else {
      try {
        await createReview({
          productId,
          rating,
          comment,
        }).unwrap();
        refetch();
        toast.success("Review submitted");
        setComment("");
        setRating(0);
      } catch (error) {
        toast.error(error.data);
      }
    }
  };

  return (
    <>
      <div className="pt-7 pl-5">
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
                className="mobile-style md:desc-style rounded-md mx-auto"
                src={product.imageUrl}
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
                Price : ${product.price}
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
          <div className="container p-3 md:flex justify-around">
            <div className="flex-col">
              <h2 className="text-2xl font-bold">Reviews</h2>
              {product.reviews.length === 0 && (
                <p className="my-8 bg-red-200 p-3 rounded-md">
                  No reviews for this product
                </p>
              )}
              {product.reviews.map((review) => {
                return (
                  <div key={review._id}>
                    <p>{review.name}</p>
                    <Rating
                      style={{ color: "orange" }}
                      initialRating={review.rating}
                      readonly
                      fractions={2}
                      fullSymbol={<FaStar />}
                      emptySymbol={<FaRegStar />}
                    />
                    <p>{review.comment}</p>
                    <p>{moment(review.createdAt).format("LLL")}</p>
                  </div>
                );
              })}
            </div>
            <div className="flex-col">
              <h2 className="text-2xl font-bold">Write customer review</h2>
              {reviewLoading && (
                <img
                  className="mx-auto"
                  width="450px"
                  src="https://i.pinimg.com/originals/59/22/20/5922208e18658f5e83b6ad801b895f71.gif"
                  alt="Loading ..."
                />
              )}

              {userInfo ? (
                <form className="my-6">
                  <p>Select the rating for product </p>
                  <Rating
                    initialRating={rating}
                    onChange={(value) => setRating(value)}
                    style={{ color: "orange" }}
                    fractions={2}
                    fullSymbol={<FaStar />}
                    emptySymbol={<FaRegStar />}
                  />
                  <textarea
                    className="block mt-4 border-2"
                    name="comment"
                    placeholder="Enter review here"
                    onChange={(e) => setComment(e.target.value)}
                    cols="30"
                    rows="5"
                  >
                    {comment}
                  </textarea>
                  <button
                    className="bg-slate-500 my-4 rounded-md p-2 text-white"
                    onClick={reviewHandler}
                  >
                    Submit
                  </button>
                </form>
              ) : (
                <>
                  <Link
                    className="block my-8 p-3 rounded-md underline bg-red-200"
                    to="/login"
                  >
                    Click here to login to write a review
                  </Link>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default ProductDesc;
