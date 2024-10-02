import React, { useEffect } from 'react'
import DashboardLayout from '../../../layout/Seller/DashboardLayout/DashboardLayout'
import { useNavigate } from 'react-router-dom'
const HomeDashbaordScreen = () => {
  const nav = useNavigate()
  const token = localStorage.getItem("sellertoken");
  const role = localStorage.getItem("role");
  useEffect(()=>{
    if (!token && (role && role !== "seller")) {
      nav("/account");
      console.log(true)
    }
  },[nav])

  return (
    <div>
      <DashboardLayout/>
    </div>
  )
}

export default HomeDashbaordScreen
