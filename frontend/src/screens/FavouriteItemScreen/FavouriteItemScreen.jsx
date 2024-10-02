import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Links from '../../layout/Customer/Home/Links'
import FavouriteProduct from '../../layout/Customer/FavouriteProduct/FavouriteProduct'
const FavouriteItemScreen = () => {
  return (
    <div>
      <Navbar/>
      <Links/>
      <FavouriteProduct/>
    </div>
  )
}

export default FavouriteItemScreen