import React, { useEffect, useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./style2.css";
import { useGetBlogMutation } from "../../services/api's/common/userAccountApi";
import Skeleton from "../skeleton/Skeleton";
const BlogListing = () => {
  const nav = useNavigate();
  const [getBlog, Loading] = useGetBlogMutation();
  const [allBlog, setAllBlog] = useState([]);
  const { isLoading } = Loading;
  const getAllBlog = async () => {
    let result = await getBlog();
    setAllBlog(result?.data);
  };
  useEffect(() => {
    getAllBlog();
  }, []);
  function calculateTimeToRead(text) {
    const WPM = 200;
    const wordCount = text.split(/\s+/).length;
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
    <div className="w-screen overflow-x-hidden overflow-y-auto p-5 font-popins">
      {/* TITLE  */}
      <div className="flex gap-4 items-center mb-10">
        <div className="w-[1rem] h-[2rem] bg-[#034694]"></div>
        <h1 className="text-lg font-popins">Our Blogs</h1>
      </div>

      {isLoading ? (
        <Skeleton />
      ) : (
        <div className="flex justify-center items-center">
          <div className={`product mb-[5rem] sm:mb-0`}>
            {allBlog?.map((item, index) => {
              return (
                <div
                  onClick={() => nav(`/blog/${item._id}`)}
                  key={index + 1}
                  style={{ border: "1px solid #ebeaea" }}
                  className={`cursor-pointer h-[24rem] bg-white relative rounded-lg shadow-productShadow`}
                >
                  {/* BLOG IMAGE  */}
                  <div>
                    <img
                      src={item?.image}
                      alt=""
                      className="h-[10rem] w-[100%] bg-cover rounded-tr-md rounded-tl-md"
                    />
                  </div>

                  {/* bg-[#E6F1FD] */}

                  {/* TOPIC  */}
                  <div className="w-[100%] h-[2.3rem] flex justify-between items-center">
                    {/* <p className="text-sm text-gray-500 ml-2">{item?.title}</p> */}
                    <p className="text-sm text-gray-500 ml-2">
                      {calculateTimeToRead(item?.description)} min read
                    </p>

                    {/* <p className="text-sm text-gray-500 mr-2">
                      {calculateTimeToRead(item?.description)} min read
                    </p> */}
                  </div>

                  {/* TITLE DESCRIPTION  */}
                  <div className="ml-2">
                    <h1>{item?.title}</h1>
                    <p className="text-sm text-gray-500 mr-2 mt-2 w-[90%] overflow-x-hidden truncate">
                      {item?.description}
                    </p>
                  </div>

                  {/* READ MORE  */}

                  <div className="flex justify-between items-center ml-2 mt-2">
                    <p className="text-sm text-gray-500">
                      {formatDate(item?.createdAt)}
                    </p>
                    <div
                      className="flex gap-x-2 items-center mr-2 text-[#5898db]"
                      onClick={() => nav("/blog/1")}
                    >
                      <p className="text-sm">Read full</p>
                      <FaLongArrowAltRight />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogListing;
