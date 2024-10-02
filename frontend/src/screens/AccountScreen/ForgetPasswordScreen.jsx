import React, { useEffect } from 'react'
import ForgetPassword from '../../layout/Common/ForgetPassword'
import { useNavigate } from 'react-router-dom'

const ForgetPasswordScreen = () => {
  const nav = useNavigate()

  useEffect(()=>{
    if(localStorage?.getItem('token') && localStorage?.getItem('role')){
      nav("/")
    }
  },[])
  
  return (
    <div>
      <ForgetPassword/>
    </div>
  )
}

export default ForgetPasswordScreen