import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const redirect = searchParams.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (error) {
      alert(error.data);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center mt-24">
        <form onSubmit={loginHandler}>
          <div className="bg-slate-600 rounded-3xl max-w-md p-12">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white mb-4">
                Login to your account
              </h2>
              {isLoading && (
                <img
                  className="mx-auto"
                  width="450px"
                  src="https://i.pinimg.com/originals/59/22/20/5922208e18658f5e83b6ad801b895f71.gif"
                  alt="Loading ..."
                />
              )}
              <input
                className="w-full rounded-md p-2 invalid:border-red-400 border border-gray-300"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
              />

              <input
                className="w-full rounded-md p-2 invalid:border-red-400 border border-gray-300"
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
              />

              <button
                disabled={isLoading}
                className="rounded-md bg-gray-200 p-2 w-1/2 justify-center cursor-pointer"
              >
                Login
              </button>

              <Link
                className="text-white block mt-8 underline"
                to={redirect ? `/register?redirect?${redirect}` : "/register"}
              >
                Don't have account? Register here
              </Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
