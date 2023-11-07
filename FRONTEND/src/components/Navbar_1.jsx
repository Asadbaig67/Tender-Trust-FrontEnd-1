import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SiShopware } from "react-icons/si";
import { Button } from "@mui/material";

const Navbar_1 = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <nav className="container p-3 mx-auto lg:flex lg:justify-between lg:items-center">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="items-center gap-3 ml-3 flex text-xl font-extrabold tracking-tight dark:text-white"
          >
            <SiShopware className="text-black" />{" "}
            <span className="text-black">Tender Trust</span>
          </Link>

          <div className="flex lg:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
              aria-label="toggle menu"
            >
              {!isOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 8h16M4 16h16"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        <div
          className={`${
            isOpen ? "translate-x-0 opacity-100" : "opacity-0 -translate-x-full"
          } absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white shadow-md lg:bg-transparent lg:dark:bg-transparent lg:shadow-none dark:bg-gray-900 lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center`}
        >
          <div className="flex flex-col space-y-4 lg:mt-0 lg:flex-row lg:-px-8 lg:space-y-0">
            <Link to="/">
              <a className="transition-colors duration-300 transform lg:mx-8 dark:hover:text-black hover:text-black border-b-2 border-transparent hover:border-black transition-all duration-300 ease-in-out">
                Home
              </a>
            </Link>

            <Link to="/tenders">
              <a className="lg:mx-8 dark:hover:text-black hover:text-black border-b-2 border-transparent hover:border-black transition-all duration-300 ease-in-out">
                Tenders
              </a>
            </Link>
            <Link to="/insights">
              <a className="lg:mx-8 dark:hover:text-black hover:text-black border-b-2 border-transparent hover:border-black transition-all duration-300 ease-in-out">
                Tender Insights
              </a>
            </Link>

            <Link to="/status">
              <a className="lg:mx-8 dark:hover:text-black hover:text-black border-b-2 border-transparent hover:border-black transition-all duration-300 ease-in-out">
                Tender Status
              </a>
            </Link>
          </div>

          <Link to="/login" className="mx-2">
            <Button variant="outlined">Login</Button>
          </Link>
          <Link to="/signup" className="mx-2">
            <Button variant="contained">Register</Button>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar_1;
