import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Main from "../../../layout/Seller/OrdersPage/Main";
const OrdersDashboardScreen = () => {
  const nav = useNavigate();
  const token = localStorage.getItem("sellertoken");
  const role = localStorage.getItem("role");
  useEffect(() => {
    if (!token || (role && role !== "seller")) {
      nav("/");
    }
  }, [nav]);
  return (
    <div>
      <Main />
    </div>
  );
};

export default OrdersDashboardScreen;
