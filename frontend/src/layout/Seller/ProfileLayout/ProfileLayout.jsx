import React, { useState } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import UpdatePopup from './UpdatePopup'
import ChangePasswordPopup from './UpdatePassword'
import { SellerjwtDecodeFunction } from '../../../helper/jwt'
import { useGetSellerProfileQuery } from '../../../services/api\'s/common/userAccountApi'
import { useNavigate } from 'react-router-dom'

const ProfileLayout = ({ setshowLeftSideBar, showLeftSideBar }) => {
  const [showUpdatePopup, setshowUpdatePopup] = useState(false)
  const [changePasswordPopup, setchangePasswordPopup] = useState(false)
  const [accountId] = useState(SellerjwtDecodeFunction().payload._id)
  const { data } = useGetSellerProfileQuery(accountId)
  const nav = useNavigate();


  return (

    <>
      <div className='font-popins flex flex-col w-[100%] h-[100vh] bg-[#fbfcfe] overflow-y-auto pt-5 pl-5 pr-5 md:pl-10 md:pr-10 overflow-x-auto relative'>

        <div className='flex justify-between items-center'>
          <div className='flex gap-x-4 items-center'>
            {!showLeftSideBar && (
              <div onClick={() => setshowLeftSideBar(true)} className='bg-[#eff3fc] min-w-[2.5rem] md:hidden min-h-[2.5rem] flex justify-center items-center rounded-md'>
                <GiHamburgerMenu />
              </div>
            )}
            <h1 className='text-xl font-semibold'>Profile Page .</h1>

          </div>
          <div onClick={() => setshowUpdatePopup(true)}>
            <button onClick={() => setshowUpdatePopup(true)} className='sm:w-[10rem] w-[7rem] h-[2rem] sm:h-[2.5rem] text-xs sm:text-sm tracking-wider bg-[#4f619f] text-[#ffff] rounded-md outline-none border-none'>Update Profile</button>
          </div>
        </div>

        {/* MAIN SECTION  */}

        <div className='flex items-center lg:flex-row flex-col  justify-center mt-[2rem] lg:mt-[7rem]'>

          <div className='lg:w-[18rem] w-[100%] lg:mb-0 mb-3 h-[17rem]'>

            <div className='shadow-otpShadow w-[100%] rounded-md flex items-center p-2 gap-x-3'>
              <img className='w-[4rem] h-[4rem] bg-center rounded-full' src={data?.image ? data?.image : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzon50OBw7lo4WabzkwazOxyN_GzgubVoV_JwcvPCAnZlT79a7-xGuDFgJxo47zRR17o0&usqp=CAU"} alt="" />
              <p>{data?.name ? data?.name : "Wole Michoel"}</p>
            </div>

            <div className='shadow-otpShadow w-[100%] p-3 mt-4 rounded-md'>
              <p className='mb-3 cursor-pointer tracking-wider' onClick={() => nav("/seller/dashboard/orders")}>Orders</p>
              {/* <p className='mb-3 cursor-pointer tracking-wider' >Notification</p> */}
              <p className='mb-3 cursor-pointer tracking-wider' onClick={() => nav("/seller/dashboard/products")}>Products</p>
              {/* <p className='mb-3 cursor-pointer tracking-wider'>History</p> */}
            </div>

          </div>

          <div className='flex-1 w-[100%] h-[16.5rem] ml-0 lg:ml-5 shadow-otpShadow rounded-md p-3'>
            <h1 className='text-xl tracking-wider'>Seller Profile</h1>
            <div className='w-[100%] h-[1px] bg-gray-200 mt-3 mb-3'></div>
            <p className='mb-2 tracking-wider'>Name: {data?.name ? data?.name : "Wole Michoel"}</p>
            <p className='mb-2 tracking-wider'>Email: {data?.email ? data?.email : "xyz@mail.com"}</p>
            <p className='mb-2 tracking-wider'>Country: {data?.country ? data?.country : "Not Specified"}</p>
            <p className='mb-6 tracking-wider'>City: {data?.city ? data?.city : "Not Specified"}</p>
            <button onClick={() => setchangePasswordPopup(true)} className={"sm:w-[10rem] mb-2 w-[100%] h-[2.5rem] text-sm shadow-otpShadow  bg-[#3b5877] text-white rounded-md"}>Change Password</button>
          </div>
        </div>

      </div >
      {
        showUpdatePopup && (

          <div className='absolute w-[100%] top-0 h-screen bg-black bg-opacity-50'>
            <div className='md:w-[80%] w-[100%] h-[100%] flex justify-center items-center'>
              <UpdatePopup setshowUpdatePopup={setshowUpdatePopup} data={data} accountId={accountId} />
            </div>
          </div>
        )
      }
      {
        changePasswordPopup && (

          <div className='absolute w-[100%] top-0 h-screen bg-black bg-opacity-50'>
            <div className='md:w-[80%] w-[100%] h-[100%] flex justify-center items-center'>
              <ChangePasswordPopup setshowUpdatePopup={setchangePasswordPopup} accountId={accountId} />
            </div>
          </div>
        )
      }
    </>
  )
}

export default ProfileLayout
