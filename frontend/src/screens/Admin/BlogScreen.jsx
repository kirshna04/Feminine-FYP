import React, { useEffect } from 'react'
import DashboardLayout from '../../layout/Admin/Blog/DashboardLayout'
import { useNavigate } from 'react-router-dom'

const BlogScreen = () => {
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

export default BlogScreen
