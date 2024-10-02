import React, { useEffect, useState } from 'react'
import Product2 from '../../../components/Listing/Product2'
import { useGetProductMutation } from '../../../services/api\'s/common/userAccountApi'
const FavouriteProduct = () => {

  const [getProduct,isLoading] =useGetProductMutation()
  const [ProductData, setProductData] = useState([])
  const getProductFunction = async()=>{
    let result = await getProduct()
    setProductData(result?.data?.AllProduct)
  }
  useEffect(()=>{
    getProductFunction()
  },[])

  return (
    <div className='font-popins'>
    <Product2 title={"My Wishlists"} Loading={isLoading} isMargin={true} data={ProductData}/>

    </div>
  )
}

export default FavouriteProduct