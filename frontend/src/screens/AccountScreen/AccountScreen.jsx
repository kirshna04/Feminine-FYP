import React, { useEffect } from 'react'
import AccountLayout from '../../layout/Common/AccountLayout'
import { useNavigate } from 'react-router-dom'

const AccountScreen = () => {
  const nav = useNavigate()

  useEffect(()=>{
    if(localStorage?.getItem('token') && localStorage?.getItem('role')){
      nav("/")
    }
    else if (localStorage.getItem('sellertoken') && localStorage?.getItem('role')){
      nav("/seller/dashboard")
    }
  },[])
  
  return (
    <div>
      <AccountLayout/>
    </div>
  )
}

export default AccountScreen