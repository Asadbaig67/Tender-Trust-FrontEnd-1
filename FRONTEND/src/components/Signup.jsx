import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useStateContext } from "../contexts/ContextProvider";
import { signUpUser } from "../Toolkit/Slices/authUserSlice";
import { Link } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
import { setRegisterLoading, setStatus } from "../Toolkit/Slices/authUserSlice";
import axios from "axios";

const Signup = () => {
  const dispatch = useDispatch();
  const { currentColor } = useStateContext();

  const loading = useSelector((state) => state.user.registerLoading);
  const error = useSelector((state) => state.user.error);
  const status = useSelector((state) => state.user.status);

  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handledataChange = (e) => {
    setSignUpData({ ...signUpData, [e.target.name]: e.target.value });
  };
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      dispatch(signUpUser(signUpData));
    } catch (error) {
      console.error("An error occurred: " + error.message);
    }
  };

  useEffect(() => {
    dispatch(setStatus("idle"));
  }, []);

  return (
    <section class="flex flex-col md:flex-row items-center">
      <div class="bg-indigo-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
        <img
          src="https://source.unsplash.com/random"
          alt=""
          class="w-full h-full object-cover"
        />
      </div>
      <div
        class="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
        flex items-center justify-center"
      >
        <div class="w-full h-100">
          {status === "succeeded" && (
            <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
              Verification email sent to your email.
            </Alert>
          )}
          <h1 class="text-xl md:text-2xl font-bold leading-tight mt-12">
            Sign-up to create your account
          </h1>

          <form class="mt-6">
            <div>
              <label class="block text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter Name"
                onChange={handledataChange}
                class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                autofocus
                autocomplete
                required
              />
            </div>
            <div className="mt-4">
              <label class="block text-gray-700">Email Address</label>
              <input
                type="email"
                name="email"
                onChange={handledataChange}
                placeholder="Enter Email Address"
                class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                autofocus
                autocomplete
                required
              />
            </div>

            <div class="mt-4">
              <label class="block text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                onChange={handledataChange}
                placeholder="Enter Password"
                minlength="6"
                class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
                focus:bg-white focus:outline-none"
                required
              />
            </div>

            <div class="text-right mt-2">
              <a
                href="#"
                class="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700"
              >
                Forgot Password?
              </a>
            </div>

            {/* <button
              type="submit"
              class="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg
              px-4 py-3 mt-6"
              onClick={handleSignUp}
              style={{ backgroundColor: currentColor }}
            >
              Create Account
            </button> */}
            <div className="mt-3">
              <LoadingButton
                onClick={handleSignUp}
                loading={loading}
                className="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 font-semibold rounded-lg
              px-4 py-3"
                // loadingIndicator="Logging in…"
                style={{ backgroundColor: currentColor }}
              >
                <span className={` ${!loading ? "text-white" : ""}`}>
                  Create Account
                </span>
              </LoadingButton>
            </div>
            <div className="mt-2">
              {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
            </div>
          </form>

          <hr class="my-6 border-gray-300 w-full" />

          <p class="mt-8">
            Alreadt have account?{" "}
            <Link
              to="/login"
              class="text-blue-500 hover:text-blue-700 font-semibold"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Signup;
