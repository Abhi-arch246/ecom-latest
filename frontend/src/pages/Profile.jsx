import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

function Profile() {
  const naviagte = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const [email, setEmail] = useState(userInfo.email || "");
  const [name, setName] = useState(userInfo.name || "");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");

  const [logoutApiCall, { isLoading }] = useLogoutMutation();
  const logoutHandle = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      naviagte("/login");
    } catch (error) {
      alert("Something went wrong");
    }
  };

  const updateHandler = () => {};
  return (
    <div className="container p-4">
      <div className="float-right m-6">
        <Link to="/myorders" className="hover:underline m-6">
          My Orders
        </Link>
        <button
          onClick={logoutHandle}
          className="bg-red-500 p-2 rounded-md text-white"
        >
          Logout
        </button>
      </div>
      <form>
        <div className="bg-slate-600 rounded-3xl max-w-md p-12">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-4">
              Profile Details
            </h2>

            <input
              className="w-full rounded-md p-2 invalid:border-red-400 border border-gray-300"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name"
              required
            />

            <input
              className="w-full rounded-md p-2 invalid:border-red-400 border border-gray-300"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              required
            />

            <input
              className="w-full rounded-md p-2 invalid:border-red-400 border border-gray-300"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Enter current password"
              required
            />

            <input
              className="w-full rounded-md p-2 invalid:border-red-400 border border-gray-300"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
              required
            />

            <input
              className="w-full rounded-md p-2 invalid:border-red-400 border border-gray-300"
              type="password"
              value={cpassword}
              onChange={(e) => setCpassword(e.target.value)}
              placeholder="Enter confirm new password"
              required
            />

            <button
              onClick={updateHandler}
              disabled={isLoading}
              className="rounded-md bg-gray-200 p-2 w-1/2 justify-center cursor-pointer"
              type="button"
            >
              Update
            </button>
            {isLoading && (
              <img
                className="mx-auto"
                width="450px"
                src="https://i.pinimg.com/originals/59/22/20/5922208e18658f5e83b6ad801b895f71.gif"
                alt="Loading ..."
              />
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

export default Profile;
