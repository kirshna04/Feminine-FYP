import React, { useEffect, useState } from 'react'
import Product from '../../../components/Listing/Product'
import Product2 from '../../../components/Listing/Product2'
import { useGetProductMutation } from '../../../services/api\'s/common/userAccountApi'

const Listing = () => {

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
    <div>
        <Product title={"Recomended Products"} Loading={isLoading} data={ProductData} isMargin={false}/>
        <Product2 title={"Featured Products"}  Loading={isLoading} data={ProductData}  isMargin={true}  />
        {/* <Product2 title={"New Products"}  isMargin={true}  /> */}

    </div>
  )
}

export default Listing