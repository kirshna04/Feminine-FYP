import React, { useEffect } from 'react'
import Main from '../../../layout/Seller/ProductPageLayout/SingleProduct/Main'
import { useNavigate } from 'react-router-dom';

const SingleProductScreen = () => {
    const nav = useNavigate()
    const token = localStorage.getItem("sellertoken");
    const role = localStorage.getItem("role");
    useEffect(()=>{
      if (!token || (role && role !== "seller")) {
        nav("/");
      }
    },[nav])
  return (
    <div>
        <Main/>
    </div>
  )
}

export default SingleProductScreen
