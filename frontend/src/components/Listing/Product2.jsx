import React from "react";
import Button from "../button/Button";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AiFillEye } from "react-icons/ai";
import "./style.css";
import Skeleton from "../skeleton/Skeleton";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../../services/store/slices/cart";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Product2 = ({ title, isMargin, data, Loading }) => {
  const products = useSelector((state) => state.cart);

  const { isLoading } = Loading;

  const arr = [1, 2, 3, 4, 5];
  const nav = useNavigate();

  const dispatch = useDispatch();
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

  return (
    <div className="p-5 mt-10 -z-50">
      {/* TITLE  */}
      <div className="flex gap-4 items-center mb-10">
        <div className="w-[1rem] h-[2rem] bg-[#034694]"></div>
        <h1 className="text-lg font-popins">{title}</h1>
      </div>

      {/* MAIN LISTING  */}
      {isLoading ? (
        <Skeleton />
      ) : (
        <div className="flex justify-center items-center">
          <div className={`product ${isMargin ? "mb-[5rem]" : null} sm:mb-0`}>
            {data?.map((item, index) => {
              return (
                <div
                  key={index + 1}
                  style={{ border: "1px solid #ebeaea" }}
                  className={`cursor-pointer h-[26.3rem] overflow-y-hidden bg-white relative rounded-lg shadow-productShadow`}
                >
                  {/* IMAGE  */}
                  <div className="flex justify-center items-center mt-0 mb-2">
                    <img
                      //   src={index % 2 === 0 ? item.images[0] : item.images[1]}
                      src={item.images[0]}
                      alt=""
                      className=" w-[100%] h-[11rem]"
                    />
                  </div>

                  {/* CART ICON  */}
                  <div
                    style={{ backgroundColor: "#72A0C1" }}
                    className=" cursor-pointer absolute top-2 right-3 w-[2rem] h-[2rem]  flex justify-center items-center rounded-full"
                  >
                    <AiFillEye
                      onClick={() => nav(`/product/${item._id}`)}
                      className="text-lg text-white"
                    />
                  </div>

                  {/* TITLE DESCRIPTION RATING */}

                  <div className="pl-2 pr-2">
                    <p className="text-lg mb-1 font-popins">{item?.title}</p>
                    <p className="custom-ellipsis text-sm text-slate-600 mb-1">
                      {item.description}
                    </p>

                    <div className="flex gap-x-2 items-center mt-2">
                      <div className="flex gap-1 items-center">
                        {arr?.map((item, index) => {
                          return (
                            <FaStar key={index} className="text-gray-700" />
                          );
                        })}
                      </div>
                      <div>
                        <p className="text-slate-600">(33)</p>
                      </div>
                    </div>
                  </div>

                  {/* PRICE  */}

                  {/* <div className='flex justify-end flex-col items-end pr-2 font-popins mt-2 mb-[3rem]'>
                                                <p className='text-xl text-slate-600 font-semibold'>Rs {item?.price}</p>
                                                {

                                                    (data?.SingleProduct?.price - (item?.price * (item?.discount / 100))) != item?.price && (
                                                        <strike className='mt-0 text-slate-500 font-popins text-sm'>Rs {item?.price}</strike>
                                                    )
                                                }
                                            </div> */}

                  <div className="flex justify-end flex-col items-end pr-2 font-popins mt-2 mb-[3rem]">
                    {(() => {
                      const discountedPrice =
                        item?.price - item?.price * (item?.discount / 100);
                      if (item?.discount > 0) {
                        return (
                          <>
                            <p className="text-xl text-slate-600 font-semibold">
                              Rs {discountedPrice.toFixed(2)}
                            </p>
                            <strike className="mt-0 text-slate-500 font-popins text-sm">
                              Rs {item?.price}
                            </strike>
                          </>
                        );
                      } else {
                        return (
                          <p className="text-xl text-slate-600 font-semibold">
                            Rs {item?.price}
                          </p>
                        );
                      }
                    })()}
                  </div>

                  {/* ADD TO CART BUTTON  */}

                  <div className="pl-2 pr-2  absolute bottom-2 w-[100%]">
                    <Button
                      onPressFunc={() => addToCart(item)}
                      text={"Add To Cart"}
                      className={
                        "w-[100%] h-[2.4rem] font-popins bg-[#3b5877] text-white rounded-md"
                      }
                    />
                  </div>
                </div>
              );
            })}
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
    </div>
  );
};

export default Product2;
