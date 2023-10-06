import React from "react";
import { IoIosMore } from "react-icons/io";

import { useStateContext } from "../contexts/ContextProvider";
import Button from "./Button";
import product9 from "../data/product9.jpg";

const Bid = () => {
  const { currentColor, currentMode } = useStateContext();
  return (
    <div className="w-400 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6 m-3">
      <div className="flex justify-between">
        <p className="text-xl font-semibold">Tender</p>
        <button type="button" className="text-xl font-semibold text-gray-500">
          <IoIosMore />
        </button>
      </div>
      <div className="mt-10">
        {/* <img className="md:w-96 h-50 " src={product9} alt="" /> */}
        <div className="mt-8">
          <p className="font-semibold text-lg">Internet Wiring in WapdaTown!</p>
          <p className="text-gray-400 ">By Afzal Khokhar MNA</p>
          <p className="mt-8 text-sm text-gray-400">
            This will be the small description for the news you have shown here.
            There could be some great info. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Soluta, adipisci sequi?
          </p>
          <div className="mt-10 text-center">
            <Button
              color="white"
              bgColor={currentColor}
              text="Bid Tender"
              borderRadius="10px"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bid;
