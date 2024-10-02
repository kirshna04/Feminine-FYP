import React, { useEffect } from 'react'
import DashboardLayout from '../../layout/Admin/DashboardLayout'
import { useNavigate } from 'react-router-dom'

const HomeScreen = () => {
  const nav = useNavigate()
  useEffect(()=>{
    if(!localStorage.getItem("adminId")){
      nav("/account")
    }
  },[])
  return (
    <div>
      <DashboardLayout/>
    </div>
  )
}

export default HomeScreen
