import React, { useEffect } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Links from '../../layout/Customer/Home/Links'
import Profile from '../../layout/Customer/Profile/Profile'
import { useNavigate } from 'react-router-dom'
const ProfileScreen = () => {

  const nav = useNavigate()
  useEffect(()=>{
    if(!localStorage?.getItem('token') && !localStorage?.getItem('role')){
      nav("/home")
    }
  },[])
  return (
    <div>
      <Navbar />
      <Links />
      <Profile />
    </div>
  )
}

export default ProfileScreen