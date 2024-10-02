import React, { useEffect, useState } from 'react'
import Input from '../../../components/input/Input'
import { FaBell, FaSearch } from "react-icons/fa";
import { RiLogoutCircleLine } from "react-icons/ri";
import { TbSitemap } from "react-icons/tb";
import { FcSalesPerformance } from "react-icons/fc";
import { FaFirstOrderAlt } from "react-icons/fa6";
import { SiFuturelearn } from "react-icons/si";
import { GiHamburgerMenu } from 'react-icons/gi'
import GraphIcon from '../../../assets/graph.png'
import { useNavigate } from 'react-router-dom';
import { useGetBuyerProductQuery, useGetSellerProfileQuery } from '../../../services/api\'s/common/userAccountApi';
import { SellerjwtDecodeFunction } from '../../../helper/jwt';
import Listing from './Listing';
import Popup from './Popup';
import axios from 'axios';

const Video = ({ setshowLeftSideBar, showLeftSideBar }) => {
    let dummyImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzon50OBw7lo4WabzkwazOxyN_GzgubVoV_JwcvPCAnZlT79a7-xGuDFgJxo47zRR17o0&usqp=CAU"
    const nav = useNavigate()
    const [name, setName] = useState("")
    const [createPopup, setcreatePopup] = useState(false)
    const [showLinks, setshowLinks] = useState(false)
    const [data, setData] = useState([])
    const [playStates, setPlayStates] = useState();

    const logout = () => {
        localStorage.removeItem("role")
        localStorage.removeItem("sellertoken")
        nav("/account")
    }
    // const [accountId] = useState(SellerjwtDecodeFunction().payload._id)
    // const { data } = useGetSellerProfileQuery(accountId)
    // let totalProduct = useGetBuyerProductQuery(accountId)?.data?.AllProduct?.length
    const getAdmin = async()=>{
        let result = await axios.get(`http://localhost:4000/api/v1/admin/get/${localStorage.getItem("adminId")}`)
        setName(result?.data?.name)
    }
    useEffect(()=>{
        getAdmin ()
    },[])
    return (
        <div className='w-[100%] h-screen bg-[#fbfcfe] overflow-y-auto pl-5 pr-5 md:pl-10 md:pr-10 overflow-x-auto relative pt-5'>

            {/* TOP BAR  */}

            <div className='flex justify-between items-center md:mt-0 relative'>

                <div className='lg:block hidden'>
                    <h1 className='md:text-lg text-sm font-semibold'>Good Moring ! {name}</h1>
                </div>

                <div className='flex justify-between items-center md:gap-4 flex-1 lg:flex-none gap-2 overflow-x-auto'>
                    {
                        !showLeftSideBar && (
                            <div onClick={() => setshowLeftSideBar(true)} className='bg-[#eff3fc] min-w-[2.5rem] md:hidden min-h-[2.5rem] flex justify-center items-center rounded-md'>
                                <GiHamburgerMenu />
                            </div>
                        )
                    }
                    <div className='md:w-[60%] md:min-w-[60%] min-w-[60vw] relative'>
                        <Input placeholder={"Search"} className={"outline-none border-none bg-[#eff3fc] w-[100%] h-[2.6rem] pl-5 pr-[3rem] rounded-md"} />
                        <FaSearch className=' absolute top-3 right-6' />
                    </div>

                    <div className='bg-[#eff3fc] hidden min-w-[2.5rem] min-h-[2.5rem] sm:flex justify-center gap-x-4 items-center rounded-md cursor-pointer'>
                        <img className='w-[1.5rem] h-[1.5rem] bg-center rounded-full' src={dummyImage} alt="" />
                    </div>

                    <div className='bg-[#eff3fc] hidden min-w-[2.5rem] min-h-[2.5rem] sm:flex justify-center items-center rounded-md cursor-pointer'>
                        <FaBell className='' />
                    </div>

                    <div onClick={logout} className='bg-[#eff3fc] hidden min-w-[2.5rem] min-h-[2.5rem] sm:flex justify-center gap-x-4 items-center rounded-md cursor-pointer'>
                        <RiLogoutCircleLine className='text-[#ff7555]' />
                    </div>

                    {/* RESPONSIVE USER PROFILE LOGO  */}
                    <div onClick={() => setshowLinks(!showLinks)} className='bg-[#eff3fc] sm:hidden min-w-[2.5rem] min-h-[2.5rem] flex justify-center items-center rounded-md cursor-pointer'>
                        <img className='w-[1.5rem] h-[1.5rem] bg-center rounded-full' src={dummyImage} alt="" />
                    </div>


                </div>

            </div>

            {/* RESPONSIVE NAV LINK  */}
            {
                showLinks && (
                    <div className='absolute shadow-otpShadow top-[4.2rem] sm:hidden right-4 z-50 bg-[#eff3fc] w-[8rem] pl-2 pt-2 pb-2'>

                        <p onClick={() => nav("/seller/dashboard/profile")} className='mb-2 cursor-pointer text-sm'>Profile</p>
                        <p className='mb-2 cursor-pointer text-sm'>Notification</p>
                        <p className='mb-2 cursor-pointer text-sm' onClick={logout}>Logout</p>
                    </div>
                )
            }

            {/* CARDS EARNS  */}

            <div className='flex justify-between gap-4 items-center mt-8 overflow-x-auto p-1'>

                <div className='min-w-[16rem] h-[12rem] rounded-md bg-white shadow-otpShadow p-3 relative'>
                    <div className='w-[3rem] h-[3rem] rounded-full bg-[#4f619f] flex justify-center items-center mb-4'>
                        <TbSitemap className='text-white text-xl' />
                    </div>
                    <h1 className='text-sm text-[#8e99c1]'>Total Product</h1>

                    <div className='absolute bottom-2 flex justify-between items-center w-[90%]'>
                        <p className='text-sm font-semibold'>{10000} products</p>
                        <img src={GraphIcon} alt="" className='w-[3rem]' />
                    </div>
                </div>

                <div className='min-w-[16rem] h-[12rem] rounded-md bg-white shadow-otpShadow p-3 relative'>
                    <div className='w-[3rem] h-[3rem] rounded-full bg-[#4f619f] flex justify-center items-center mb-4'>
                        <FcSalesPerformance className='text-white text-xl' />
                    </div>
                    <h1 className='text-sm text-[#8e99c1]'>Total Sales</h1>
                    <div className='absolute bottom-2 flex justify-between items-center w-[90%]'>
                        <p className='text-sm font-semibold'>200+ products sold</p>
                        <img src={GraphIcon} alt="" className='w-[3rem]' />
                    </div>
                </div>

                <div className='min-w-[16rem] h-[12rem] rounded-md bg-white shadow-otpShadow p-3 relative'>
                    <div className='w-[3rem] h-[3rem] rounded-full bg-[#4f619f] flex justify-center items-center mb-4'>
                        <FaFirstOrderAlt className='text-white text-xl' />
                    </div>
                    <h1 className='text-sm text-[#8e99c1]'>Pending Order</h1>
                    <div className='absolute bottom-2 flex justify-between items-center w-[90%]'>
                        <p className='text-sm font-semibold'>10 orders pending</p>
                        <img src={GraphIcon} alt="" className='w-[3rem]' />
                    </div>
                </div>

                <div className='min-w-[16rem] h-[12rem] rounded-md bg-white shadow-otpShadow p-3 relative'>
                    <div className='w-[3rem] h-[3rem] rounded-full bg-[#4f619f] flex justify-center items-center mb-4'>
                        <SiFuturelearn className='text-white text-xl' />
                    </div>
                    <h1 className='text-sm text-[#8e99c1]'>Total Earn</h1>
                    <div className='absolute bottom-2 flex justify-between items-center w-[90%]'>
                        <p className='text-sm font-semibold'>$20000 earn</p>
                        <img src={GraphIcon} alt="" className='w-[3rem]' />
                    </div>
                </div>
            </div>

            <Listing setcreatePopup={setcreatePopup} createPopup={createPopup} setData={setData} data={data} setPlayStates={setPlayStates} playStates={playStates} />

            {
                createPopup && (
                    <div className='absolute top-0 left-0 w-[100%] h-screen bg-black z-50 bg-opacity-50'>
                        <div className='flex justify-center items-end w-[100%] md:w-[80%] h-[65%]'>
                            <Popup setData={setData} setPlayStates={setPlayStates} setcreatePopup={setcreatePopup} createPopup={createPopup}/>
                        </div>
                    </div>
                )
            }
            

        </div>
    )
}

export default Video
