import React, { useState } from "react";
import Dashboard from "../../../components/Dashboard/Dashboard";
import OrdersPageLayout from "./OrdersPageLayout";

const Main = () => {
  const [showLeftSideBar, setshowLeftSideBar] = useState(false);

  return (
    <div>
      <Dashboard
        showLeftSideBar={showLeftSideBar}
        setshowLeftSideBar={setshowLeftSideBar}
        component={
          <OrdersPageLayout
            showLeftSideBar={showLeftSideBar}
            setshowLeftSideBar={setshowLeftSideBar}
          />
        }
      />
    </div>
  );
};

export default Main;
