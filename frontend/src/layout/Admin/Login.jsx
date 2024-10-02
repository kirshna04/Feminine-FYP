import React, {useState } from 'react'
import women from '../../assets/account.png'
import Input from '../../components/input/Input'
import Button from '../../components/button/Button'
import { useNavigate } from 'react-router-dom'
import { accountScreensColor } from '../../constant/color'
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'


const Login = () => {
    const nav = useNavigate()
    const [isLogin, setisLogin] = useState(true)
    const [loginInfo, setLoginInfo] = useState({email: "",password: ""})
    const [showPassword, setshowPassword] = useState(false);
    const [loading, setloading] = useState(false)
    const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!])[A-Za-z\d@#$%^&+=!]{8,}$/;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const onchangeLoginInput = (e) => {
        setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value })
    }

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
            let result = await axios.post(`http://localhost:4000/api/v1/admin-login`,loginInfo)
            console.log(result)
            if (result?.data) {
              toast.success("Login Successfull")
              setloading(false)
              localStorage.setItem("adminId", result.data._id)
              setTimeout(() => {
                nav("/admin/home")
              }, 3000);
            }
          }
          catch (error) {
            console.log(error, 'error')
            setloading(false)
            if (error?.response?.status === 404) {
              toast.error("Email Not Registered")
              setloading(false)
            }
            else if (error?.response?.status === 401) {
              toast.error("Invalid Credentails")
              setloading(false)
            }
    
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

          <form onSubmit={submitLoginForm} className='w-screen ml-2 mr-2 block sm:flex justify-between md:justify-around items-center p-2'>

            {/* LEFT SIDE CONTAINER  */}
            <div>
              <h1 className='text-3xl font-bold mb-1 sm:mb-2 mt-[2rem] sm:mt-0'>{isLogin ? "Sign in to " : "Register in to "}</h1>
              <h1 className='text-2xl mb-2 sm:mb-7'>Feminine Care</h1>
              <p className='text-base'>If you don’t have an account register"</p>
              <p className='text-base mb-10 sm:mb-0'>You can <span className={`text-[${accountScreensColor.textColor}] cursor-pointer`} onClick={()=>nav("/admin/register")}>Register here !</span></p>
            </div>

            {/* MAIN INPUT FIELDS  */}
            <div className='flex ml-0 mr-0 h-[60vh] justify-center items-center flex-col sm:block'>

              <h1 className='text-2xl mb-4 md:mb-10 hidden sm:block'>Sign in</h1>

              <Input placeholder={"Enter Email Address"} onChangeFunc={(e)=>onchangeLoginInput(e)} type={"email"} name={"email"} className={"mb-6 placeholder:text-[#A7A3FF] bg-[#F0EFFF] w-[20rem] sm:w-[14rem]  md:w-[18rem] h-[3rem] rounded-[8px] pl-3 pr-3 outline-none"} />

              <div className='relative'>
                <Input onChangeFunc={(e)=>onchangeLoginInput(e)} placeholder={"Enter Your Password"} type={showPassword ? "text" : "password"} name={"password"} className={"mb-6 placeholder:text-[#A7A3FF] bg-[#F0EFFF] w-[20rem] sm:w-[14rem]  md:w-[18rem] h-[3rem] rounded-[8px] pl-3 pr-[3.4rem] outline-none"} />
                {showPassword ? <AiFillEyeInvisible className="absolute top-3 cursor-pointer right-5 text-white bg-[#4D47C3] w-[1.5rem] h-[1.5rem] p-1 rounded-full" onClick={() => setshowPassword(!showPassword)} /> :
                  <AiFillEye onClick={() => setshowPassword(!showPassword)} className="absolute top-3 cursor-pointer right-5 text-white bg-[#4D47C3] w-[1.5rem] h-[1.5rem] p-1 rounded-full" />}
              </div>


                <div className='w-[20rem] sm:w-[14rem] md:w-[18rem]'>
                  <p className='mb-5 float-right sm:float-right text-[#B0B0B0] cursor-pointer' onClick={() => nav("/admin/forget")}>Forgot Password ?</p>
                </div>
              {
                loading ?
                  <Button text={"Loading ..."} className={`w-[20rem] sm:w-[14rem]  md:w-[18rem] h-[3rem] bg-[${accountScreensColor.buttonBg}] shadow-btnshadow1 text-white rounded-[8px]`} /> :
                  <Button text={"Login"} className={`w-[20rem] sm:w-[14rem]  md:w-[18rem] h-[3rem] bg-[${accountScreensColor.buttonBg}] shadow-btnshadow1 text-white rounded-[8px]`} />
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

export default Login
