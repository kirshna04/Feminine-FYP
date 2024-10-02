import React from 'react'
import Product from './Product'
import Navbar from '../../../components/navbar/Navbar'
import Links from '../Home/Links'
const Main = () => {
  return (
    <div>
        <Navbar/>
        <Links/>
        <Product/>
    </div>
  )
}

export default Main