import React, { useEffect, useState } from 'react'
import Input from '../input/Input'
import { AiFillHeart } from 'react-icons/ai'
import { FaSearch, FaUserAltSlash } from 'react-icons/fa'
import { BsFillPersonFill } from 'react-icons/bs'
import { HiMiniShoppingBag } from 'react-icons/hi2'
import { BiHomeAlt, BiLogoBlogger, BiSolidVideos } from 'react-icons/bi'
import { BiPhoneCall } from 'react-icons/bi'
import { useLocation, useNavigate } from 'react-router-dom'
import Logo from '../../assets/logo.png'
import { useGetProductMutation } from '../../services/api\'s/common/userAccountApi'

const Navbar = () => {
  const nav = useNavigate()
  const [profilePopup, setprofilePopup] = useState(false)
  const [itemName, setitemName] = useState('')
  const withoutPercentage = useLocation()?.search?.split("item=")[1]?.replace(/%20/g, ' ')
  const [getProduct] = useGetProductMutation()
  const [ProductData, setProductData] = useState([])

  const getProductFunction = async () => {
    let result = await getProduct()
    setProductData(result?.data?.AllProduct)
  }
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      itemName.length > 0 && nav(`/product?item=${itemName}`);
    }
  };

  useEffect(() => {
    getProductFunction()
  }, [])
  return (

    <div>

      <div className='flex justify-between items-center sm:p-5 p-3 h-[4rem] font-popins relative'>

        {/* LOGO  */}
        <div className='cursor-pointer' onClick={() => nav("/")}>
          <img src={Logo} alt="logo" className='w-[6rem]' loading={"true"} />
        </div>

        {/* SEARCH BAR  AND SUGGESTION */}

        <div className='relative hidden sm:block'>
          <Input onKeyDown={handleKeyPress} defaultValue={withoutPercentage ? withoutPercentage : itemName} onChangeFunc={(e) => setitemName(e?.target?.value)} placeholder={"Enter Product Name"} className={` outline-none w-[40vw] h-[2.8rem] bg-slate-100 rounded-3xl pl-5 pr-14`} />
          <div style={{ backgroundColor: "#72A0C1" }} className={`absolute top-[6.5px] right-3 w-[2rem] h-[2rem]  flex justify-center items-center rounded-full`}>
            <FaSearch onClick={() => itemName.length > 0 && nav(`/product?item=${itemName}`)} className='text-[#ffff] font-light cursor-pointer' />
          </div>
          {/* SUGGESTION  */}

          {
            itemName?.length > 0 && (
              <div className=' absolute top-12 bg-slate-100 p-2 rounded-md w-[40vw] h-[10rem] shadow-otpShadow z-50 overflow-y-auto'>
                {
                  itemName.length > 0 && (
                    ProductData.filter((filteritem, index) => {
                      return filteritem?.title?.toLowerCase().includes(itemName.toLowerCase())
                    })?.map((item) => {
                      return (
                        <p onClick={() => nav(`/product?item=${item?.title}`)} key={item?.id} className='text-sm mb-2 cursor-pointer text-[gray]'>{item?.title}</p>
                      )
                    })
                  )
                }
              </div>

            )
          }

        </div>
        {/* ICONS  */}

        <div className='flex gap-2'>

          <div style={{ backgroundColor: "#72A0C1" }} className={`hidden sm:flex justify-center items-center w-[2rem] h-[2rem] rounded-full`}>
            <HiMiniShoppingBag className='text-[#fff] cursor-pointer text-lg' onClick={() => nav('/cart')} />
          </div>

          <div style={{ backgroundColor: "#72A0C1" }} className={`flex justify-center items-center w-[2rem] h-[2rem] rounded-full`}>
            <AiFillHeart className='cursor-pointer text-[#fff] text-lg' onClick={() => nav('/favourite')} />
          </div>

          <div style={{ backgroundColor: "#72A0C1" }} className={`flex justify-center items-center w-[2rem] h-[2rem] rounded-full`}>
            {
              localStorage.getItem("token") && localStorage.getItem("role") === "buyer" ?
                <BsFillPersonFill className='text-[#fff] cursor-pointer text-lg' onClick={() => setprofilePopup(!profilePopup)} /> :
                <FaUserAltSlash className='text-[#fff] cursor-pointer text-lg' onClick={() => nav("/account")} />
            }
          </div>


        </div>

        {/* PROFILE POPUP  */}

        {
          profilePopup && localStorage.getItem("token") && localStorage.getItem("role") === "buyer" ?
            <div style={{ border: "1px solid lightgray" }} className='absolute right-[1rem] top-[4.2rem] w-[10rem] bg-white shadow-productShadow z-50 p-3 rounded-md'>

              <div className='mb-4 cursor-pointer'>
                <p onClick={() => nav("/buyer/profile")}>Profile</p>
              </div>

              <div className='mb-4 cursor-pointer'>
                <p onClick={() => nav("/history")}>History</p>
              </div>

              <div className='mb-2 cursor-pointer' onClick={() => { localStorage.removeItem('token'), localStorage.removeItem('role'), nav('/account') }}>
                <p>Logout</p>
              </div>

            </div>
            : null
        }

      </div>

      <div className='w-screen  h-[0.2px] bg-gray-200'></div>

      {/* RESPONSIVE NAVBAR  */}

      <div className='fixed flex justify-center items-center sm:hidden bottom-0 bg-white shadow-bottomNav w-screen p-2 h-[5rem] z-50'>

        <div className='flex sm:hidden justify-center items-center gap-6 ml-5 mr-5 sm:pl-2 sm:pr-2'>

          <div onClick={() => nav('/')} style={{ backgroundColor: "#72A0C1" }} className={`flex ml-1 justify-center items-center w-[2.5rem] h-[2.5rem] rounded-full`}>
            <BiHomeAlt className='text-[#fff] cursor-pointer text-3xl' />
          </div>

          <div onClick={() => nav('/contact')} style={{ backgroundColor: "#72A0C1" }} className={`flex justify-center items-center  w-[2.5rem] h-[2.5rem] rounded-full`}>
            <BiPhoneCall className='text-[#fff] cursor-pointer text-2xl' />
          </div>

          <div onClick={() => nav('/cart')} style={{ backgroundColor: "#0066b2 " }} className={`flex justify-center items-center w-[3.5rem] h-[3.5rem] rounded-full`}>
            <HiMiniShoppingBag className='text-[#fff] cursor-pointer text-3xl' />
          </div>

          <div onClick={() => nav('/video')} style={{ backgroundColor: "#72A0C1" }} className={`flex justify-center items-center  w-[2.5rem] h-[2.5rem] rounded-full`}>
            <BiSolidVideos className='text-[#fff] cursor-pointer text-2xl' />
          </div>

          <div onClick={() => nav('/blog')} style={{ backgroundColor: "#72A0C1" }} className={`mr-1 flex justify-center items-center  w-[2.5rem] h-[2.5rem] rounded-full`}>
            <BiLogoBlogger className='text-[#fff] cursor-pointer text-2xl' />
          </div>

        </div>
      </div>

    </div>

  )
}

export default Navbar