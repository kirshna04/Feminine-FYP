import React, { useState } from "react";
import Logo from "../../assets/web-logo.png";
import { MdDashboardCustomize } from "react-icons/md";
import { BsBarChartFill, BsPersonFill } from "react-icons/bs";
import { TbDiscount, TbReportAnalytics } from "react-icons/tb";
import { FaShoppingCart, FaCaretDown } from "react-icons/fa";
import { AiOutlineTransaction } from "react-icons/ai";
import { IoMail } from "react-icons/io5";
import { ImCross } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import { SellerjwtDecodeFunction } from "../../helper/jwt";
import { useGetSellerProfileQuery } from "../../services/api's/common/userAccountApi";

const Dashboard = ({ component, setshowLeftSideBar, showLeftSideBar }) => {
  const nav = useNavigate();
  const [accountId] = useState(SellerjwtDecodeFunction().payload._id);
  const { data } = useGetSellerProfileQuery(accountId);

  let ImageUrl =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzon50OBw7lo4WabzkwazOxyN_GzgubVoV_JwcvPCAnZlT79a7-xGuDFgJxo47zRR17o0&usqp=CAU";

  return (
    <div className="font-popins flex items-start w-screen h-screen overflow-y-auto absolute">
      {/* LEFT SIDE NAV   */}
      <div className="w-[13rem] hidden md:block h-[100%] bg-[#4f619f] pl-4 pr-4 pt-5 pb-10 relative">
        {/* LOGO  */}
        <div className="flex items-center gap-3">
          <div className="w-[2.5rem] h-[2.5rem] rounded-[5px] bg-white flex justify-center items-center">
            <img src={Logo} alt="" />
          </div>
          <p className="text-white text-sm tracking-wider  font-popins font-bold ">
            Feminine <span className="text-orange-400">Care</span>
          </p>
        </div>

        {/* MAIN NAVIGATION SECTION  */}

        <div className="mt-8">
          <div>
            <h1 className="text-white text-base font-bold tracking-wider mb-2">
              Menu
            </h1>

            <div
              onClick={() => nav("/seller/dashboard")}
              className="hover:bg-[#5b6aa1] hover:text-white text-[#8e99c1] h-[2rem] mb-2 rounded-sm cursor-pointer flex justify-start gap-3 pl-2 items-center"
            >
              <MdDashboardCustomize className="" />
              <p className="text-sm cursor-pointer tracking-wide">Dasboard</p>
            </div>
            <div
              onClick={() => nav("/seller/dashboard/products")}
              className="hover:bg-[#5b6aa1] hover:text-white text-[#8e99c1] h-[2rem] mb-2 rounded-sm cursor-pointer flex justify-start gap-3 pl-2 items-center"
            >
              <FaShoppingCart className="" />
              <p className="text-sm cursor-pointer tracking-wide">Product</p>
            </div>
            <div
              onClick={() => nav("/seller/dashboard/orders")}
              className="hover:bg-[#5b6aa1] hover:text-white text-[#8e99c1] h-[2rem] mb-2 rounded-sm cursor-pointer flex justify-start gap-3 pl-2 items-center"
            >
              <IoMail className="" />
              <p className="text-sm cursor-pointer tracking-wide">Orders</p>
            </div>

            {/* <div className="hover:bg-[#5b6aa1] hover:text-white text-[#8e99c1] h-[2rem] mb-2 rounded-sm cursor-pointer flex justify-start gap-3 pl-2 items-center">
              <BsBarChartFill className="" />
              <p className="text-sm cursor-pointer tracking-wide">Analytics</p>
            </div>

            <div className="hover:bg-[#5b6aa1] hover:text-white text-[#8e99c1] h-[2rem] mb-2 rounded-sm cursor-pointer flex justify-start gap-3 pl-2 items-center">
              <TbDiscount className="" />
              <p className=" text-sm cursor-pointer tracking-wide">Sales</p>
            </div> */}
          </div>

          {/* <div className="mt-4">
            <div>
              <h1 className="text-white text-base font-bold tracking-wider mb-2">
                Management
              </h1>
              <div
                onClick={() => nav("/seller/dashboard/products")}
                className="hover:bg-[#5b6aa1] hover:text-white text-[#8e99c1] h-[2rem] mb-2 rounded-sm cursor-pointer flex justify-start gap-3 pl-2 items-center"
              >
                <FaShoppingCart className="" />
                <p className="text-sm cursor-pointer tracking-wide">Product</p>
              </div>

              <div className="hover:bg-[#5b6aa1] hover:text-white text-[#8e99c1] h-[2rem] mb-2 rounded-sm cursor-pointer flex justify-start gap-3 pl-2 items-center">
                <BsPersonFill className="" />
                <p className="text-sm cursor-pointer tracking-wide">Customer</p>
              </div>

              <div className="hover:bg-[#5b6aa1] hover:text-white text-[#8e99c1] h-[2rem] mb-2 rounded-sm cursor-pointer flex justify-start gap-3 pl-2 items-center">
                <TbReportAnalytics className="" />
                <p className=" text-sm cursor-pointer tracking-wide">Report</p>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <div>
              <h1 className="text-white text-base font-bold tracking-wider mb-2">
                Notification
              </h1>
              <div className="hover:bg-[#5b6aa1] hover:text-white text-[#8e99c1] h-[2rem] mb-2 rounded-sm cursor-pointer flex justify-start gap-3 pl-2 items-center">
                <AiOutlineTransaction className="" />
                <p className="text-sm cursor-pointer tracking-wide">
                  Transaction
                </p>
              </div>

              <div
                onClick={() => nav("/seller/dashboard/orders")}
                className="hover:bg-[#5b6aa1] hover:text-white text-[#8e99c1] h-[2rem] mb-2 rounded-sm cursor-pointer flex justify-start gap-3 pl-2 items-center"
              >
                <IoMail className="" />
                <p className="text-sm cursor-pointer tracking-wide">Orders</p>
              </div>
            </div>
          </div> */}
        </div>

        {/* USER PROFILE  */}

        <div className="mt-4 flex justify-center items-center  absolute bottom-4 w-[83%]">
          <div className="flex justify-between items-center flex-1 bg-[#ff7556] h-[3rem] rounded-md shadow-otpShadow cursor-pointer p-1">
            <div className="flex gap-2">
              <div>
                <img
                  className="w-[2rem] h-[2rem] bg-center rounded-full"
                  src={data?.image ? data?.image : ImageUrl}
                  alt=""
                />
              </div>
              <div>
                <p className="text-xs text-white">
                  {data?.name ? data?.name : "Wole Michoel"}
                </p>
                <p className="text-xs text-white">Seller</p>
              </div>
            </div>

            <div>
              <FaCaretDown className="text-white text-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* LEFT SIDE NAV RESPONSIVE */}

      {showLeftSideBar && (
        <div className="w-[13rem] block md:hidden h-[100%] bg-[#4f619f] pl-4 pr-4 pt-5 pb-10 absolute top-0 left-0 z-50">
          {/* CLOSE NAV ICON  */}

          <div className=" absolute right-3 top-2">
            <ImCross
              className="text-[#8e99c1] cursor-pointer"
              onClick={() => setshowLeftSideBar(false)}
            />
          </div>

          {/* LOGO  */}
          <div className="flex items-center gap-3 mt-0">
            <div className="w-[2.5rem] h-[2.5rem] rounded-[5px] bg-white flex justify-center items-center">
              <img src={Logo} alt="" />
            </div>
            <p className="text-white text-sm tracking-wider  font-popins font-bold ">
              Feminine <span className="text-orange-400">Care</span>
            </p>
          </div>

          {/* MAIN NAVIGATION SECTION  */}

          <div className="mt-4 h-[76vh] overflow-y-auto">
            <div>
              <h1 className="text-white text-base font-bold tracking-wider mb-2">
                Menu
              </h1>

              <div
                onClick={() => nav("/seller/dashboard")}
                className="hover:bg-[#5b6aa1] hover:text-white text-[#8e99c1] h-[2rem] mb-2 rounded-sm cursor-pointer flex justify-start gap-3 pl-2 items-center"
              >
                <MdDashboardCustomize className="" />
                <p className="text-sm cursor-pointer tracking-wide">Dasboard</p>
              </div>
              <div
                onClick={() => nav("/seller/dashboard/products")}
                className="hover:bg-[#5b6aa1] hover:text-white text-[#8e99c1] h-[2rem] mb-2 rounded-sm cursor-pointer flex justify-start gap-3 pl-2 items-center"
              >
                <FaShoppingCart className="" />
                <p className="text-sm cursor-pointer tracking-wide">Product</p>
              </div>
              <div
                onClick={() => nav("/seller/dashboard/orders")}
                className="hover:bg-[#5b6aa1] hover:text-white text-[#8e99c1] h-[2rem] mb-2 rounded-sm cursor-pointer flex justify-start gap-3 pl-2 items-center"
              >
                <IoMail className="" />
                <p className="text-sm cursor-pointer tracking-wide">Orders</p>
              </div>

              {/* <div className="hover:bg-[#5b6aa1] hover:text-white text-[#8e99c1] h-[2rem] mb-2 rounded-sm cursor-pointer flex justify-start gap-3 pl-2 items-center">
                <BsBarChartFill className="" />
                <p className="text-sm cursor-pointer tracking-wide">
                  Analytics
                </p>
              </div>

              <div className="hover:bg-[#5b6aa1] hover:text-white text-[#8e99c1] h-[2rem] mb-2 rounded-sm cursor-pointer flex justify-start gap-3 pl-2 items-center">
                <TbDiscount className="" />
                <p className=" text-sm cursor-pointer tracking-wide">Sales</p>
              </div> */}
            </div>

            {/* <div className="mt-4">
              <div>
                <h1 className="text-white text-base font-bold tracking-wider mb-2">
                  Management
                </h1>
                <div
                  onClick={() => nav("/seller/dashboard/products")}
                  className="hover:bg-[#5b6aa1] hover:text-white text-[#8e99c1] h-[2rem] mb-2 rounded-sm cursor-pointer flex justify-start gap-3 pl-2 items-center"
                >
                  <FaShoppingCart className="" />
                  <p className="text-sm cursor-pointer tracking-wide">
                    Product
                  </p>
                </div>

                <div className="hover:bg-[#5b6aa1] hover:text-white text-[#8e99c1] h-[2rem] mb-2 rounded-sm cursor-pointer flex justify-start gap-3 pl-2 items-center">
                  <BsPersonFill className="" />
                  <p className="text-sm cursor-pointer tracking-wide">
                    Customer
                  </p>
                </div>

                <div className="hover:bg-[#5b6aa1] hover:text-white text-[#8e99c1] h-[2rem] mb-2 rounded-sm cursor-pointer flex justify-start gap-3 pl-2 items-center">
                  <TbReportAnalytics className="" />
                  <p className=" text-sm cursor-pointer tracking-wide">
                    Report
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <div>
                <h1 className="text-white text-base font-bold tracking-wider mb-2">
                  Notification
                </h1>
                <div className="hover:bg-[#5b6aa1] hover:text-white text-[#8e99c1] h-[2rem] mb-2 rounded-sm cursor-pointer flex justify-start gap-3 pl-2 items-center">
                  <AiOutlineTransaction className="" />
                  <p className="text-sm cursor-pointer tracking-wide">
                    Transaction
                  </p>
                </div>

                <div
                  onClick={() => nav("/seller/dashboard/orders")}
                  className="hover:bg-[#5b6aa1] hover:text-white text-[#8e99c1] h-[2rem] mb-2 rounded-sm cursor-pointer flex justify-start gap-3 pl-2 items-center"
                >
                  <IoMail className="" />
                  <p className="text-sm cursor-pointer tracking-wide">Orders</p>
                </div>
              </div>
            </div> */}
          </div>

          {/* USER PROFILE  */}

          <div className="flex justify-center items-center  absolute bottom-2 w-[83%]">
            <div className="flex justify-between items-center flex-1 bg-[#ff7556] h-[3rem] rounded-md shadow-otpShadow cursor-pointer p-1">
              <div className="flex gap-2">
                <div>
                  <img
                    className="w-[2rem] h-[2rem] bg-center rounded-full"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzon50OBw7lo4WabzkwazOxyN_GzgubVoV_JwcvPCAnZlT79a7-xGuDFgJxo47zRR17o0&usqp=CAU"
                    alt=""
                  />
                </div>
                <div>
                  <p className="text-xs text-white">Wole Michoel</p>
                  <p className="text-xs text-white">Seller</p>
                </div>
              </div>

              <div>
                <FaCaretDown className="text-white text-xl" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* RIGHT MAIN CONTENT  */}

      <div className="flex-1 h-[100%] overflow-y-auto">{component}</div>
    </div>
  );
};

export default Dashboard;
