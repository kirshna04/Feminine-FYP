import React, {useState } from 'react'
import { ImCross } from 'react-icons/im'
import { useUpdatePasswordMutation } from '../../../services/api\'s/common/userAccountApi'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import 'react-toastify/dist/ReactToastify.css';

const ChangePasswordPopup = ({ setshowUpdatePopup, accountId }) => {

    const [Data, setData] = useState({
        oldpassword: "",
        newpassword: ""
    })
    const [confirmPassword,setConfirmPassword]=useState("")
    const [showPassword, setshowPassword] = useState({ current: false, new: false,confirmnew:false})
    const [updatePassword] = useUpdatePasswordMutation()
    const [loading, setloading] = useState(false)


    const onChangeInput = (e) => {
        setData({ ...Data, [e.target.name]: e.target.value })
    }
    const SubmitData = async () => {
        setloading(true)
        if (!Data.oldpassword || !Data.newpassword) {
            toast.error("All Fields Are Required")
            setloading(false)
        }
        else if(Data.newpassword !==confirmPassword){
            toast.error("Password not match")
            setloading(false)
        }
        else {
            let result = await updatePassword({ id: accountId, password: Data })
            if (result.data) {
                setloading(false)
                toast.success("Password Changed")
                setloading(false)
                setTimeout(() => {
                    setshowUpdatePopup(false)
                }, 2000);
            }
            else {
                if (result?.error?.status === 401) {
                    setloading(false)
                    toast.error("Password Is Wrong")
                }
            }
        }
    }
    return (
        <div className='bg-white w-fit sm:w-[20rem] rounded-md p-4 shadow-otpShadow ml-2 mr-2 font-popins'>

            <div className='flex justify-between items-center '>
                <h1 className='text-base sm:text-lg'>Update Profile</h1>
                <ImCross onClick={() => setshowUpdatePopup(false)} className='cursor-pointer' />
            </div>

            <form method="post">
                <div className='mt-4 mb-4'>

                    <div className='relative'>
                        <input onChange={onChangeInput} type={showPassword.current ? "text" : "password"} name="oldpassword" style={{ border: "1px solid lightgray" }} placeholder='Enter Current Password' className='w-[100%] h-[2.2rem]  outline-none mb-2 bg-slate-100 pl-2 pr-2 rounded-md' />
                        {showPassword.current ?
                            <AiFillEyeInvisible onClick={() => setshowPassword({...showPassword, current: !showPassword.current })} className='absolute top-3 right-4 cursor-pointer' /> :
                            <AiFillEye onClick={() => setshowPassword({...showPassword, current: !showPassword.current })} className='absolute top-3 right-4 cursor-pointer' />
                        }
                    </div>

                    <div className='relative'>
                        <input onChange={onChangeInput} type={showPassword.new ? "text" : "password"} name='newpassword' style={{ border: "1px solid lightgray" }} placeholder='Enter New Password' className='w-[100%] h-[2.2rem]  outline-none mb-2 bg-slate-100 pl-2 pr-2 rounded-md' />
                        {showPassword.new ?
                            <AiFillEyeInvisible onClick={() => setshowPassword({...showPassword, new: !showPassword.new })} className='absolute top-3 right-4 cursor-pointer' /> :
                            <AiFillEye onClick={() => setshowPassword({...showPassword, new: !showPassword.new })} className='absolute top-3 right-4 cursor-pointer' />
                        }
                    </div>

                    <div className='relative'>
                        <input onChange={(e)=>setConfirmPassword(e.target.value)} type={showPassword.confirmnew ? "text" : "password"} style={{ border: "1px solid lightgray" }} placeholder='Confirm New Password' className='w-[100%] h-[2.2rem]  outline-none mb-2 bg-slate-100 pl-2 pr-2 rounded-md' />
                        {showPassword.confirmnew ?
                            <AiFillEyeInvisible onClick={() => setshowPassword({...showPassword, confirmnew: !showPassword.confirmnew })} className='absolute top-3 right-4 cursor-pointer' /> :
                            <AiFillEye onClick={() => setshowPassword({...showPassword, confirmnew: !showPassword.confirmnew })} className='absolute top-3 right-4 cursor-pointer' />
                        }
                    </div>
                </div>
            </form>


            <button onClick={SubmitData} className={"w-[100%] h-[2.5rem] tracking-wide text-sm shadow-otpShadow  bg-[#3b5877] text-white rounded-md"}>{!loading?"Update Password":"Loading ..."}</button>


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
        </div>
    )
}

export default ChangePasswordPopup