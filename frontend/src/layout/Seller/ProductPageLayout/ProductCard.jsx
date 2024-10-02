import React, { useEffect, useState } from 'react'
import { TbSitemap } from "react-icons/tb";
import { FcSalesPerformance } from "react-icons/fc";
import { FaFirstOrderAlt } from "react-icons/fa6";
import { SiFuturelearn } from "react-icons/si";
import GraphIcon from '../../../assets/graph.png'
import { useGetBuyerProductQuery } from '../../../services/api\'s/common/userAccountApi';
import { SellerjwtDecodeFunction } from '../../../helper/jwt';
const ProductCard = () => {


    const [productLength, setproductLength] = useState(0)
    const [accountId] = useState(SellerjwtDecodeFunction().payload._id)
    let totalProduct = useGetBuyerProductQuery(accountId)?.data?.AllProduct?.length
    useEffect(()=>{
        setproductLength(totalProduct)
    },[])

    return (
        <div>
            <div className='flex justify-between gap-4 items-center md:mt-5 mt-3 overflow-x-auto p-1'>

                <div className='min-w-[16rem] h-[12rem] rounded-md bg-white shadow-otpShadow p-3 relative'>
                    <div className='w-[3rem] h-[3rem] rounded-full bg-[#4f619f] flex justify-center items-center mb-4'>
                        <TbSitemap className='text-white text-xl' />
                    </div>
                    <h1 className='text-sm text-[#8e99c1]'>Total Product</h1>

                    <div className='absolute bottom-2 flex justify-between items-center w-[90%]'>
                        <p className='text-sm font-semibold'>{productLength} products</p>
                        <img src={GraphIcon} alt="" className='w-[3rem]' />
                    </div>
                </div>

                <div className='min-w-[16rem] h-[12rem] rounded-md bg-white shadow-otpShadow p-3 relative'>
                    <div className='w-[3rem] h-[3rem] rounded-full bg-[#4f619f] flex justify-center items-center mb-4'>
                        <FcSalesPerformance className='text-white text-xl' />
                    </div>
                    <h1 className='text-sm text-[#8e99c1]'>Total Sales</h1>
                    <div className='absolute bottom-2 flex justify-between items-center w-[90%]'>
                        <p className='text-sm font-semibold'>1500+ products sold</p>
                        <img src={GraphIcon} alt="" className='w-[3rem]' />
                    </div>
                </div>

                <div className='min-w-[16rem] h-[12rem] rounded-md bg-white shadow-otpShadow p-3 relative'>
                    <div className='w-[3rem] h-[3rem] rounded-full bg-[#4f619f] flex justify-center items-center mb-4'>
                        <FaFirstOrderAlt className='text-white text-xl' />
                    </div>
                    <h1 className='text-sm text-[#8e99c1]'>Out Of Stock</h1>
                    <div className='absolute bottom-2 flex justify-between items-center w-[90%]'>
                        <p className='text-sm font-semibold'>10 products out of stock</p>
                        <img src={GraphIcon} alt="" className='w-[3rem]' />
                    </div>
                </div>

                <div className='min-w-[16rem] h-[12rem] rounded-md bg-white shadow-otpShadow p-3 relative'>
                    <div className='w-[3rem] h-[3rem] rounded-full bg-[#4f619f] flex justify-center items-center mb-4'>
                        <SiFuturelearn className='text-white text-xl' />
                    </div>
                    <h1 className='text-sm text-[#8e99c1]'>Total Earn</h1>
                    <div className='absolute bottom-2 flex justify-between items-center w-[90%]'>
                        <p className='text-sm font-semibold'>$20000 earn</p>
                        <img src={GraphIcon} alt="" className='w-[3rem]' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductCard
