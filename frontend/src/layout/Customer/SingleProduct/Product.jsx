import React, { useState } from "react";
import {
  AiOutlinePlus,
  AiOutlineMinus,
  AiOutlineLeft,
  AiOutlineRight,
} from "react-icons/ai";
import Button from "../../../components/button/Button";
import { useLocation } from "react-router-dom";
import { useGetSingleroductQuery } from "../../../services/api's/common/userAccountApi";
import Popup from "./Popup";
import UserImage from "../../../assets/userImage.webp";
import { AiFillStar } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { add, decrement, increment } from "../../../services/store/slices/cart";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Product = () => {
  const productId = useLocation().pathname.split("/")[2];
  const { data } = useGetSingleroductQuery(productId);
  const [currentImage, setcurrentImage] = useState(0);
  const [showImagePopup, setshowImagePopup] = useState(false);

  const forwardImage = () => {
    if (currentImage === data?.SingleProduct.images?.length - 1) {
      setcurrentImage(0);
    } else {
      setcurrentImage(currentImage + 1);
    }
  };
  const backwardImage = () => {
    if (currentImage === 0) {
      setcurrentImage(data?.SingleProduct?.images?.length - 1);
    } else {
      setcurrentImage(currentImage - 1);
    }
  };

  const arr = [1, 2, 3, 4, 5];

  const dispatch = useDispatch();
  const products = useSelector((state) => state.cart);
  let singleProduct = products?.filter((i) => {
    return i._id === productId;
  });
  console.log(singleProduct);

  const addToCart = (product) => {
    console.log(products);
    console.log(product);
    const sellerId = products.find(
      (item) => item.seller_id._id == product.seller_id._id
    );
    // console.log(sellerId);
    if (sellerId == undefined && products.length > 0) {
      toast.error("This product is not of the same seller that you selected");
    } else {
      const updatedData = { ...product, quantity: 1 };
      dispatch(add(updatedData));
      toast.success("Product Added ");
    }
  };
  const incrementQuantity = (product) => {
    singleProduct.length > 0
      ? dispatch(increment(product))
      : toast.error("Item Not Added In Cart");
  };

  const decrementQuantity = (product) => {
    singleProduct.length > 0
      ? dispatch(decrement(product))
      : toast.error("Item Not Added In Cart");
  };

  return (
    <>
      <div className="lg:flex justify-center items-start gap-[4rem] mt-10 block lg:pb-0 pb-0 md:pb-5 relative">
        {/* IMAGES  */}
        <div className="flex justify-center items-center flex-col mb-10 relative ml-5 mr-5 sm:ml-0 sm:mr-0">
          <div
            onClick={() => setshowImagePopup(true)}
            className="sm:h-[50vh] h-[100%] sm:pl-0 sm:pr-0 w-[100%] sm:w-fit flex justify-center items-center rounded-lg lg:cursor-pointer"
          >
            <img
              onClick={() => setshowImagePopup(true)}
              src={data?.SingleProduct?.images[currentImage]}
              className="h-[20rem] min-w-full w-full lg:min-w-[25rem] lg:w-[25rem] bg-cover rounded-md"
            />
          </div>

          <div className="sm:flex gap-5 items-center justify-center mt-10 hidden">
            {data?.SingleProduct?.images?.map((value, index) => {
              return (
                <img
                  onClick={() => setcurrentImage(index)}
                  key={index}
                  src={value}
                  className={`w-[4rem] cursor-pointer h-[4rem] rounded-md bg-slate-200 ${
                    index === currentImage ? "opacity-60" : null
                  } `}
                />
              );
            })}
          </div>

          {/* ICONS LEFT RIGHT */}

          <div className="w-[3rem] h-[3rem] rounded-full sm:hidden flex justify-center items-center absolute  left-[10px] top-[45%] ">
            <AiOutlineRight
              onClick={forwardImage}
              className="text-black text-6xl cursor-pointer"
            />
          </div>

          <div className="w-[3rem] h-[3rem] rounded-full sm:hidden flex justify-center items-center absolute top-[45%] right-[10px]">
            <AiOutlineLeft
              onClick={backwardImage}
              className="text-black text-6xl cursor-pointer"
            />
          </div>
        </div>

        {/* MAIN CONTENT  */}
        <div className="flex justify-center items-center flex-col pb-[7rem] md:pb-0 ml-5 mr-5 sm:ml-0 sm:mr-0">
          <div>
            {/* HEADING */}
            <div>
              <h1 className="font-popins text-2xl font-semibold">
                {data?.SingleProduct?.title}
              </h1>
            </div>

            {/* DESCRIPTION  */}

            <div className="w-[100%] sm:w-[30rem] mt-4 mb-4 font-sans text-slate-500">
              <p>{data?.SingleProduct?.description}</p>
            </div>

            {/* PRICE  */}
            <div className="font-popins">
              <h1 className="text-lg font-semibold">
                Rs{" "}
                {data?.SingleProduct?.price -
                  data?.SingleProduct?.price *
                    (data?.SingleProduct?.discount / 100)}
              </h1>
            </div>

            {/* DISCOUNTED PRICE  */}
            {data?.SingleProduct?.price -
              data?.SingleProduct?.price *
                (data?.SingleProduct?.discount / 100) !=
              data?.SingleProduct?.price && (
              <strike className="mt-2 text-slate-500 font-popins">
                Rs {data?.SingleProduct?.price}
              </strike>
            )}

            {/* ADD TO CARD QUANTITY  */}
            <div className="mt-4 flex gap-4 justify-between">
              <div className="flex bg-slate-200 items-center justify-between w-[8rem] h-[3rem] rounded-lg p-2">
                <AiOutlinePlus
                  onClick={() => incrementQuantity(data?.SingleProduct)}
                  className="text-xl cursor-pointer"
                />
                <p className=" font-popins font-bold">
                  {singleProduct.length > 0 ? singleProduct[0]?.quantity : 1}
                </p>
                <AiOutlineMinus
                  onClick={() => decrementQuantity(data?.SingleProduct)}
                  className="text-xl cursor-pointer"
                />
              </div>

              <div className="shadow-btnshadow1">
                <Button
                  onPressFunc={() => addToCart(data?.SingleProduct)}
                  text={"Add To Card"}
                  className={
                    "w-[10rem] h-[3rem] bg-[#3b5877] text-sm text-white font-popins rounded-md"
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RATINGS AND SELLER PROFILE   */}

      <div className="flex gap-x-5 justify-center md:flex-row flex-col items-start pb-10 pl-5 pr-5 font-popins mt-5">
        {/* FIRST RATING CONTAINER  */}

        <div className="flex-1 order-2 md:order-1 bg-slate-100 rounded-md p-5 h-[15rem] overflow-y-auto">
          {/* RATING HEADING AND LINE */}
          <div>
            <h1 className="font-semibold tracking-wider">Ratings</h1>
            <div className="w-[100%] h-[0.2px] bg-gray-200 mt-2 mb-2"></div>
          </div>
          {arr?.map((item, index) => {
            return (
              <div key={item + 100 + index} className="">
                {/* USER IMAGE AND RATING STAR  */}

                <div className="flex gap-x-6 items-start">
                  {/* IMAGE AND NAME  */}
                  <div className="w-[10rem]">
                    <img
                      src={UserImage}
                      alt=""
                      className="w-[4rem] h-[4rem] rounded-full"
                    />
                    <p className="mt-2">Wole Michoel</p>
                  </div>
                  {/* COMMENT AND STAR  */}
                  <div className="w-fit">
                    <div className="flex gap-x-1">
                      {arr?.map((item, index) => {
                        return (
                          <AiFillStar
                            key={item + index}
                            className="text-[darkorange]"
                          />
                        );
                      })}
                    </div>
                    <div className="mt-2">
                      <p className="lg:w-[70%] w-[100%] text-sm">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Quis repellendus quibusdam officia provident itaque
                        veniam nihil, accusamus consequatur minus quam omnis
                        harum sit ad quaerat esse similique odio. Quo, dolore.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="h-[0.1px] w-[100%] bg-gray-200 mt-4 mb-4"></div>
              </div>
            );
          })}
        </div>

        {/* SELLER INFO  */}
        <div className="md:w-[20rem] order-1 md:order-2 w-[100%] mt-7 md:mt-0 md:mb-0 mb-[5rem] h-[15rem] bg-slate-100 rounded-md p-5">
          {/* RATING HEADING AND LINE */}
          <div>
            <h1 className="font-semibold tracking-wider">Seller Details</h1>
            <div className="w-[100%] h-[0.2px] bg-gray-200 mt-2 mb-2"></div>
          </div>

          {/* SELLER IMAGE  */}
          <div className="mt-4">
            <div className="flex justify-center items-center mb-3">
              <img
                src={
                  data?.SingleProduct?.seller_id?.image
                    ? data?.SingleProduct?.seller_id?.image
                    : UserImage
                }
                alt=""
                className="w-[6rem] h-[6rem] rounded-md"
              />
            </div>
            <p className="mt-2">Name: {data?.SingleProduct?.seller_id?.name}</p>
            <p className="mt-2">
              {" "}
              From: {data?.SingleProduct?.seller_id?.city},{" "}
              {data?.SingleProduct?.seller_id?.country}
            </p>
          </div>
        </div>
      </div>

      {showImagePopup && (
        <div className=" absolute hidden md:block top-0 w-[100%] h-[100%] bg-black bg-opacity-80">
          <div className="flex justify-center items-center h-[100%]">
            <Popup
              images={data?.SingleProduct?.images}
              setshowImagePopup={setshowImagePopup}
            />
          </div>
        </div>
      )}

      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default Product;
