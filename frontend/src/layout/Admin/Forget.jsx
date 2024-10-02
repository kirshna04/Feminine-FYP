import React, { useEffect, useState } from 'react'
import women from '../../assets/account.png'
import Input from '../../components/input/Input'
import Button from '../../components/button/Button'
import OtpInput from 'react-otp-input';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useChangePasswordMutation, useSendOtpMutation, useVerifyOtpMutation } from '../../services/api\'s/common/userAccountApi';
import { useNavigate } from 'react-router-dom';

const Forget = () => {
    const [timer, setTimer] = useState(100);
    const [isReset, setisReset] = useState(true)
    const [isOtp, setisOtp] = useState(false)
    const [confirmChange, setconfirmChange] = useState(false)
    const nav = useNavigate()
    const [showPassword, setshowPassword] = useState(false)
    const [showConfirmPassword, setshowConfirmPassword] = useState(false)
    const [sendOtp] = useSendOtpMutation()
    const [verifyOtp] = useVerifyOtpMutation()
    const [changePassword] = useChangePasswordMutation()
    const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!])[A-Za-z\d@#$%^&+=!]{8,}$/;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const [loading, setloading] = useState(false)
    // RESET PASSWORD EMAIL SCREEN STATE AND FUNCTION
    const [email, setemail] = useState('')

    const onChangeEmail = (e) => {
        setemail(e.target.value)
    }

    const submitEmailForm = async (e) => {
        setloading(true)
        e.preventDefault()
        if (!email) {
            setloading(false)
            toast.error("Email Is Required")
        }
        else if (!emailPattern.test(email)) {
            setloading(false)
            toast.error("Invalid Email Format")
        }
        else {
            try {
                let result = await sendOtp({ email: email })
                if (result?.data) {
                    if (result?.data?.msg == "Otp Has Been To Your Email") {
                        setloading(false)
                        toast("Otp Has Sent To Your Email")
                        localStorage.setItem("email", email)
                        setTimeout(() => {
                            setisReset(false)
                            setisOtp(true)
                            setemail("")
                        }, 3000);
                    }
                }
                else if (result?.error) {
                    if (result.error.status === 404) {
                        setloading(false)
                        toast.error("Email Not Registered")
                    }
                }
            }
            catch (error) {
                setloading(false)
                console.log(error, 'error')
            }
        }
    }


    // RESET PASSWORD OTP SCREEN STATE AND FUNCTION 
    const [otp, setOtp] = useState('');

    const submitOTPForm = async (e) => {
        e.preventDefault()
        setloading(true)
        if (!otp) {
            toast.error("Please Fill The Otp")
            setloading(false)
        }
        else {
            try {
                let result = await verifyOtp({ email: localStorage.getItem("email"), otp: otp })
                if (result?.data) {
                    if (result.data.message === "Otp Has Been Verified") {
                        setloading(false)
                        toast("Otp Verified")
                        setTimeout(() => {
                            setisOtp(false)
                            setconfirmChange(true)
                            setOtp("")
                        }, 3000);
                    }
                }
                else if (result.error) {
                    if (result.error.status === 403) {
                        toast.error("Invalid Otp")
                        setloading(false)
                    }
                    else if (result.error.status === 410) {
                        toast.error("Otp Has Been Expired")
                        setloading(false)
                        setTimeout(() => {
                            setisReset(true)
                            setisOtp(false)
                            setOtp("")
                        }, 3000);
                    }
                }
            }
            catch (error) {
                console.log(error, 'error')
                setloading(false)
            }
        }
    }

    // RESET PASSWORD PASSWORD CHANGE SCREEN STATE AND FUNCTION 
    const [password, setpassword] = useState("")
    const [c_password, setc_password] = useState("")
    const passwordFunc = (e) => {
        setpassword(e.target.value)
    }
    const c_passwordFunc = (e) => {
        setc_password(e.target.value)
    }
    const changepasswordForm = async (e) => {
        setloading(true)
        e.preventDefault()
        if (!password || !c_password) {
            toast.error("All Fields Are Required")
            setloading(false)
        }
        else if (password != c_password) {
            toast.error("Password Not Match")
            setloading(false)
        }
        else if (!passwordPattern.test(password)) {
            toast.error("Passowrd Must Contain 8$Aa")
            setloading(false)
        }
        else {
            try {
                let result = await changePassword({ email: localStorage.getItem("email"), password: password })
                if (result.data) {
                    if (result.data.message === "Your Password Has Been Changed") {
                        setloading(false)
                        toast("Password Changed")
                        localStorage.removeItem("email")
                        setTimeout(() => {
                            nav('/account')
                        }, 3000);
                    }
                }
                else if (result.error) {
                    if (result.error.status === 401) {
                        setloading(false)
                        toast.error("Otp Not Verified")
                        localStorage.removeItem("email")
                        setTimeout(() => {
                            setisReset(true)
                            setconfirmChange(false)
                            setpassword("")
                        }, 3000);
                    }
                }
            }
            catch (error) {
                console.log(error, 'error')
                setloading(false)
            }
        }
    }


    // TIMER FUNCTIONALITY
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    }
    const decrementTimer = () => {
        if (timer > 0) {
            setTimer(timer - 1);
        }
    };
    useEffect(() => {
        const timerId = setInterval(decrementTimer, 1000);
        return () => {
            clearInterval(timerId);
        };
    }, [timer]);
    return (

        <>
            <div className='font-popins relative h-screen'>

                {/* LOGO  */}
                <div className='sm:absolute sm:mt-0 sm:ml-0 mt-3 ml-3 top-3 left-4'>
                    <h1>Feminine Care</h1>
                </div>

                {/* MAIN CONTAINER  */}
                <div className='w-screen h-screen lg:h-[90vh] block sm:flex justify-center'>
                    <form onSubmit={(e) => {
                        e.preventDefault()
                        if (isReset) {
                            submitEmailForm(e);
                        } else if (isOtp) {
                            submitOTPForm(e);
                        } else if (confirmChange) {
                            changepasswordForm(e);
                        }
                    }} className='w-screen ml-2 mr-2 block sm:flex justify-between md:justify-around items-center p-2'>

                        {/* LEFT SIDE CONTAINER  */}
                        <div>
                            <h1 className='text-3xl font-bold mb-1 sm:mb-2 mt-[2rem] sm:mt-0'>Reset Your Password </h1>
                            <h1 className='text-2xl mb-2 sm:mb-7'>Feminine Care</h1>
                            <p className='text-base'>Forgot your password? No worries!</p>
                            <p className='text-base mb-10 sm:mb-0'>You can <span className='text-[#4D47C3]'>reset it</span></p>
                            <h1 className='block sm:hidden text-2xl'>Reset Password</h1>
                        </div>

                        {/* MAIN INPUT FIELDS  */}
                        <div className='flex ml-0 mr-0 h-[50vh] justify-center items-center flex-col sm:block'>

                            <h1 className='text-2xl mb-4 md:mb-10 hidden sm:block'>Reset</h1>

                            {
                                isReset ? <Input placeholder={"Enter Your Email"} onChangeFunc={onChangeEmail} type={"email"} name={"email"} className={"mb-6 placeholder:text-[#A7A3FF] bg-[#F0EFFF] w-[20rem] sm:w-[14rem] md:w-[18rem] h-[3rem] rounded-[8px] pl-3 pr-3 outline-none"} /> : null
                            }

                            {
                                isOtp ? <OtpInput value={otp} onChange={setOtp} numInputs={4} renderInput={(props) => <input {...props} />} inputStyle={{ width: "4rem", height: "4rem", backgroundColor: "#F0EFFF", marginRight: "10px", color: "#756dfd", marginBottom: "2rem", outline: "none", boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px", fontWeight: "bolder", fontSize: "1.5rem" }} /> : null
                            }
                            {
                                isOtp ?
                                    <div className='w-[20rem] sm:w-[14rem] md:w-[18rem]'>
                                        <p className={`flex justify-end mr-6 sm:mr-0  text-lg mb-4 ${timer === 0 ? "text-red-600" : "text-[#4D47C3]"}`}>{formatTime(timer)}</p>
                                    </div>
                                    : null
                            }

                            {
                                confirmChange ?
                                    <div className='relative'>
                                        <Input placeholder={"Enter New Password"} onChangeFunc={passwordFunc} type={!showPassword ? "password" : "text"} name={"password"} className={"mb-6 placeholder:text-[#A7A3FF] bg-[#F0EFFF] w-[20rem] sm:w-[14rem] md:w-[18rem] h-[3rem] rounded-[8px] pl-3 pr-[3.4rem]  outline-none"} />
                                        {showPassword ? <AiFillEyeInvisible className="absolute top-3 cursor-pointer right-5 text-white bg-[#4D47C3] w-[1.5rem] h-[1.5rem] p-1 rounded-full" onClick={() => setshowPassword(!showPassword)} /> :
                                            <AiFillEye onClick={() => setshowPassword(!showPassword)} className="absolute top-3 cursor-pointer right-5 text-white bg-[#4D47C3] w-[1.5rem] h-[1.5rem] p-1 rounded-full" />}
                                    </div>
                                    : null
                            }
                            {
                                confirmChange ?
                                    <div className='relative'>
                                        <Input placeholder={"Confirm New Password"} onChangeFunc={c_passwordFunc} type={!showConfirmPassword ? "password" : "text"} name={"c_password"} className={"mb-6 placeholder:text-[#A7A3FF] bg-[#F0EFFF] w-[20rem] sm:w-[14rem] md:w-[18rem] h-[3rem] rounded-[8px] pl-3 pr-[3.4rem]  outline-none"} />
                                        {showConfirmPassword ? <AiFillEyeInvisible className="absolute top-3 cursor-pointer right-5 text-white bg-[#4D47C3] w-[1.5rem] h-[1.5rem] p-1 rounded-full" onClick={() => setshowConfirmPassword(!showConfirmPassword)} /> :
                                            <AiFillEye onClick={() => setshowConfirmPassword(!showConfirmPassword)} className="absolute top-3 cursor-pointer right-5 text-white bg-[#4D47C3] w-[1.5rem] h-[1.5rem] p-1 rounded-full" />}
                                    </div>
                                    : null
                            }

                            {
                                isOtp ?
                                    <div className='w-[20rem] sm:w-[14rem] md:w-[18rem]'>
                                        <p className='mb-5 float-right sm:float-right text-[#B0B0B0] cursor-pointer'>Didn' t recieve OTP ?</p>
                                    </div>
                                    : null
                            }

                            {/* BUTTON SETUP  */}

                            {
                                isReset ? <Button text={loading ? "Loading ..." : "Send OTP"} className={"w-[20rem] sm:w-[14rem]  md:w-[18rem] h-[3rem] bg-[#4D47C3] shadow-btnshadow1 text-white rounded-[8px]"} /> : null
                            }

                            {
                                isOtp ? <Button text={loading ? "Loading ..." : "Verify OTP"} className={"w-[20rem] sm:w-[14rem]  md:w-[18rem] h-[3rem] bg-[#4D47C3] shadow-btnshadow1 text-white rounded-[8px] tracking-wider"} /> : null
                            }

                            {
                                confirmChange ? <Button text={loading ? "Loading ..." : "Change Password"} className={"w-[20rem] sm:w-[14rem]  md:w-[18rem] h-[3rem] bg-[#4D47C3] shadow-btnshadow1 text-white rounded-[8px] tracking-wider"} /> : null
                            }

                        </div>

                    </form>
                </div>

                {/* BOTTOM IMAGE  */}
                <img src={women} alt="image" className='hidden lg:block absolute bottom-[0rem] left-[40%] h-[25rem]' />

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
        </>
    )
}

export default Forget
