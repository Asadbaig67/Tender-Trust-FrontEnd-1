import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../Toolkit/Slices/authUserSlice";
import { useStateContext } from "../contexts/ContextProvider";
import { loginUser } from "../Toolkit/Slices/authUserSlice";
import LoadingButton from "@mui/lab/LoadingButton";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import SaveIcon from "@mui/icons-material/Save";
import SendIcon from "@mui/icons-material/Send";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { setpublic } from "../Toolkit/Slices/booleanSlice";

const Login = () => {
  const { currentColor } = useStateContext();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const [loading, setLoading] = useState(false);
  // function handleClick() {
  //   setLoading(true);
  // }

  const authUser = useSelector((state) => state.user.authUser);
  const loading = useSelector((state) => state.user.loginLoading);
  const error = useSelector((state) => state.user.error);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // dispatch(setLoginLoading(true));
    try {
      dispatch(loginUser(loginData));
    } catch (error) {
      console.error("An error occurred: " + error.message);
    }
  };

  useEffect(() => {
    if (authUser && authUser.user.role === "Contractor") {
      navigate("/contractor/alltenders");
      dispatch(setpublic(false));
    } else if (authUser && authUser.user.role === "GovOfficial") {
      navigate("/govofficial/alltenders");
      dispatch(setpublic(false));
    }
  }, [authUser]);

  return (
    <section className="flex flex-col md:flex-row items-center">
      <div className="bg-indigo-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
        <img
          src="https://source.unsplash.com/random"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div
        className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
        flex items-center justify-center"
      >
        <div className="w-full h-100">
          <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12">
            Log in to your account
          </h1>

          <form className="mt-6" action="#" method="POST">
            <div>
              <label className="block text-gray-700">Email Address</label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                placeholder="Enter Email Address"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                autofocus
                autocomplete
                required
              />
            </div>

            <div className="mt-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                placeholder="Enter Password"
                minlength="6"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
                focus:bg-white focus:outline-none"
                required
              />
            </div>

            <div className="text-right mt-2">
              <a
                href="#"
                className="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700"
              >
                Forgot Password?
              </a>
            </div>

            <div className="mt-3">
              <LoadingButton
                onClick={handleSubmit}
                loading={loading}
                className="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 font-semibold rounded-lg
              px-4 py-3"
                // loadingIndicator="Logging in…"
                style={{ backgroundColor: currentColor }}
              >
                <span className={` ${!loading ? "text-white" : ""}`}>
                  Login
                </span>
              </LoadingButton>
            </div>
            <div className="mt-2">
              {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
            </div>
          </form>

          <hr className="my-6 border-gray-300 w-full" />

          <p className="mt-8">
            Need an account?{" "}
            <Link
              to="/signup"
              className="text-blue-500 hover:text-blue-700 font-semibold"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
