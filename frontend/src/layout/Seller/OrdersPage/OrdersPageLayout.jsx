/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import Input from "../../../components/input/Input";
import { GiHamburgerMenu } from "react-icons/gi";
import { SellerjwtDecodeFunction } from "../../../helper/jwt";
import { useGetSellerProfileQuery } from "../../../services/api's/common/userAccountApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { base_url } from "../../../services/api's/base_url";
import { accountScreensColor } from "../../../constant/color";
import axios from "axios";

const OrdersPageLayout = ({ setshowLeftSideBar, showLeftSideBar }) => {
  const [updateStatus, setUpdateStatus] = useState({ show: false, id: "" });
  const [serachValue, setserachValue] = useState("");
  const { data } = useGetSellerProfileQuery(
    SellerjwtDecodeFunction().payload._id
  );
  // const [productData, setProductData] = useState(second)
  const [loading, setLoading] = useState(true);
  const [orderData, setOrderData] = useState([]);
  useEffect(() => {
    (async () => {
      let result = await axios.get(
        `${base_url}/seller/get/order/all/${data._id}`
      );
      setOrderData(result.data);
      setLoading(false);
    })();
  }, []);
  const nav = useNavigate();
  const FilterData = (e) => {
    setserachValue(e.target.value);
  };
  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);
    return formattedDate;
  }

  return (
    <div className="font-popins w-[100%] h-[100vh] bg-[#fbfcfe] overflow-hidden pt-5 pl-5 pr-5 md:pl-10 md:pr-10 overflow-x-auto relative">
      <div className="flex gap-x-4 items-center">
        {!showLeftSideBar && (
          <div
            onClick={() => setshowLeftSideBar(true)}
            className="bg-[#eff3fc] min-w-[2.5rem] md:hidden min-h-[2.5rem] flex justify-center items-center rounded-md"
          >
            <GiHamburgerMenu />
          </div>
        )}
        <h1 className="text-xl font-semibold">Orders Page .</h1>
      </div>

      <div className=" block mt-2">
        <Input
          name={"searchvalue"}
          style={{ border: "1px solid lightgray" }}
          onChangeFunc={FilterData}
          placeholder={"Filter By Name"}
          className={
            "bg-[#fffff] text-sm placeholder:tracking-wider  outline-none w-[100%] h-[2.5rem] pl-3 pr-5 rounded-md"
          }
        />
      </div>

      <div className="w-[100%] h-[1px] bg-[lightgray] mt-4 mb-4"></div>
      <div className="font-popins h-[75vh] mb-4 shadow-productShadow rounded-md overflow-y-auto">
        <div className="h-[100%] rounded-md p-3 w-[100%] mb-4">
          {/* MAIN TABLE  */}
          <div className="mt-3 w-full overflow-x-scroll md:overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="">
                  <th className="pb-1 pr-4  text-start font-normal whitespace-nowrap">
                    Order Id
                  </th>
                  <th className="pb-1 pl-4 pr-4 text-start font-normal whitespace-nowrap">
                    Total Item
                  </th>
                  <th className="pb-1 pl-4 pr-4 text-start font-normal whitespace-nowrap">
                    Order Date
                  </th>
                  <th className="py-2 pl-4 pr-4 text-start font-normal whitespace-nowrap">
                    Order Amount
                  </th>
                  <th className="py-2 pl-4 pr-4 text-start font-normal whitespace-nowrap">
                    Payment Method
                  </th>
                  <th className="text-start text-sm pl-4 pr-4 font-normal whitespace-nowrap">
                    Delivery Address
                  </th>
                  <th className="text-start text-sm pl-4 pr-4 font-normal whitespace-nowrap">
                    Status
                  </th>
                  <th className="text-start text-sm pl-4 pr-4 font-normal whitespace-nowrap">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {!loading ? (
                  orderData.length === 0 ? (
                    <tr className="w-[100%] text-xl text-center h-[50vh] ">
                      <td colSpan={8} className="">
                        No Orders Found
                      </td>
                    </tr>
                  ) : (
                    orderData
                      ?.filter((value) => {
                        return value?._id
                          ?.toLowerCase()
                          .includes(serachValue.toLowerCase());
                      })
                      ?.map((item, index) => {
                        return (
                          <tr
                            key={index}
                            onClick={() => {
                              nav("/order-summary", { state: item });
                            }}
                            className="cursor-pointer"
                          >
                            <td className="pr-4 pt-4 pb-4 text-sm whitespace-nowrap">
                              {item?._id}
                            </td>
                            <td className="pl-4 pr-4 pt-4 pb-4 text-sm whitespace-nowrap">
                              {item?.quantity}
                            </td>
                            <td className="pl-4 pr-4 pt-4 pb-4 text-sm whitespace-nowrap">
                              {formatDate(item?.createdAt)}
                            </td>
                            <td className="pl-4 pr-4 pt-4 pb-4 text-sm whitespace-nowrap">
                              {item?.totalAmount}
                            </td>
                            <td className="pl-4 pr-4 pt-4 pb-4 text-sm whitespace-nowrap">
                              {item?.paymentMethod}
                            </td>
                            <td className="pl-4 pr-4 pt-4 pb-4 text-sm whitespace-nowrap">
                              {item?.address}
                            </td>
                            <td className="pl-4 pr-4 pt-4 pb-4 text-sm whitespace-nowrap">
                              {item?.status}
                            </td>
                            <td className="pl-4 pr-4 pt-4 pb-4 text-sm whitespace-nowrap">
                              <button
                                disabled={item?.status === "Delivered"}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setUpdateStatus({
                                    show: true,
                                    id: item?._id,
                                  });
                                }}
                                className={`bg-[#4f619f] ${
                                  item?.status === "Delivered"
                                    ? "opacity-50"
                                    : "opacity-100"
                                } rounded-md px-2 py-1 text-white`}
                              >
                                {item?.status === "Delivered"
                                  ? "Delivered"
                                  : "Update Status"}
                              </button>
                            </td>
                          </tr>
                        );
                      })
                  )
                ) : (
                  <tr className="w-[100%] text-xl text-center h-[50vh] ">
                    <td colSpan={8} className="">
                      Loading...
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {updateStatus.show && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50">
          <div className="flex justify-center items-center h-[100%]">
            <StatusPopup
              closePopup={setUpdateStatus}
              id={updateStatus.id}
              setOrderData={setOrderData}
              sellerId={data._id}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersPageLayout;

const StatusPopup = ({ closePopup, id, setOrderData, sellerId }) => {
  const onSubmit = async (e, status) => {
    await axios.put(`${base_url}/buyer/order/update/${id}`, {
      status: status,
    });
    toast.success("Status Updated");
    let result2 = await axios.get(
      `${base_url}/seller/get/order/all/${sellerId}`
    );
    setOrderData(result2.data);
    setTimeout(() => {
      closePopup({ show: false, id: "" });
    }, 2000);
  };
  return (
    <div className="w-[30%] h-fit bg-white rounded-md p-3">
      <div className="flex justify-center items-center">
        <h1>Change Order Status</h1>
        {/* <ImCross className='cursor-pointer' onClick={()=>closePopup({show:false,id:""})}/> */}
      </div>
      <div className="flex justify-between items-center mt-5 gap-x-5">
        <button
          onClick={(e) => onSubmit(e, "In Progress")}
          className={`flex-1 px-2 bg-[${accountScreensColor.buttonBg}] shadow-otpShadow text-white rounded-md h-[2.3rem]`}
        >
          In Progress
        </button>

        <button
          onClick={(e) => onSubmit(e, "Delivered")}
          className={`flex-1 px-2  bg-[${accountScreensColor.buttonBg}] shadow-otpShadow text-white rounded-md h-[2.3rem]`}
        >
          Delivered
        </button>
        <button
          onClick={(e) => onSubmit(e, "Dispatched")}
          className={`flex-1 px-2  bg-[${accountScreensColor.buttonBg}] shadow-otpShadow text-white rounded-md h-[2.3rem]`}
        >
          Dispatched
        </button>
      </div>
      <div className="w-[100%] py-2 ">
        <button
          onClick={() => closePopup({ show: false, id: "" })}
          className={`w-[100%] border border-red-900 shadow-otpShadow text-red-800 rounded-md h-[2.3rem]`}
        >
          Cancel
        </button>
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
