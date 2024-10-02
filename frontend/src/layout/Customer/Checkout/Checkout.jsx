/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { accountScreensColor } from "../../../constant/color";
import { jwtDecodeFunction } from "../../../helper/jwt";
import axios from "axios";
import { base_url } from "../../../services/api's/base_url";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { clear } from "../../../services/store/slices/cart";
// import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  CardElement,
} from "@stripe/react-stripe-js";
const Checkout = () => {
  const products = useSelector((state) => state.cart);
  console.log("products", products);
  const [isOnlinePayment, setIsOnlinePayment] = useState(false);
  const [orderData, setOrderData] = useState({
    order_by: jwtDecodeFunction().payload._id,
    address: "",
    country: "",
    city: "",
  });
  const nav = useNavigate();
  const dispatch = useDispatch();
  const onChangeInput = (e) => {
    setOrderData({ ...orderData, [e.target.name]: e.target.value });
  };

  // var totalAmount = products.reduce(
  //   (acc, product) => acc + product.price * product.quantity,
  //   0
  // );

  var totalAmount = products
    .reduce((acc, product) => {
      const discount = product.discount || 0; // Assuming discount is a percentage and defaults to 0 if not provided
      const discountedPricePerItem =
        product.price - product.price * (discount / 100);
      return acc + discountedPricePerItem * product.quantity;
    }, 0)
    .toFixed(2);

  console.log("totalAmount", totalAmount);
  const onSubmit = (e, payment_method) => {
    e.preventDefault();
    console.log("products", products);
    const items = products.map((product) => ({
      product: product._id,
      quantity: product.quantity,
      price: product.price * product.quantity,
    }));
    if (
      orderData.address !== "" &&
      orderData.city != "" &&
      orderData.country !== ""
    ) {
      if (jwtDecodeFunction().payload._id) {
        let updatedBody = {
          ...orderData,
          items: items,
          quantity: products.length,
          seller_id: products[0].seller_id?._id,
          totalAmount: totalAmount,
          status: "Pending",
          paymentMethod:
            payment_method !== "" ? payment_method : "Cash On Delivery",
        };
        axios
          .post(`${base_url}/buyer/order/create`, updatedBody)
          .then((res) => {
            console.log(res.data, "create order response");
          });
        toast.success("order created");
        dispatch(clear());
        nav("/history");
      } else {
        nav("/account");
      }
    } else {
      toast.error("Address , City , Country is Required");
    }
  };

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();

    if (
      orderData.address !== "" &&
      orderData.city != "" &&
      orderData.country !== ""
    ) {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        // card: elements.getElement(CardElement),
        card: elements.getElement(CardNumberElement),
      });

      if (!error) {
        try {
          const { id } = paymentMethod;
          const response = await axios.post(
            `${base_url}/stripe/payment/create`,
            {
              amount: totalAmount, // Amount in cents
            }
          );
          console.log(response.data);
          const clientSecret = response.data.clientSecret;

          // const clientSecret = "pi_3POf2TIm76tKZYsv3p78h0bA_secret_DRhaaCGfwy4D6TDzhH9P40TGP";

          const confirmPayment = await stripe.confirmCardPayment(clientSecret, {
            payment_method: id,
          });
          console.log("confirmPayment", confirmPayment);
          if (confirmPayment.paymentIntent.status === "succeeded") {
            console.log("Payment Successful");
            onSubmit(event, "Online");
            setSuccess(true);
            setLoading(false);
          }
        } catch (error) {
          setError(error);
          toast.error(error.message);
          console.log("Error", error);
          setLoading(false);
        }
      } else {
        toast.error(error.message);
        console.log("Error", error);
        setLoading(false);
      }
    } else {
      toast.error("Address , City , Country is Required");
      setLoading(false);
    }
  };

  return (
    <div className="px-6">
      <h1 className="text-2xl text-center font-bold mt-2 font-popins">
        CHECKOUT
      </h1>

      <div className="flex justify-center md:justify-between items- w-[100%] gap-6 mt-5 md:flex-row flex-col">
        <div className="w-[100%] md:w-[40%]">
          <div className="w-[100%] p-3 rounded-md shadow-otpShadow mb-4">
            <h1 className=" font-bold">Shipping Address</h1>
            <p className="mt-2">Street Address*</p>
            <input
              name="address"
              required
              onChange={(e) => {
                onChangeInput(e);
              }}
              type="text"
              className="mt-2 outline-none border border-gray-200 px-3 rounded-md w-[100%] h-[2.2rem]"
              placeholder="Shipping Address"
            />
            <p className="mt-2">Country*</p>
            <input
              name="country"
              required
              onChange={(e) => {
                onChangeInput(e);
              }}
              type="text"
              className="mt-2 outline-none border border-gray-200 px-3 rounded-md w-[100%] h-[2.2rem]"
              placeholder="Shipping Country"
            />
            <p className="mt-2">City*</p>
            <input
              name="city"
              required
              onChange={(e) => {
                onChangeInput(e);
              }}
              type="text"
              className="mt-2 outline-none border border-gray-200 px-3 rounded-md w-[100%] h-[2.2rem]"
              placeholder="Shipping City"
            />
          </div>

          <div className="w-[100%] p-3 rounded-md shadow-otpShadow mb-4">
            <h1 className=" font-bold mt-2 mb-2">Payment Method</h1>
            {!isOnlinePayment && (
              <div className="flex justify-between">
                <button
                  onClick={(e) => onSubmit(e, "")}
                  className={`w-[48%] h-[2.2rem] bg-[${accountScreensColor.buttonBg}] shadow-otpShadow text-white rounded-md`}
                >
                  Cash On Delivery
                </button>
                <button
                  onClick={() => setIsOnlinePayment(true)}
                  className={`w-[48%] h-[2.2rem] bg-[${accountScreensColor.buttonBg}] shadow-otpShadow text-white rounded-md`}
                >
                  Pay By Card
                </button>
              </div>
            )}
            {/* <p className="text-center mt-2 font-semibold">--- Or ---</p> */}
            {/* <p className="mt-2">Card Number*</p>
            <input
              name="card"
              type="text"
              className="mt-2 outline-none border border-gray-200 px-3 rounded-md w-[100%] h-[2.2rem]"
              placeholder="Card Number"
            />

            <div className="flex items-center gap-x-4">
              <div className="flex-1">
                <p className="mt-2">Expiration date*</p>
                <input
                  name="expire"
                  type="date"
                  className="mt-2 outline-none border border-gray-200 px-3 rounded-md w-[100%] h-[2.2rem]"
                  placeholder="Expiration Date"
                />
              </div>
              <div className="flex-1">
                <p className="mt-2">CVC*</p>
                <input
                  name="cvc"
                  type="number"
                  className="mt-2 outline-none border border-gray-200 px-3 rounded-md w-[100%] h-[2.2rem]"
                  placeholder="CVC"
                />
              </div>
            </div> */}

            {
              isOnlinePayment ? (
                !success ? (
                  <form onSubmit={handleSubmit} className="w-full">
                    <div className="mt-4">
                      <p>Card Number*</p>
                      <div className="mt-2 outline-none border border-gray-200 px-3 rounded-md w-full h-[2.2rem] flex items-center">
                        <CardNumberElement
                          className="w-full"
                          options={{ style: { base: { fontSize: "16px" } } }}
                        />
                      </div>
                    </div>

                    <div className="flex gap-x-4 mt-4">
                      <div className="flex-1">
                        <p className="mt-2">Expiration date*</p>
                        <div className="mt-2 outline-none border border-gray-200 px-3 rounded-md w-full h-[2.2rem] flex items-center">
                          <CardExpiryElement
                            className="w-full"
                            options={{ style: { base: { fontSize: "16px" } } }}
                          />
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="mt-2">CVC*</p>
                        <div className="mt-2 outline-none border border-gray-200 px-3 rounded-md w-full h-[2.2rem] flex items-center">
                          <CardCvcElement
                            className="w-full"
                            options={{ style: { base: { fontSize: "16px" } } }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between mt-4">
                      <button
                        onClick={() => setIsOnlinePayment(false)}
                        className={`w-[48%] h-[2.2rem] bg-[${accountScreensColor.buttonBg}] shadow-otpShadow text-white rounded-md`}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={!stripe}
                        className={`w-[48%] h-[2.2rem] bg-[${accountScreensColor.buttonBg}] shadow-otpShadow text-white rounded-md`}
                        // className="w-full mt-4 h-9 bg-blue-500 shadow-md text-white rounded-md"
                      >
                        {loading ? "Loading..." : "Pay"}
                      </button>
                    </div>
                  </form>
                ) : (
                  <div>
                    <h2>Payment Successful!</h2>
                  </div>
                )
              ) : null
              // (
              //   <div>
              //     {/* Block to be shown when isOnlinePayment is false */}
              //     <h2>Offline Payment Block</h2>
              //   </div>
              // )
            }

            {/* <form onSubmit={handleSubmit}>
                <fieldset className="FormGroup">
                  <div className="FormRow">
                    <CardElement />
                  </div>
                </fieldset>
                <button
                  type="submit"
                  disabled={!stripe}
                  className={`w-[100%] mt-2 h-[2.2rem] bg-[${accountScreensColor.buttonBg}] shadow-otpShadow text-white rounded-md`}
                >
                  Pay

                </button>
              </form> */}

            {/* <button
              onClick={handleSubmit}
              disabled={!stripe}
              className={`w-[100%] mt-2 h-[2.2rem] bg-[${accountScreensColor.buttonBg}] shadow-otpShadow text-white rounded-md`}
            >
              Confirm Order

            </button>
            {error && <div style={{ color: "red" }}>{error}</div>}
            {success && <div style={{ color: "green" }}>{success}</div>} */}
          </div>
        </div>

        <div className="w-[100%] md:w-[35%] md:mb-0 sm:mb-4 mb-[6rem] ">
          <div className="w-[100%] border  border-gray-200 p-3 rounded-md shadow-otpShadow">
            <h1 className="font-bold">Order Summary</h1>
            <div>
              {products?.map((item, index) => {
                return (
                  <div key={index}>
                    <div className="mt-4 flex justify-between items-center">
                      {/* IMAGE AND TITLE  */}
                      <div className="flex sm:gap-x-3 gap-x-3 items-center w-[20rem] overflow-x-auto">
                        <img
                          src={item?.images[0]}
                          alt=""
                          className="sm:w-[5rem] w-[2.5rem] sm:h-[5rem] h-[2.5rem] rounded-md"
                        />
                        <div className="flex flex-col w-[20rem]">
                          <p className="font-bold text-lg tracking-wide text-slate-600 text-nowrap truncate">
                            {item?.title}
                          </p>
                          <p className="block sm:text-base text-xs tracking-wide text-slate-600 text-nowrap truncate">
                            {item?.description}
                          </p>
                        </div>
                      </div>

                      {/* PRICE  */}
                      {/* <div>
                        <p className="sm:text-base text-sm">
                          Rs {item?.price * item?.quantity} × {item?.quantity}
                        </p>
                      </div> */}

                      <div>
                        {(() => {
                          const discount = item?.discount || 0; // Assuming discount is a percentage and defaults to 0 if not provided
                          const discountedPricePerItem =
                            item?.price - item?.price * (discount / 100);
                          const totalDiscountedPrice =
                            discountedPricePerItem * item?.quantity;

                          return (
                            <p className="sm:text-base text-sm">
                              Rs {totalDiscountedPrice.toFixed(2)} ×{" "}
                              {item?.quantity}
                            </p>
                          );
                        })()}
                      </div>
                    </div>
                    <div className="w-[100%] h-[1px] mt-2 mb-2 bg-gray-200 font-popins "></div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-between items-center">
              <h1 className="font-bold">Sub Total</h1>
              <p className="sm:text-base text-sm">
                Rs{" "}
                {/* {products?.reduce(
                  (total, item) => total + item.price * item.quantity,
                  0
                )} */}
                {products
                  ?.reduce((total, item) => {
                    const discount = item.discount || 0; // Assuming discount is a percentage and defaults to 0 if not provided
                    const discountedPricePerItem =
                      item.price - item.price * (discount / 100);
                    return total + discountedPricePerItem * item.quantity;
                  }, 0)
                  .toFixed(2)}
              </p>
            </div>

            <div className="w-[100%] h-[1px] mt-2 mb-2 bg-gray-200 font-popins "></div>

            <div className="flex justify-between items-center">
              <h1 className="font-bold">Total</h1>
              {/* <p className="sm:text-base text-sm">
                Rs{" "}
                {products?.reduce(
                  (total, item) => total + item.price * item.quantity,
                  0
                )}
              </p> */}
              {products
                ?.reduce((total, item) => {
                  const discount = item.discount || 0; // Assuming discount is a percentage and defaults to 0 if not provided
                  const discountedPricePerItem =
                    item.price - item.price * (discount / 100);
                  return total + discountedPricePerItem * item.quantity;
                }, 0)
                .toFixed(2)}
            </div>
          </div>
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={2500}
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

export default Checkout;
