import React from "react";
import { Link } from "react-router-dom";

function Register() {
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
                name="text"
                placeholder="Enter name"
              />

              <input
                className="w-full rounded-md p-2 invalid:border-red-400 border border-gray-300"
                type="email"
                name="email"
                placeholder="Enter email"
              />

              <input
                className="w-full rounded-md p-2 invalid:border-red-400 border border-gray-300"
                type="password"
                name="password"
                placeholder="Enter password"
              />

              <input
                className="w-full rounded-md p-2 invalid:border-red-400 border border-gray-300"
                type="password"
                name="password"
                placeholder="Enter confirm password"
              />

              <input
                className="rounded-md bg-gray-200 p-2 w-1/2 justify-center cursor-pointer"
                type="button"
                value="Register"
              />
              <Link className="text-white block mt-8 underline" to="/login">
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
