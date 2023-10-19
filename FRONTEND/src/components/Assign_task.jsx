import React from "react";
import { IoIosMore } from "react-icons/io";

import { useStateContext } from "../contexts/ContextProvider";
import Button from "./Button";
import product9 from "../data/product9.jpg";

const Assign_task = () => {
  const { currentColor, currentMode } = useStateContext();
  return (
    <>
      <div className="w-400 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6 m-3">
        <div className="flex my-1 justify-between">
          <p className="text-xl font-semibold">
            Contractor Name : <span className="">Asadulhaq</span>
          </p>
        </div>
        <div className="">
          <p className="font-semibold my-1 text-lg">
            No Of Bids : <span>5</span>
          </p>
          <p className="font-semibold my-1 text-lg">Tender Description : </p>
          <p className="mt-3 text-sm text-gray-400">
            This will be the small description for the news you have shown here.
            There could be some great info. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Soluta, adipisci sequi?Lorem ipsum
            dolor, sit amet consectetur adipisicing elit. Necessitatibus,
            dolorem.
          </p>
          <div className="mt-3 text-center">
            <Button
              color="white"
              bgColor={currentColor}
              text="Assign Tender"
              borderRadius="10px"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Assign_task;
