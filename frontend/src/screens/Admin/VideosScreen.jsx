import React, { useEffect } from 'react'
import DashboardLayout from '../../layout/Admin/Videos/DashboardLayout'
import { useNavigate } from 'react-router-dom'

const VideosScreen = () => {
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

export default VideosScreen
