import React from "react";
import "../Listing/style.css";
const Skeleton = () => {
  const arr = [1, 2, 3, 4, 5];
  return (
    <div className="flex justify-center gap-x-3 items-center mt-10">
      <div className="product">
        {arr?.map((item, index) => {
          return (
            <div
              key={item + index}
              className="h-[20rem] bg-gray-100 rounded-md"
            >
              <div className="w-[100%] h-[8rem] bg-gray-200 rounded-tr-md rounded-tl-md"></div>
              <div className="w-[100%] h-[2rem] bg-gray-200  mt-2"></div>
              <div className="w-[100%] h-[9rem] bg-gray-200  mt-2 rounded-br-md rounded-bl-md"></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Skeleton;
