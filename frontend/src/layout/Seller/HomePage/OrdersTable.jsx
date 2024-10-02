/* eslint-disable react/prop-types */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { SellerjwtDecodeFunction } from "../../../helper/jwt";
import { base_url } from "../../../services/api's/base_url";
import { useGetSellerProfileQuery } from "../../../services/api's/common/userAccountApi";
import { accountScreensColor } from "../../../constant/color";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const OrdersTable = ({ setUpdateAction, updateAction }) => {
  const { data } = useGetSellerProfileQuery(
    SellerjwtDecodeFunction().payload._id
  );
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updateStatus, setUpdateStatus] = useState({ show: false, id: "" });
  useEffect(() => {
    (async () => {
      let result = await axios.get(
        `${base_url}/seller/get/order/all/${data._id}`
      );
      setOrderData(result.data);
      setLoading(false);
    })();
  }, []);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);
    return formattedDate;
  }

  const nav = useNavigate();

  return (
    <div className="font-popins h-[50vh] overflow-y-auto overflow-x-auto">
      <div className="bg-[#ebeffa] rounded-md p-3 w-[100%] overflow-x-auto">
        <div>
          <h1>Recent Orders</h1>
        </div>

        {/* MAIN TABLE  */}

        <div className="mt-3 w-full overflow-x-scroll overflow-y-auto md:overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="">
                <th className="py-2 pr-4 text-start font-normal whitespace-nowrap  border-b border-t border-gray-200">
                  Order Id
                </th>
                {/* <th className='py-2 pl-4 pr-4 text-start font-normal whitespace-nowrap  border-b border-t border-gray-200'>Product Title</th>
                                <th className='py-2 pl-4 pr-4 text-start font-normal whitespace-nowrap  border-b border-t border-gray-200'>Product Image</th>  */}
                <th className="py-2 pl-4 pr-4 text-start font-normal whitespace-nowrap  border-b border-t border-gray-200">
                  Total Item
                </th>
                <th className="py-2 pl-4 pr-4 text-start font-normal whitespace-nowrap  border-b border-t border-gray-200">
                  Order Date
                </th>
                <th className="py-2 pl-4 pr-4 text-start font-normal whitespace-nowrap  border-b border-t border-gray-200">
                  Order Amount
                </th>
                <th className="py-2 pl-4 pr-4 text-start font-normal whitespace-nowrap  border-b border-t border-gray-200">
                  Payment Method
                </th>
                <th className="py-2 pl-4 pr-4 text-start font-normal whitespace-nowrap  border-b border-t border-gray-200">
                  Delivery Address
                </th>
                <th className="py-2 pl-4 pr-4 text-start font-normal whitespace-nowrap  border-b border-t border-gray-200">
                  Status
                </th>
                <th className="py-2 pl-4 pr-4 text-start font-normal whitespace-nowrap  border-b border-t border-gray-200">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {!loading ? (
                orderData.length == 0 ? (
                  <tr className="w-[100%] text-xl text-center h-[50vh] ">
                    <td colSpan={8} className="">
                      No Orders Found
                    </td>
                  </tr>
                ) : (
                  orderData?.map((item, index) => (
                    <tr
                      key={index}
                      onClick={() => {
                        nav("/order-summary", { state: item });
                      }}
                      className="cursor-pointer"
                    >
                      <td className=" pr-4 pt-4 pb-4 text-sm whitespace-nowrap border-b border-bg-gray-200">
                        {item?._id}
                      </td>
                      {/* <td className='pl-4 pr-4 pt-4 pb-4 text-sm whitespace-nowrap border-b border-bg-gray-200 capitalize'>{item?.product_id?.title}</td>
                                    <td className='pl-4 pr-4 pt-4 pb-4 text-sm whitespace-nowrap border-b border-bg-gray-200'>
                                        <img src={item.product_id?.images[0]} alt="" className='w-[3rem] h-[3rem] rounded-md' />
                                    </td> */}
                      <td className="pl-4 pr-4 pt-4 pb-4 text-sm whitespace-nowrap border-b border-bg-gray-200">
                        {item?.quantity}
                      </td>
                      <td className="pl-4 pr-4 pt-4 pb-4 text-sm whitespace-nowrap border-b border-bg-gray-200">
                        {formatDate(item?.createdAt)}
                      </td>
                      <td className="pl-4 pr-4 pt-4 pb-4 text-sm whitespace-nowrap border-b border-bg-gray-200">
                        {item?.totalAmount}
                      </td>
                      <td className="pl-4 pr-4 pt-4 pb-4 text-sm whitespace-nowrap border-b border-bg-gray-200">
                        {item?.paymentMethod}
                      </td>
                      <td className="pl-4 pr-4 pt-4 pb-4 text-sm whitespace-nowrap border-b border-bg-gray-200">
                        {item?.address}
                      </td>
                      <td className="pl-4 pr-4 pt-4 pb-4 text-sm whitespace-nowrap border-b border-bg-gray-200">
                        {item?.status}
                      </td>
                      <td className="pl-4 pr-4 pt-4 pb-4 text-sm whitespace-nowrap border-b border-bg-gray-200 ">
                        <button
                          disabled={item?.status == "Delivered"}
                          onClick={(e) => {
                            e.stopPropagation();
                            setUpdateStatus({ show: true, id: item?._id });
                          }}
                          className={`bg-[#4f619f] ${
                            item?.status == "Delivered"
                              ? "opacity-50"
                              : "opacity-100"
                          } rounded-md px-2 py-1 text-white`}
                        >
                          {item?.status == "Delivered"
                            ? "Delivered"
                            : "Update Status"}
                        </button>
                      </td>
                    </tr>
                  ))
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
      {updateStatus.show && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50">
          <div className="flex justify-center items-center h-[100%]">
            <StatusPopup
              closePopup={setUpdateStatus}
              id={updateStatus.id}
              setOrderData={setOrderData}
              sellerId={data._id}
              updateAction={updateAction}
              setUpdateAction={setUpdateAction}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersTable;

const StatusPopup = ({
  closePopup,
  id,
  setOrderData,
  sellerId,
  updateAction,
  setUpdateAction,
}) => {
  const onSubmit = async (e, status) => {
    await axios.put(`${base_url}/buyer/order/update/${id}`, {
      status: status,
    });
    toast.success("Status Updated");
    let result2 = await axios.get(
      `${base_url}/seller/get/order/all/${sellerId}`
    );
    setUpdateAction(!updateAction);
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
