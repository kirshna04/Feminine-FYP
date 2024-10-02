import React, { useEffect, useState } from "react";
import Input from "../../../components/input/Input";
import { FaBell, FaSearch } from "react-icons/fa";
import { RiLogoutCircleLine } from "react-icons/ri";
import { TbSitemap } from "react-icons/tb";
import { FcSalesPerformance } from "react-icons/fc";
import { FaFirstOrderAlt } from "react-icons/fa6";
import { SiFuturelearn } from "react-icons/si";
import { GiHamburgerMenu } from "react-icons/gi";
import GraphIcon from "../../../assets/graph.png";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import OrdersTable from "./OrdersTable";
import { useNavigate } from "react-router-dom";
import {
  useGetBuyerProductQuery,
  useGetSellerProfileQuery,
} from "../../../services/api's/common/userAccountApi";
import { SellerjwtDecodeFunction } from "../../../helper/jwt";
import axios from "axios";
import { base_url } from "../../../services/api's/base_url";

const HomePage = ({ setshowLeftSideBar, showLeftSideBar }) => {
  let dummyImage =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzon50OBw7lo4WabzkwazOxyN_GzgubVoV_JwcvPCAnZlT79a7-xGuDFgJxo47zRR17o0&usqp=CAU";
  const nav = useNavigate();
  const [showLinks, setshowLinks] = useState(false);
  const [productLength, setproductLength] = useState(0);
  const [graphData, setGraphData] = useState([]);
  const [accountId] = useState(SellerjwtDecodeFunction().payload._id);
  const [quantity, setquantity] = useState({ sales: 0, pending: 0, earn: 0 });
  const { data } = useGetSellerProfileQuery(accountId);
  let totalProduct = useGetBuyerProductQuery(
    SellerjwtDecodeFunction().payload._id
  )?.data?.AllProduct?.length;

  const logout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("sellertoken");
    nav("/account");
  };
  useEffect(() => {
    setproductLength(totalProduct);
  }, []);

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updateAction, setUpdateAction] = useState(false);
  useEffect(() => {
    (async () => {
      let result = await axios.get(`${base_url}/seller/dashboard/${data._id}`);
      setDashboardData(result.data);
      console.log(result);
      setLoading(false);
    })();
  }, [updateAction]);

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const result = await axios.get(
          `${base_url}/seller/get/order/all/${data._id}`
        );
        const orders = result.data;
        let updatedQuantity = { sales: 0, pending: 0, earn: 0 };
        orders.forEach((order) => {
          if (order.status === "Delivered") {
            updatedQuantity.sales += order.quantity;
            updatedQuantity.earn += order.quantity * order?.product_id?.price;
          } else if (order.status === "Pending") {
            updatedQuantity.pending += order.quantity;
          }
        });

        setquantity(updatedQuantity);
        const formattedData = prepareGraphData(result.data);
        setGraphData(formattedData);
      } catch (error) {
        console.error("Failed to fetch order data:", error);
      }
    };
    fetchOrderData();
  }, [base_url, data]);

  function prepareGraphData(orders) {
    const salesDataByMonth = {};

    orders.forEach((order) => {
      const createdAtDate = new Date(order.createdAt); // Convert string to Date
      const month = createdAtDate.toLocaleString("default", { month: "short" });
      if (salesDataByMonth[month]) {
        salesDataByMonth[month] += order.quantity * order?.product_id?.price;
      } else {
        salesDataByMonth[month] = order.quantity * order?.product_id?.price;
      }
    });

    return Object.keys(salesDataByMonth).map((month) => ({
      month: month,
      amount: salesDataByMonth[month],
    }));
  }

  return (
    <div className="w-[100%] h-[100%] bg-[#fbfcfe] overflow-y-auto pt-5 pl-5 pr-5 md:pl-10 md:pr-10 overflow-x-auto relative">
      {/* TOP BAR  */}

      <div className="flex justify-between items-center md:mt-0 mt-0 relative">
        <div className="lg:block hidden">
          <h1 className="md:text-lg text-sm font-semibold">
            Good Moring ! {data?.name ? data.name : "Wole Michoel"}
          </h1>
        </div>

        <div className="flex justify-between items-center md:gap-4 flex-1 lg:flex-none gap-2 overflow-x-auto">
          {!showLeftSideBar && (
            <div
              onClick={() => setshowLeftSideBar(true)}
              className="bg-[#eff3fc] min-w-[2.5rem] md:hidden min-h-[2.5rem] flex justify-center items-center rounded-md"
            >
              <GiHamburgerMenu />
            </div>
          )}
          <div className="md:w-[60%] md:min-w-[60%] min-w-[60vw] relative">
            <Input
              placeholder={"Search"}
              className={
                "outline-none border-none bg-[#eff3fc] w-[100%] h-[2.6rem] pl-5 pr-[3rem] rounded-md"
              }
            />
            <FaSearch className=" absolute top-3 right-6" />
          </div>

          <div
            onClick={() => nav("/seller/dashboard/profile")}
            className="bg-[#eff3fc] hidden min-w-[2.5rem] min-h-[2.5rem] sm:flex justify-center gap-x-4 items-center rounded-md cursor-pointer"
          >
            <img
              className="w-[1.5rem] h-[1.5rem] bg-center rounded-full"
              src={data?.image ? data?.image : dummyImage}
              alt=""
            />
          </div>

          {/* <div className="bg-[#eff3fc] hidden min-w-[2.5rem] min-h-[2.5rem] sm:flex justify-center items-center rounded-md cursor-pointer">
            <FaBell className="" />
          </div> */}

          <div
            onClick={logout}
            className="bg-[#eff3fc] hidden min-w-[2.5rem] min-h-[2.5rem] sm:flex justify-center gap-x-4 items-center rounded-md cursor-pointer"
          >
            <RiLogoutCircleLine className="text-[#ff7555]" />
          </div>

          {/* RESPONSIVE USER PROFILE LOGO  */}
          <div
            onClick={() => setshowLinks(!showLinks)}
            className="bg-[#eff3fc] sm:hidden min-w-[2.5rem] min-h-[2.5rem] flex justify-center items-center rounded-md cursor-pointer"
          >
            <img
              className="w-[1.5rem] h-[1.5rem] bg-center rounded-full"
              src={data?.image ? data?.image : dummyImage}
              alt=""
            />
          </div>
        </div>
      </div>

      {/* RESPONSIVE NAV LINK  */}
      {showLinks && (
        <div className="absolute shadow-otpShadow top-[4.2rem] sm:hidden right-4 z-50 bg-[#eff3fc] w-[8rem] pl-2 pt-2 pb-2">
          <p
            onClick={() => nav("/seller/dashboard/profile")}
            className="mb-2 cursor-pointer text-sm"
          >
            Profile
          </p>
          {/* <p className="mb-2 cursor-pointer text-sm">Notification</p> */}
          <p className="mb-2 cursor-pointer text-sm" onClick={logout}>
            Logout
          </p>
        </div>
      )}

      {/* CARDS EARNS  */}

      <div className="flex justify-between gap-4 items-center mt-8 overflow-x-auto p-1">
        <div className="min-w-[16rem] h-[12rem] rounded-md bg-white shadow-otpShadow p-3 relative">
          <div className="w-[3rem] h-[3rem] rounded-full bg-[#4f619f] flex justify-center items-center mb-4">
            <TbSitemap className="text-white text-xl" />
          </div>
          <h1 className="text-sm text-[#8e99c1]">Total Products</h1>

          <div className="absolute bottom-2 flex justify-between items-center w-[90%]">
            <p className="text-sm font-semibold">
              {" "}
              {loading
                ? "Loading..."
                : `${dashboardData?.dashboardStatistics?.totalProducts} Products`}
            </p>
            <img src={GraphIcon} alt="" className="w-[3rem]" />
          </div>
        </div>

        <div className="min-w-[16rem] h-[12rem] rounded-md bg-white shadow-otpShadow p-3 relative">
          <div className="w-[3rem] h-[3rem] rounded-full bg-[#4f619f] flex justify-center items-center mb-4">
            <FcSalesPerformance className="text-white text-xl" />
          </div>
          <h1 className="text-sm text-[#8e99c1]">Total Orders</h1>
          <div className="absolute bottom-2 flex justify-between items-center w-[90%]">
            <p className="text-sm font-semibold">
              {loading
                ? "Loading..."
                : `${dashboardData?.dashboardStatistics?.totalOrders} Orders`}
            </p>
            <img src={GraphIcon} alt="" className="w-[3rem]" />
          </div>
        </div>

        <div className="min-w-[16rem] h-[12rem] rounded-md bg-white shadow-otpShadow p-3 relative">
          <div className="w-[3rem] h-[3rem] rounded-full bg-[#4f619f] flex justify-center items-center mb-4">
            <FaFirstOrderAlt className="text-white text-xl" />
          </div>
          <h1 className="text-sm text-[#8e99c1]">Pending Order</h1>
          <div className="absolute bottom-2 flex justify-between items-center w-[90%]">
            <p className="text-sm font-semibold">
              {loading
                ? "Loading..."
                : `${dashboardData?.dashboardStatistics?.totalPendingOrders} Orders
              Pending`}
            </p>
            <img src={GraphIcon} alt="" className="w-[3rem]" />
          </div>
        </div>

        <div className="min-w-[16rem] h-[12rem] rounded-md bg-white shadow-otpShadow p-3 relative">
          <div className="w-[3rem] h-[3rem] rounded-full bg-[#4f619f] flex justify-center items-center mb-4">
            <SiFuturelearn className="text-white text-xl" />
          </div>
          <h1 className="text-sm text-[#8e99c1]">Total Earnings</h1>
          <div className="absolute bottom-2 flex justify-between items-center w-[90%]">
            <p className="text-sm font-semibold">
              {loading
                ? "Loading..."
                : `RS ${dashboardData?.dashboardStatistics?.totalEarnings}`}
            </p>
            <img src={GraphIcon} alt="" className="w-[3rem]" />
          </div>
        </div>
      </div>

      {/* TOTAL SALES BAR CHARTS  */}

      {/* <div className='flex justify-between items-start gap-4 mt-8'>

                <div className='flex-1 h-[17rem] bg-[#ebeffa] rounded-md pb-3'>
                    <h1 className='pt-3 pl-3'>Sales Summary</h1>
                    <div className='mt-3'>
                        <ResponsiveContainer width="100%" height={230}>
                            <BarChart data={graphData} width={800} height={220}>
                                <YAxis dataKey="amount" tickFormatter={value => `$${value}`} axisLine={false} stroke='#8e99c1' tickLine={false} style={{ fontSize: "0.8rem" }} />
                                <XAxis dataKey="month" axisLine={false} stroke='#8e99c1' tickLine={false} style={{ fontSize: "0.8rem" }} />
                                <Tooltip content={<CustomTooltip />} />
                                <Bar dataKey="amount" fill='#4f619f' />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className='bg-[#ebeffa] w-[17rem] h-[17rem] rounded-md hidden lg:flex justify-center items-center'>
                    <PieChart width={200} height={300}>
                        <Pie data={graphData} cx="50%" cy="50%" dataKey={"amount"} fill="#4f619f" />
                        <Tooltip content={<CustomTooltip2 />} />
                    </PieChart>
                </div>
            </div> */}

      {/* ORDERS TABLE  */}

      <div className="mt-5 pb-[2rem]">
        <OrdersTable
          setUpdateAction={setUpdateAction}
          updateAction={updateAction}
        />
      </div>
    </div>
  );
};

export default HomePage;
