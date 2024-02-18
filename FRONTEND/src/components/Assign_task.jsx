import React from "react";
import { IoIosMore } from "react-icons/io";

import { useStateContext } from "../contexts/ContextProvider";
import Button from "./Button";
import product9 from "../data/product9.jpg";
import axios from "axios";
import { useEffect, useState } from "react";

const Assign_task = () => {
  const { currentColor, currentMode } = useStateContext();

  const [tenders, setTenders] = useState([]);

  const GetTenders = async () => {
    // e.preventDefault();
    try {
      // const url = "http://localhost:5000/viewAllTenders";
      const url = "http://localhost:5000/getAllTenders";

      const response = await axios.get(url);

      if (response.status === 200) {
        const responseData = response.data;
        // Handle the responseData as needed
        console.log(responseData);
        setTenders(responseData.tenders);
      } else {
        alert("Task cannot be added");
      }
    } catch (error) {
      // Handle errors here
      console.error("There was a problem with the axios request:", error);
    } finally {
      console.log("finally");
    }
  };

  useEffect(() => {
    GetTenders();
  }, []);

  return (
    <>
      <div className="flex flex-wrap">
        {tenders &&
          tenders.map((item, index) => (
            <div
              key={index}
              className="w-full sm:w-full md:w-1/2 lg:w-1/3 xl:w-1/3 p-3"
            >
              <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6">
                <div className="flex my-1 justify-between">
                  <p className="text-xl font-semibold">
                    Contractor Name : <span className="">{item.name}</span>
                  </p>
                </div>
                <div className="">
                  <p className="font-semibold my-1 text-lg">
                    No Of Bids : <span>5</span>
                  </p>
                  <p className="font-semibold my-1 text-lg">
                    Tender Description :{" "}
                  </p>
                  <p className="mt-3 text-sm text-gray-400">
                    {item.description}
                  </p>
                  <div className="mt-3 text-center">
                    {/* You can customize the Button component as needed */}
                    <Button
                      color="white"
                      bgColor={currentColor}
                      text="Assign Tender"
                      borderRadius="10px"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default Assign_task;
