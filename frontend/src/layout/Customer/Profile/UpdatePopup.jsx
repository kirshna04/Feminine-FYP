import React, { useRef, useState } from 'react'
import { ImCross } from 'react-icons/im'
import { useUpdateBuyerProfileMutation } from '../../../services/api\'s/common/userAccountApi'
import Button from '../../../components/button/Button'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import ImagePopup from './ImagePopup'

const UpdatePopup = ({ setshowUpdatePopup, data, accountId }) => {

    const [updateBuyerProfile] = useUpdateBuyerProfileMutation()
    const [profileImage, setProfileImage] = useState([])

    const formatDate = (date) => {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };
    const currentDate = formatDate(new Date());
    const [profileData, setprofileData] = useState({
        name: data?.name,
        email: data?.email,
        city: data?.city ? data.city : "",
        country: data?.country ? data.country : "",
        lastPeriodDate:data?.lastPeriodDate?data?.lastPeriodDate:currentDate
    })
    const [loading, setloading] = useState(false)
    const [showImagePopup, setshowImagePopup] = useState(false)

    const inputRef = useRef(null);
    const handleOnChange = (e) => {
        setshowImagePopup(true)
        setProfileImage(e.target.files[0])
    };
    const handleClick = () => {
        inputRef.current.click();
    };

    const updateData = (e) => {
        e.preventDefault()
        setprofileData({ ...profileData, [e.target.name]: e.target.value })
    }

    const SubmitData = async () => {
        setloading(true)
        const formData = new FormData()
        formData.append("name", profileData?.name)
        formData.append("email", profileData?.email)
        formData.append("city", profileData?.city)
        formData.append("country", profileData?.country)
        formData.append("image", profileImage)
        formData.append("lastPeriodDate",profileData.lastPeriodDate)
        let result = await updateBuyerProfile({ accountId: accountId, profileData: formData })
        if (result?.data) {
            toast.success("Profile Updated")
            setloading(false)
            setTimeout(() => {
                setshowUpdatePopup(false)
            }, 2000);
        }
    }

    return (
        <div className='bg-white w-fit rounded-md p-4 shadow-otpShadow ml-2 mr-2 font-popins'>

            <div className='flex justify-between items-center '>
                <h1 className='text-base sm:text-lg'>Update Profile</h1>
                <ImCross onClick={() => setshowUpdatePopup(false)} className='cursor-pointer' />
            </div>

            <div className=' sm:flex sm:justify-between sm:items-center sm:gap-x-2 mt-4 '>
                <input name='name' onChange={updateData} defaultValue={profileData?.name} style={{ border: "1px solid lightgray" }} type="text" placeholder='Enter Your Name' className='flex-none w-[100%] outline-none  sm:flex-1 sm:mb-0 mb-2 bg-slate-100 h-[2.2rem] pl-2 pr-2 rounded-md' />
                <input name='email' onChange={updateData} defaultValue={profileData?.email} style={{ border: "1px solid lightgray" }} type="text" placeholder='Enter Your Name' className='flex-none w-[100%] outline-none sm:flex-1 bg-slate-100 h-[2.2rem] pl-2 pr-2 rounded-md' />
            </div>
            <div className='sm:flex sm:justify-between sm:items-center sm:gap-x-2 sm:mt-4 mt-2'>
                <input name='country' defaultValue={profileData?.country} onChange={updateData} style={{ border: "1px solid lightgray" }} type="text" placeholder='Enter Your Country' className='flex-none w-[100%] outline-none  sm:flex-1 sm:mb-0 mb-2 bg-slate-100 h-[2.2rem] pl-2 pr-2 rounded-md' />
                <input name='city' defaultValue={profileData?.city} onChange={updateData} style={{ border: "1px solid lightgray" }} type="text" placeholder='Enter Your City' className='flex-none w-[100%] outline-none  sm:flex-1 sm:mb-0 mb-2 bg-slate-100 h-[2.2rem] pl-2 pr-2 rounded-md' />
            </div>

            <div className='sm:mt-4 mt-2'>
                <input type="date" style={{ border: "1px solid lightgray" }} onChange={updateData} defaultValue={profileData?.lastPeriodDate} name="lastPeriodDate" className=' w-[100%] outline-none cursor-pointer sm:mb-0 mb-2 bg-slate-100 h-[2.2rem] pl-2 pr-2 rounded-md'/>
            </div>

            <div style={{ border: "1px solid lightgray" }} className={`h-[2.2rem] mt-4 flex justify-center items-center rounded-md`}>
                <label htmlFor="file-input">
                    <button className={`text-sm ${profileImage.length > 0 ? "text-[#eff3fc]" : "text-[gray]"}`} onClick={handleClick}>{profileImage.length === 0 ? "Upload Picture" : " Image Uploaded"}</button>
                </label>
                <input id="file-input" type="file" ref={inputRef} onChange={handleOnChange} style={{ display: 'none' }} />
            </div>

            <div className='mt-4' onClick={SubmitData}>
                <Button text={loading ? "Loading ..." : "Update Profile"} className={"w-[100%] h-[2.5rem] tracking-wide text-sm shadow-otpShadow  bg-[#3b5877] text-white rounded-md"} />
            </div>

            <ToastContainer
                position="top-right"
                autoClose={2500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            {
                showImagePopup && (
                    <div className=' absolute top-0 left-0 w-screen h-screen bg-black bg-opacity-50'>
                        <div className='flex justify-center items-center w-[100%] h-[100%]'>
                            <ImagePopup profileImage={profileImage} setProfileImage={setProfileImage} setshowImagePopup={setshowImagePopup} />
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default UpdatePopup
