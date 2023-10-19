import React from "react";
import { IoIosMore } from "react-icons/io";

import { useStateContext } from "../contexts/ContextProvider";
import Button from "./Button";
import product9 from "../data/product9.jpg";

const Tender = ({ title, author, description }) => {
  const { currentColor, currentMode } = useStateContext();
  return (
    <div className="w-auto mx-3 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6 m-3">
      <div className="flex justify-between">
        <p className="text-xl font-semibold">Tender</p>
        <button type="button" className="text-xl font-semibold text-gray-500">
          <IoIosMore />
        </button>
      </div>
      <div className="mt-10">
        {/* <img className="md:w-96 h-50 " src={product9} alt="" /> */}
        <div className="mt-8">
          <p className="font-semibold text-lg">{title}</p>
          <p className="text-gray-400 ">{author}</p>
          <p className="mt-8 text-sm text-gray-400">{description}</p>
          <div className="mt-3">
            <Button
              color="white"
              bgColor={currentColor}
              text="Read More"
              borderRadius="10px"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tender;
