import React, { useState } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { useLocation } from 'react-router-dom'
import { useGetSingleroductQuery } from '../../../../services/api\'s/common/userAccountApi'
const SingleProductLayout = ({ setshowLeftSideBar, showLeftSideBar }) => {

  const productId = useLocation().pathname.split('/')[5]
  const { data,error } = useGetSingleroductQuery(productId)
  const [imageIndex, setimageIndex] = useState(0)

  console.log(data,error)
  return (
    <div className='font-popins w-[100%] h-[100vh] bg-[#fbfcfe] overflow-y-auto pt-5 pl-5 pr-5 md:pl-10 md:pr-10 overflow-x-auto relative'>

      {/* HEADING AND RESPONISVE HAMBURGER MENU ICON  */}
      <div className='flex gap-x-4 items-center'>
        {
          !showLeftSideBar && (
            <div onClick={() => setshowLeftSideBar(true)} className='bg-[#eff3fc] min-w-[2.5rem] md:hidden min-h-[2.5rem] flex justify-center items-center rounded-md'>
              <GiHamburgerMenu />
            </div>
          )
        }
        <h1 className='text-xl font-semibold'>Single Product Page .</h1>

      </div>

      {/* MAIN LISTING  */}

      <div className='flex justify-center items-start gap-x-[2rem] mt-[4rem] lg:flex-row flex-col'>

        {/* IMAGE PART  */}

        <div className='flex flex-1 justify-center items-center flex-col min-w-full w-full lg:min-w-[25rem] lg:w-[25rem] lg:mb-0 mb-[2rem]'>

          {/* BIG IMAGE  */}
          <div>
            <img src={data?.SingleProduct?.images[imageIndex]} alt="" className='h-[20rem] min-w-full w-full lg:min-w-[25rem] lg:w-[25rem] rounded-md' />
          </div>

          {/* SMALL IMAGES  */}
          <div className='flex items-start gap-x-2 mt-3'>
            {
              data?.SingleProduct?.images.map((item, index) => {
                return (
                  <div key={index} onClick={() => setimageIndex(index)}>
                    <img src={item} alt="" className={`h-[4rem] w-[4rem] bg-center rounded-md cursor-pointer ${index === imageIndex ? "opacity-50" : null}`} />
                  </div>
                )
              })
            }
          </div>

        </div>

        {/* TEXT PART  */}

        <div className='flex-1 lg:mb-0 mb-7'>
          <h1 className='mb-2 md:text-xl text-base'>{data?.SingleProduct?.title}</h1>
          <p className='w-[fit] text-sm leading-6 text-[#8e99c1]'>{data?.SingleProduct?.description}</p>
          {/* PRICE  */}
          <div className='font-popins mt-2'>
            <h1 className='text-lg font-semibold'>RS {data?.SingleProduct?.price - (data?.SingleProduct?.price * (data?.SingleProduct?.discount / 100))}</h1>
          </div>

          {/* DISCOUNTED PRICE  */}
          {

            (data?.SingleProduct?.price - (data?.SingleProduct?.price * (data?.SingleProduct?.discount / 100))) != data?.SingleProduct?.price && (
              <strike className='mt-2 text-slate-500 font-popins'>RS {data?.SingleProduct?.price}</strike>
            )
          }
        </div>

      </div>



    </div>
  )
}

export default SingleProductLayout
