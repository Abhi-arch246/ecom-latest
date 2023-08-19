import { Link, useNavigate, useLocation } from "react-router-dom";
import { useRegisterMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const redirect = searchParams.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const registerHandler = async (e) => {
    e.preventDefault();
    if (password === cpassword) {
      try {
        const res = await register({ name, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
      } catch (error) {
        alert(error.data);
      }
    } else {
      alert("Passwords doesn't match");
    }
  };

  return (
    <>
      <div className="flex justify-center items-center mt-12">
        <form>
          <div className="bg-slate-600 rounded-3xl max-w-md p-12">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white mb-4">
                Register here for account
              </h2>

              <input
                className="w-full rounded-md p-2 invalid:border-red-400 border border-gray-300"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter name"
              />

              <input
                className="w-full rounded-md p-2 invalid:border-red-400 border border-gray-300"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
              />

              <input
                className="w-full rounded-md p-2 invalid:border-red-400 border border-gray-300"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
              />

              <input
                className="w-full rounded-md p-2 invalid:border-red-400 border border-gray-300"
                type="password"
                value={cpassword}
                onChange={(e) => setCpassword(e.target.value)}
                placeholder="Enter confirm password"
              />

              <button
                onClick={registerHandler}
                disabled={isLoading}
                className="rounded-md bg-gray-200 p-2 w-1/2 justify-center cursor-pointer"
                type="button"
              >
                Register
              </button>
              {isLoading && (
                <img
                  className="mx-auto"
                  width="450px"
                  src="https://i.pinimg.com/originals/59/22/20/5922208e18658f5e83b6ad801b895f71.gif"
                  alt="Loading ..."
                />
              )}
              <Link
                className="text-white block mt-8 underline"
                to={redirect ? `/login?redirect?${redirect}` : "/login"}
              >
                Already have an account? Login here
              </Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Register;
