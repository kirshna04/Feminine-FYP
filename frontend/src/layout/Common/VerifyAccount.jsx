import React, { useEffect, useState } from 'react'
import Button from '../../components/button/Button';
import OtpInput from 'react-otp-input';
import women from '../../assets/account.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useVerifyAccountMutation, useResendOtpMutation } from '../../services/api\'s/common/userAccountApi';
import { useNavigate } from 'react-router-dom';

const VerifyAccount = () => {
    const [timer, setTimer] = useState(300);
    const [otp, setOtp] = useState('');
    const [loader, setloader] = useState(false)
    const [verifyAccount] = useVerifyAccountMutation()
    const [resendOtp] = useResendOtpMutation()
    const nav = useNavigate()
    let id = localStorage.getItem("id")


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


    const verifyOtp = async (e) => {
        setloader(true)
        e.preventDefault()
        if (otp.length === 0) {
            toast.error("Otp Required")
        }
        else {
            try {
                let result = await verifyAccount({ id: id, otp: otp })
                if (result.data) {
                    setloader(false)
                    toast.success("Account Verified")
                    localStorage.removeItem("id")
                    result.data.role === "buyer" ? localStorage.setItem("token", result.data.token) : localStorage.setItem("sellertoken", result.data.token)
                    localStorage.setItem("role", result.data.role)
                    setTimeout(() => {
                        result.data.role === "buyer" ? nav("/") : nav("/seller/dashboard")
                    }, 3000);
                }
                else if (result.error) {
                    if (result.error.status === 403) {
                        setloader(false)
                        toast.error("Invalid Otp")
                    }
                    else if (result.error.status === 410) {
                        setloader(false)
                        toast.error("Otp Has Been Expired")
                        setTimeout(() => {
                            setOtp("")
                        }, 3000);
                    }
                }

            }
            catch (error) {
                setloader(false)
                console.log(error)
            }
        }
    }

    const resendOtpFunc = async (e) => {
        e.preventDefault()
        let result = await resendOtp(id)
        if (result.data) {
            toast.success("Otp Send")
        }
    }

    return (

        <div>
            <div className='font-popins relative h-screen'>

                {/* LOGO  */}
                <div className='sm:absolute sm:mt-0 sm:ml-0 mt-3 ml-3 top-3 left-4 cursor-pointer' onClick={() => nav("/account")}>
                    <h1>Feminine Care</h1>
                </div>

                {/* MAIN CONTAINER  */}
                <div className='w-screen h-screen lg:h-[90vh] block sm:flex justify-center'>

                    <form onSubmit={verifyOtp} className='w-screen ml-2 mr-2 block sm:flex justify-between md:justify-around items-center p-2'>

                        {/* LEFT SIDE CONTAINER  */}
                        <div>
                            <h1 className='text-3xl font-bold mb-1 sm:mb-2 mt-[2rem] sm:mt-0'>Verify Your Account </h1>
                            <h1 className='text-2xl mb-2 sm:mb-7'>Feminine Care</h1>
                            <p className='text-base'>Verification Of Your Account! Made Easy</p>
                            <p className='text-base mb-10 sm:mb-0'>You can <span className='text-[#4D47C3]'>Verify it</span></p>
                            <h1 className='block sm:hidden text-2xl'>Let's Verify</h1>
                        </div>

                        {/* MAIN INPUT FIELDS  */}
                        <div className='flex ml-0 mr-0 h-[50vh] justify-center items-center flex-col sm:block'>

                            <h1 className='text-2xl mb-4 md:mb-10 hidden sm:block'>Verify</h1>
                            <OtpInput value={otp} onChange={setOtp} numInputs={4} renderInput={(props) => <input {...props} />} inputStyle={{ width: "4rem", height: "4rem", backgroundColor: "#F0EFFF", marginRight: "10px", color: "#756dfd", marginBottom: "2rem", outline: "none", boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px", fontWeight: "bolder", fontSize: "1.5rem" }} />

                            <div className='w-[20rem] sm:w-[14rem] md:w-[18rem]'>
                                <p className={`flex justify-end mr-6 sm:mr-0  text-lg mb-4 ${timer === 0 ? "text-red-600" : "text-[#4D47C3]"}`}>{formatTime(timer)}</p>
                            </div>

                            <div className='w-[20rem] sm:w-[14rem] md:w-[18rem]' onClick={resendOtpFunc}>
                                <p className='mb-5 float-right sm:float-right text-[#B0B0B0] cursor-pointer'>Didn' t recieve OTP ? Resend</p>
                            </div>


                            {/* BUTTON  */}
                            <Button text={loader?"Loading ..." :"Verify OTP"} className={"w-[20rem] sm:w-[14rem]  md:w-[18rem] h-[3rem] bg-[#4D47C3] shadow-btnshadow1 text-white rounded-[8px] tracking-wider"} />


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
        </div>
    )
}

export default VerifyAccount
