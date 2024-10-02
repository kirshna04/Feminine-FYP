import React, { useState } from 'react'
import userImage from '../../../assets/userImage.webp'
import Button from '../../../components/button/Button'
import { useGetBuyerProfileQuery } from '../../../services/api\'s/common/userAccountApi'
import { jwtDecodeFunction } from '../../../helper/jwt'
import UpdatePopup from './UpdatePopup'
import ChangePasswordPopup from './ChangePasswordPopup'
import { Link, useNavigate } from 'react-router-dom'

const Profile = () => {
  const [accountId] = useState(jwtDecodeFunction().payload._id)
  const { data } = useGetBuyerProfileQuery(accountId)
  const [showUpdatePopup, setshowUpdatePopup] = useState(false)
  const [updatePasswordPopup, setupdatePasswordPopup] = useState(false)
  const date = data?.profile?.lastPeriodDate && Date.parse(data?.profile?.lastPeriodDate) ? new Date(data?.profile?.lastPeriodDate) : null;
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = date ? date.toLocaleDateString(undefined, options) : "Invalid Date";
  const nav = useNavigate();

  return (
    <>

      <div className='sm:p-5  block sm:flex font-popins p-4 relative '>

        <div className='sm:w-[15rem] sm:min-w-[15rem] w-[100%] sm:mb-0 mb-4 '>

          <div className=' shadow-otpShadow p-2 flex gap-3 items-center rounded-md'>

            <div>
              <img src={data?.profile?.image ? data?.profile.image : userImage} alt="" className='w-[4rem] h-[4rem] rounded-full bg-center' />
            </div>

            <div>
              <p className='text-slate-600 sm:text-sm text-lg'>{data?.profile?.name ? data?.profile.name : "Jonathon Parsons"}</p>
            </div>

          </div>

          <div className='shadow-otpShadow p-2 rounded-md mt-2'>
            <Link to="/history"><p className='mb-2 cursor-pointer text-slate-600' >My Orders</p></Link>
            {/* <p className='mb-2 cursor-pointer text-slate-600'>Wishlist</p> */}
            {/* <p className='mb-2 cursor-pointer text-slate-600'>Notification</p> */}
            <div className='w-[100%] h-[1px] mb-2 bg-gray-200'></div>
            <p className='mb-2 cursor-pointer text-slate-600' onClick={() => { localStorage.removeItem('token'); localStorage.removeItem('role'); nav('/account'); }}>Logout</p>
          </div>

        </div>

        <div className='flex-1 sm:ml-5 ml-0 shadow-otpShadow rounded-md pt-3 sm:pr-4 sm:pl-4 pl-3 pr-3 mb-[5rem] sm:mb-0'>

          <div className='flex justify-between items-center'>
            <h1 className='md:text-xl sm:text-sm text-base tracking-wide '>Customer Profile</h1>
            <Button onPressFunc={() => setshowUpdatePopup(true)} text={"Update Profile"} className={"md:w-[10rem] md:h-[2.5rem] w-[8rem] h-[2rem] tracking-wide text-sm shadow-otpShadow  bg-[#3b5877] text-white rounded-md"} />
          </div>

          <div className='w-[100%] h-[1px] bg-gray-200 mt-3 '></div>

          <div className='flex justify-between items-start'>

            <div className='mt-3 flex-1 pb-5'>
              <p className='text-slate-600 mb-4 md:text-base text-sm'>Name : <span className='text-black'>{data?.profile.name ? data?.profile.name : "Jonathon Parsons"}</span> </p>
              <p className='text-slate-600 mb-4 md:text-base text-sm'>Email : <span className='text-black'>{data?.profile.email ? data?.profile.email : "xyz@mail.com"}</span> </p>
              <p className='text-slate-600 mb-4 md:text-base text-sm'>Country : <span className='text-black'>{data?.profile?.country ? data?.profile?.country : "Not Specified"}</span> </p>
              <p className='text-slate-600 mb-4 md:text-base text-sm'>City : <span className='text-black'>{data?.profile?.city ? data?.profile?.city : "Not Specified"}</span> </p>
              <p className='text-slate-600 mb-4 md:text-base text-sm'>Last Period : <span className='text-black'>{data?.profile?.lastPeriodDate ? formattedDate : "Not Specified"}</span> </p>
              <p className='text-slate-600 mb-4 md:text-base text-sm'>Password : <span className='text-black'>***************</span></p>
              <div>
                <Button onPressFunc={() => setupdatePasswordPopup(true)} text={"Change Password"} className={"sm:w-[10rem] w-[100%] h-[2.5rem] text-sm shadow-otpShadow  bg-[#3b5877] text-white rounded-md"} />
              </div>
            </div>

            <div className='w-[1px] md:block hidden h-[19.4rem] bg-gray-200'></div>

            <div className='flex-[0.4] p-4 hidden md:block'>

              <div>
                <p className='text-lg mb-2 tracking-wide'>Profile Picture</p>
                <img src={data?.profile?.image ? data?.profile.image : userImage} alt="" className='w-[10rem] h-[10rem] rounded-md' />
              </div>
              <div>
                <Button onPressFunc={() => setshowUpdatePopup(true)} text={"Change Profile"} className={"w-[10rem] h-[2.5rem] mt-3 tracking-wide text-sm shadow-otpShadow  bg-[#3b5877] text-white rounded-md"} />
              </div>

            </div>

          </div>

        </div>

      </div>

      {
        showUpdatePopup && (
          <div className='bg-black absolute top-0 right-0 bg-opacity-50  w-[100%] h-[100%]'>
            <div className='flex justify-center items-center w-[100%] h-[100%]'>
              <UpdatePopup setshowUpdatePopup={setshowUpdatePopup} data={data?.profile} accountId={accountId} />
            </div>
          </div>

        )
      }

      {
        updatePasswordPopup && (
          <div className='bg-black absolute top-0 right-0 bg-opacity-50  w-[100%] h-[100%]'>
            <div className='flex justify-center items-center w-[100%] h-[100%]'>
              <ChangePasswordPopup setshowUpdatePopup={setupdatePasswordPopup} accountId={accountId} />
            </div>
          </div>

        )
      }

    </>
  )
}

export default Profile