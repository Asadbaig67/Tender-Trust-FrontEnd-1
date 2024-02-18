import React from "react";
import { IoIosMore } from "react-icons/io";

import { useStateContext } from "../contexts/ContextProvider";
import Button from "./Button";
import product9 from "../data/product9.jpg";
import axios from "axios";
import { useEffect, useState } from "react";

const Bid = () => {
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
      {tenders &&
        tenders.map((item, index) => (
          <div
            className="w-400 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6 m-3"
            key={index}
          >
            <div className="flex justify-between">
              <p className="text-xl font-semibold">Tender</p>
              <button
                type="button"
                className="text-xl font-semibold text-gray-500"
              >
                <IoIosMore />
              </button>
            </div>
            <div className="mt-10">
              {/* <img className="md:w-96 h-50 " src={product9} alt="" /> */}
              <div className="mt-8">
                <p className="font-semibold text-lg">{item.name}</p>
                <p className="text-gray-400 ">By {item.contract_title}</p>
                <p className="mt-8 text-sm text-gray-400">{item.description}</p>
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
        ))}
    </>
  );
};

export default Bid;
