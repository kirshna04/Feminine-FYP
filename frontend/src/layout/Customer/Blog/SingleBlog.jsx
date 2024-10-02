import React from "react";
import { useLocation } from "react-router-dom";
import { useGetSingleBlogQuery } from "../../../services/api's/common/userAccountApi";

const SingleBlog = () => {
  const BlogId = useLocation().pathname.split("/")[2];
  const { data } = useGetSingleBlogQuery(BlogId);
  function calculateTimeToRead(text) {
    const WPM = 200;
    const wordCount = text?.split(/s+/).length;
    const timeToReadMinutes = Math.ceil(wordCount / WPM);
    return timeToReadMinutes;
  }
  function formatDate(dateString) {
    // Create a new Date object from the provided date string
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);
    return formattedDate;
  }

  return (
    <div className="p-5 sm:p-14 font-popins">
      {/* IMAGE  */}
      <div>
        <img
          src={data?.image}
          alt=""
          className="w-[100%] h-[30rem] rounded-md"
        />
      </div>

      {/* POSTED AND READ TIME  */}
      <div className="w-[100%] h-[2.3rem] flex justify-between items-center mt-4">
        <p className="text-sm">
          Posted:{" "}
          <span className="text-gray-500">{formatDate(data?.createdAt)}</span>
        </p>
        <p className="text-sm text-gray-500">
          {calculateTimeToRead(data?.description)} min read
        </p>
      </div>

      {/* TITLE AND DESCRIPTION  */}
      <div className="mt-3">
        <h1 className="text-2xl">{data?.title}</h1>
        <p className="text-sm text-gray-500 mt-6 leading-7">
          {data?.description}
        </p>
      </div>
    </div>
  );
};

export default SingleBlog;
