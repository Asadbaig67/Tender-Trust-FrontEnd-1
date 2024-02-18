import React from "react";
import { TendersData } from "../data/dummy";
import Tender from "../components/Tender";

const Public_tenders = () => {
  return (
    <>
      <div className="">
        <h3 className="bg-white inline text-black font-bold p-3 mt-[170px] rounded-lg">
          Found {TendersData.length} Tenders
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {TendersData.map((item, index) => {
            return (
              <Tender
                key={index}
                title={item.title}
                author={item.author}
                description={item.description}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Public_tenders;
