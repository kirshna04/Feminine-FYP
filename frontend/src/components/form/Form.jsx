import React, { useEffect, useState } from 'react'
import women from '../../assets/account.png'
import Input from '../input/Input'
import Button from '../button/Button'
import { useNavigate } from 'react-router-dom'
import { accountScreensColor } from '../../constant/color'
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'
import { BiDownArrow } from 'react-icons/bi'
import { useLoginUserMutation, useRegisterUserMutation } from '../../services/api\'s/common/userAccountApi'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Form = () => {
  const nav = useNavigate()
  const [isLogin, setisLogin] = useState(true)
  const [showPassword, setshowPassword] = useState(false);
  const [registerInfo, setRegisterInfo] = useState({
    role: "Select Your Role",
    name: "",
    email: "",
    password: ""
  })
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: ""
  })
  const [confirmPassword, setconfirmPassword] = useState("")
  const [showPasswordEye2, setshowPasswordEye2] = useState(false)
  const [showRole, setshowRole] = useState(false)
  const [registerUser] = useRegisterUserMutation()
  const [loginUser] = useLoginUserMutation()
  const [loading, setloading] = useState(false)

  const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!])[A-Za-z\d@#$%^&+=!]{8,}$/;
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const onchangeRegisterInput = (e) => {
    if (e.target.name === "role") {
      const selectedRole = e.target.value;
      const roleMapping = {
        "Customer": "buyer",
        "Seller": "seller"
      };
      setRegisterInfo({ ...registerInfo, role: roleMapping[selectedRole] });
    } else {
      setRegisterInfo({ ...registerInfo, [e.target.name]: e.target.value });
    }
  };

  const onchangeLoginInput = (e) => {
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value })
  }

  const submitRegisterationForm = async (e) => {
    setloading(true)
    e.preventDefault();
    if (!registerInfo?.email || !registerInfo.password || !registerInfo.name) {
      toast.error("All Fields Are Required")
      setloading(false)
    }
    else if (registerInfo.role === "Select Your Role") {
      toast.error("Please Select Account Type")
      setloading(false)
    }
    else if (registerInfo.role === "") {
      toast.error("Please Select Account Type")
      setloading(false)
    }
    else if (!passwordPattern.test(registerInfo.password)) {
      toast.error("Passowrd Must Contain 8$Aa")
      setloading(false)
    }
    else if (!emailPattern.test(registerInfo.email)) {
      toast.error("Invalid Email")
      setloading(false)
    }
    else if (registerInfo.password != confirmPassword) {
      toast.error("Password Not Matched")
      setloading(false)
    }
    else {
      try {
        let result = await registerUser(registerInfo)
        if (result?.data) {
          localStorage.setItem("id", result.data.id)
          toast.success("Account Registered")
          setloading(false)
          setTimeout(() => {
            nav("/verify/account")
          }, 3000);
        }
        else if (result?.error) {
          if (result?.error?.status === 409) {
            toast.error("Email Already Registered")
            setloading(false)
          }
        }
      }
      catch (error) {
        console.log(error, 'error')
        setloading(false)
      }
    }
  };

  const submitLoginForm = async (e) => {
    e.preventDefault();
    setloading(true)
    if (!loginInfo?.email || !loginInfo.password) {
      toast.error("All Fields Are Required")
      setloading(false)
    }
    else if (!emailPattern.test(loginInfo.email)) {
      toast.error("Invalid Email")
      setloading(false)
    }
    else {
      try {
        let result = await loginUser(loginInfo)
        if (result?.data?.token) {
          result.data.role === "buyer" ? localStorage.setItem("token", result.data.token) : localStorage.setItem("sellertoken", result.data.token)
          localStorage.setItem("role", result.data.role)
          toast.success("Login Successfull")
          setloading(false)
          setTimeout(() => {
            result.data.role === "buyer" ? nav("/") : nav("/seller/dashboard")
          }, 3000);
        }
        else if (result?.error) {
          if (result?.error?.status === 404) {
            toast.error("Email Not Registered")
            setloading(false)
          }
          else if (result?.error?.status === 401) {
            toast.error("Invalid Credentails")
            setloading(false)
          }
          else if (result?.error?.status === 403) {
            localStorage.setItem("id",result.error.data.msg)
            toast.error("Verify Your Account")
            setloading(false)
            setTimeout(() => {
              nav("/verify/account")
            }, 3000);
          }
        }
      }
      catch (error) {
        console.log(error, 'error')
        setloading(false)

      }
    }
  };


  return (
    <>
      <div className='font-popins relative h-screen'>

        {/* LOGO  */}
        <div className='sm:absolute sm:mt-0 sm:ml-0 mt-3 ml-3 top-3 left-4'>
          <h1>Feminine Care</h1>
        </div>

        {/* MAIN CONTAINER  */}
        <div className='w-screen h-screen lg:h-[90vh] block sm:flex justify-center items-center'>

          <form onSubmit={isLogin ? submitLoginForm : submitRegisterationForm} className='w-screen ml-2 mr-2 block sm:flex justify-between md:justify-around items-center p-2'>

            {/* LEFT SIDE CONTAINER  */}
            <div>
              <h1 className='text-3xl font-bold mb-1 sm:mb-2 mt-[2rem] sm:mt-0'>{isLogin ? "Sign in to " : "Register in to "}</h1>
              <h1 className='text-2xl mb-2 sm:mb-7'>Feminine Care</h1>
              <p className='text-base'>{isLogin ? "If you don’t have an account register" : "If you Already have an account registered"}</p>
              <p className='text-base mb-10 sm:mb-0'>You can <span className={`text-[${accountScreensColor.textColor}] cursor-pointer`} onClick={() => setisLogin((prev) => setisLogin(!prev))}>{isLogin ? "Register here !" : "Login here !"}</span></p>
            </div>

            {/* MAIN INPUT FIELDS  */}
            <div className='flex ml-0 mr-0 h-[60vh] justify-center items-center flex-col sm:block'>

              <h1 className='text-2xl mb-4 md:mb-10 hidden sm:block'>{isLogin ? "Sign in" : "Sign up"}</h1>
              {
                !isLogin ? <Input placeholder={"Enter Your Name"} onChangeFunc={isLogin ? onchangeLoginInput : onchangeRegisterInput} type={"text"} name={"name"} className={"mb-6 placeholder:text-[#A7A3FF] bg-[#F0EFFF] w-[20rem] sm:w-[14rem] md:w-[18rem] h-[3rem] rounded-[8px] pl-3 pr-3 outline-none"} /> : null
              }

              <Input placeholder={"Enter Email Address"} onChangeFunc={isLogin ? onchangeLoginInput : onchangeRegisterInput} type={"email"} name={"email"} className={"mb-6 placeholder:text-[#A7A3FF] bg-[#F0EFFF] w-[20rem] sm:w-[14rem]  md:w-[18rem] h-[3rem] rounded-[8px] pl-3 pr-3 outline-none"} />

              {
                !isLogin ? (
                  <div className='mb-6 relative'>

                    <div className={"bg-[#F0EFFF] cursor-pointer w-[20rem] sm:w-[14rem] md:w-[18rem] h-[3rem] rounded-[8px] flex justify-between pr-3 items-center pl-3"} onClick={() => setshowRole(!showRole)}>
                      <p className='text-black'>{registerInfo.role}</p>
                      <BiDownArrow className='text-[#5b57ad] cursor-pointer' onClick={() => setshowRole(!showRole)} />
                    </div>

                    {showRole ? (
                      <div className='bg-[#F0EFFF] mb-3 absolute w-[20rem] bottom-4 sm:w-[14rem] md:w-[18rem] h-[5rem] rounded-[8px] top-[3.5rem] pr-3 pl-3 z-50'>
                        <p className='mb-3 mt-3 cursor-pointer text-[#A7A3FF]' onClick={() => {
                          setRegisterInfo({ ...registerInfo, role: "buyer" });
                          setshowRole(false);
                        }}>
                          Customer
                        </p>
                        <p className='cursor-pointer text-[#A7A3FF]' onClick={() => {
                          setRegisterInfo({ ...registerInfo, role: "seller" });
                          setshowRole(false);
                        }}>
                          Seller
                        </p>
                      </div>
                    ) : null}
                  </div>
                ) : null
              }

              <div className='relative'>
                <Input onChangeFunc={isLogin ? onchangeLoginInput : onchangeRegisterInput} placeholder={"Enter Your Password"} type={showPassword ? "text" : "password"} name={"password"} className={"mb-6 placeholder:text-[#A7A3FF] bg-[#F0EFFF] w-[20rem] sm:w-[14rem]  md:w-[18rem] h-[3rem] rounded-[8px] pl-3 pr-[3.4rem] outline-none"} />
                {showPassword ? <AiFillEyeInvisible className="absolute top-3 cursor-pointer right-5 text-white bg-[#4D47C3] w-[1.5rem] h-[1.5rem] p-1 rounded-full" onClick={() => setshowPassword(!showPassword)} /> :
                  <AiFillEye onClick={() => setshowPassword(!showPassword)} className="absolute top-3 cursor-pointer right-5 text-white bg-[#4D47C3] w-[1.5rem] h-[1.5rem] p-1 rounded-full" />}
              </div>

              {
                !isLogin && (
                  <div className='relative'>
                    <Input onChangeFunc={(e) => setconfirmPassword(e.target.value)} placeholder={"Confirm Your Password"} type={showPasswordEye2 ? "text" : "password"} name={"password"} className={"mb-6 placeholder:text-[#A7A3FF] bg-[#F0EFFF] w-[20rem] sm:w-[14rem]  md:w-[18rem] h-[3rem] rounded-[8px] pl-3 pr-[3.4rem] outline-none"} />
                    {showPasswordEye2 ? <AiFillEyeInvisible className="absolute top-3 cursor-pointer right-5 text-white bg-[#4D47C3] w-[1.5rem] h-[1.5rem] p-1 rounded-full" onClick={() => setshowPasswordEye2(!showPasswordEye2)} /> :
                      <AiFillEye onClick={() => setshowPasswordEye2(!showPasswordEye2)} className="absolute top-3 cursor-pointer right-5 text-white bg-[#4D47C3] w-[1.5rem] h-[1.5rem] p-1 rounded-full" />
                    }
                  </div>
                )
              }


              {isLogin ?
                <div className='w-[20rem] sm:w-[14rem] md:w-[18rem]'>
                  <p className='mb-5 float-right sm:float-right text-[#B0B0B0] cursor-pointer' onClick={() => nav("/forget/password")}>Forgot Password ?</p>
                </div>
                : null
              }
              {
                loading ?
                  <Button text={"Loading ..."} className={`w-[20rem] sm:w-[14rem]  md:w-[18rem] h-[3rem] bg-[${accountScreensColor.buttonBg}] shadow-btnshadow1 text-white rounded-[8px]`} /> :
                  <Button text={isLogin ? "Login" : "Register"} className={`w-[20rem] sm:w-[14rem]  md:w-[18rem] h-[3rem] bg-[${accountScreensColor.buttonBg}] shadow-btnshadow1 text-white rounded-[8px]`} />
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

export default Form