import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { BsFilterRight } from 'react-icons/bs'
import ProductImage1 from '../../../assets/always.png'
import ProductImage2 from '../../../assets/laser.png'
import './style.css'
import { FaStar } from 'react-icons/fa'
import { AiFillEye } from 'react-icons/ai';
import Button from '../../../components/button/Button'
import { ImCross } from "react-icons/im"
import { FaCaretDown } from "react-icons/fa";

const SearchItem = () => {
  const [searchValue, setsearchValue] = useState("")
  const [showFilter, setshowFilter] = useState(false)
  const location = useLocation().search.split("item=")[1]
  const withoutPercentage = location.replace(/%20/g, ' ')

  const [priceFilteShow, setpriceFilteShow] = useState(false)
  const [ratingFilterShow, setratingFilterShow] = useState(false)
  const [sellingFilter, setsellingFilter] = useState(false)
  const [dateFilter, setdateFilter] = useState(false)


  const nav = useNavigate()
  useEffect(() => {
    setsearchValue(withoutPercentage)
  }, [location])

  const arr2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 12, 13, 13, 1, 4, 13, 3, 3, 33, 3, 3, 3, 3]
  const arr = [1, 2, 3, 4, 5]

  return (

    <div className='relative'>

      <div className='flex h-[90vh] overflow-y-auto font-popins overflow-x-hidden'>

        {/* LEFT FILTER BAR  */}
        {/* <div className='sm:w-[13rem] sm:block hidden p-3'> */}

          {/* FILTER HEADING  */}
          {/* <div className='flex gap-3 items-center'>
            <BsFilterRight className='text-xl' />
            <h1 className='text-lg tracking-wide'>Filter Product</h1>
          </div>
          <div className='w-[100%] h-[1px] bg-gray-200 mt-2 mb-2'></div> */}
          {/* MAIN FILTER */}

          {/* FILTER BY PRICE  */}
          {/* <div className='mt-3'>
            <div className='flex justify-between items-center'>
              <p>Filter By Price</p>
              <FaCaretDown onClick={() => setpriceFilteShow(!priceFilteShow)} />
            </div>
            <div className='w-[100%] h-[1px] bg-gray-200 mt-2 mb-2'></div>
            {
              priceFilteShow && (
                <div className='mt-2'>
                  <div className='flex gap-3 mb-2'>
                    <input type="checkbox" />
                    <p>Highest</p>
                  </div>
                  <div className='flex gap-3'>
                    <input type="checkbox" />
                    <p>Lowest</p>
                  </div>
                </div>

              )
            }
          </div> */}

          {/* FILTER BY DATE  */}
          {/* <div className='mt-3'>
            <div className='flex justify-between items-center'>
              <p>Filter By Date</p>
              <FaCaretDown onClick={() => setdateFilter(!dateFilter)} />
            </div>
            <div className='w-[100%] h-[1px] bg-gray-200 mt-2 mb-2'></div>
            {
              dateFilter && (
                <div className='mt-2'>
                  <div className='flex gap-3 mb-2'>
                    <input type="checkbox" />
                    <p>Newest</p>
                  </div>
                  <div className='flex gap-3'>
                    <input type="checkbox" />
                    <p>Oldest</p>
                  </div>
                </div>
              )
            }
          </div> */}

          {/* FILTER BY RATING  */}
          {/* <div className='mt-3'>

            <div className='flex justify-between items-center'>
              <p>Filter By Rating</p>
              <FaCaretDown onClick={() => setratingFilterShow(!ratingFilterShow)} />
            </div>
            <div className='w-[100%] h-[1px] bg-gray-200 mt-2 mb-2'></div>
            {
              ratingFilterShow && (
                <div className='mt-2'>
                  <div className='flex gap-3 mb-2'>
                    <input type="checkbox" />
                    <p>Highest</p>
                  </div>
                  <div className='flex gap-3'>
                    <input type="checkbox" />
                    <p>Lowest</p>
                  </div>
                </div>
              )
            }

          </div> */}

          {/* FILTER BY SELLING  */}
          {/* <div className='mt-3'>

            <div className='flex justify-between items-center'>
              <p>Filter By Selling</p>
              <FaCaretDown onClick={() => setsellingFilter(!sellingFilter)} />
            </div>
            <div className='w-[100%] h-[1px] bg-gray-200 mt-2 mb-2'></div>
            {
              sellingFilter && (
                <div className='mt-2'>
                  <div className='flex gap-3 mb-2'>
                    <input type="checkbox" />
                    <p>Highest</p>
                  </div>
                  <div className='flex gap-3'>
                    <input type="checkbox" />
                    <p>Lowest</p>
                  </div>
                </div>
              )
            }

          </div>
        </div> */}

        <div className='w-[1px] h-[100%] bg-gray-200'></div>

        {/* RIGHT MAIN PRODUCT  */}

        <div className="flex-1 sm:p-3 p-0 ">

          <div className='flex gap-3 items-center mt-2 sm:mt-0'>
            <BsFilterRight onClick={() => setshowFilter(!showFilter)} className='text-2xl ml-3 block cursor-pointer' />
            <h1 className='text-lg'>Search Results</h1>
          </div>

          <div className='w-[100%] h-[1px] bg-gray-200 mt-2 mb-5'></div>

          {/* MAIN PRODUCT LISTING  */}

          <div className='h-[80.3vh] flex-1 overflow-y-auto'>

            <div className='mb-[5rem] sm:mb-0 flex justify-center items-center'>

              <div className='product'>
                {arr2?.map((item, index) => {
                  return (
                    <div key={index + 1} style={{ border: "1px solid #ebeaea" }} className={`cursor-pointer sm:flex-none flex-1 overflow-y-auto pb-2 bg-white relative rounded-lg shadow-productShadow pl-1 pr-1`}>
                      {/* IMAGE  */}
                      <div className='flex justify-center items-center mt-5'>
                        <img src={index % 2 === 0 ? ProductImage1 : ProductImage2} alt="" className=' w-[8rem] h-[8rem]' />
                      </div>

                      {/* CART ICON  */}
                      <div style={{ backgroundColor: "#72A0C1" }} className=' cursor-pointer absolute top-2 right-3 w-[2rem] h-[2rem]  flex justify-center items-center rounded-full'>
                        <AiFillEye onClick={() => nav("/product/1")} className='text-lg text-white' />
                      </div>

                      {/* TITLE DESCRIPTION RATING */}

                      <div className='pl-2 pr-2'>
                        <p className='text-xl mb-1 font-popins'>Always</p>
                        <p className='text-sm text-slate-600 mb-1 custom-ellipsis'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque pariatur eaque quasi harum!</p>

                        <div className='flex gap-1 items-center mt-2'>
                          {arr?.map((item, index) => {
                            return (
                              <FaStar key={index} className='text-gray-700' />
                            )
                          })}
                        </div>

                      </div>

                      {/* PRICE  */}

                      <div className='flex justify-end items-end pr-2 font-popins mt-2'>
                        <p className='text-xl text-slate-600 font-semibold'>Rs 5000</p>
                      </div>

                      {/* ADD TO CART BUTTON  */}

                      <div className='pl-2 pr-2 mt-4'>
                        <Button text={"Add To Cart"} className={"w-[100%] h-[2.4rem] font-popins bg-[#3b5877] text-white rounded-md"} />
                      </div>
                    </div>
                  )
                })}

              </div>
            </div>


          </div>

        </div>

      </div>

      {/* RESPONSIVE PRODUCT FILTER  */}
      {
        showFilter &&
        <div className='w-screen h-max p-3 block  bg-white absolute top-0'>
          <div className='w-[100%] h-[1px] bg-gray-200 mt-2 mb-2'></div>

          <div className='mb-[5rem] '>
            {/* FILTER HEADING  */}
            <div className='flex justify-between items-center'>
              <div className='flex gap-3 items-center'>
                <BsFilterRight onClick={() => setshowFilter(!showFilter)} className='text-xl' />
                <h1 className='text-lg tracking-wide'>Filter Product</h1>
              </div>
              <div>
                <ImCross onClick={() => setshowFilter(!showFilter)} className='text-lg' />
              </div>
            </div>
            <div className='w-[100%] h-[1px] bg-gray-200 mt-2 mb-2'></div>
            {/* MAIN FILTER */}

            {/* FILTER BY PRICE  */}
            <div className='mt-3'>
              <p>Filter By Price</p>
              <div className='w-[100%] h-[1px] bg-gray-200 mt-2 mb-2'></div>
              <div className='mt-2'>
                <div className='flex gap-3 mb-2'>
                  <input type="checkbox" />
                  <p>Highest</p>
                </div>
                <div className='flex gap-3'>
                  <input type="checkbox" />
                  <p>Lowest</p>
                </div>
              </div>
            </div>

            {/* FILTER BY DATE  */}
            <div className='mt-3'>
              <p className='textlg tracking-wide'>Filter By Date</p>
              <div className='w-[100%] h-[1px] bg-gray-200 mt-2 mb-2'></div>

              <div className='mt-2'>
                <div className='flex gap-3 mb-2'>
                  <input type="checkbox" />
                  <p>Newest</p>
                </div>
                <div className='flex gap-3'>
                  <input type="checkbox" />
                  <p>Oldest</p>
                </div>
              </div>
            </div>

            {/* FILTER BY RATING  */}
            <div className='mt-3'>

              <p className='textlg tracking-wide'>Filter By Rating</p>
              <div className='w-[100%] h-[1px] bg-gray-200 mt-2 mb-2'></div>

              <div className='mt-2'>
                <div className='flex gap-3 mb-2'>
                  <input type="checkbox" />
                  <p>Highest</p>
                </div>
                <div className='flex gap-3'>
                  <input type="checkbox" />
                  <p>Lowest</p>
                </div>
              </div>

            </div>

            {/* FILTER BY SELLING  */}
            <div className='mt-3'>

              <p className='textlg tracking-wide'>Filter By Selling</p>
              <div className='w-[100%] h-[1px] bg-gray-200 mt-2 mb-2'></div>

              <div className='mt-2'>
                <div className='flex gap-3 mb-2'>
                  <input type="checkbox" />
                  <p>Highest</p>
                </div>
                <div className='flex gap-3'>
                  <input type="checkbox" />
                  <p>Lowest</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default SearchItem