import React, { useEffect, useState } from 'react';
import { jwtDecodeFunction } from '../../helper/jwt';
import { useGetBuyerProfileQuery } from '../../services/api\'s/common/userAccountApi';

const Banner = () => {
    const decodedToken = jwtDecodeFunction();
    const [accountId] = useState(decodedToken?.payload?._id);
    const { data } = useGetBuyerProfileQuery(accountId)
    const [countdown, setCountdown] = useState({
        days: data?.remainingTime.days || data?.remainingTime.days || 0,
        hours: data?.remainingTime.hours || data?.remainingTime.hours || 0,
        minutes: data?.remainingTime.minutes || data?.remainingTime.minutes || 0,
    });

    useEffect(() => {
        const interval = setInterval(() => {
            // Update the countdown every second
            setCountdown((prevCountdown) => {
                const newCountdown = { ...prevCountdown };
                if (newCountdown.minutes > 0) {
                    newCountdown.minutes -= 1;
                }
                else {
                    if (newCountdown.hours > 0) {
                        newCountdown.hours -= 1;
                        newCountdown.minutes = 59;
                    }
                    else {
                        if (newCountdown.days > 0) {
                            newCountdown.days -= 1;
                            newCountdown.hours = 23;
                            newCountdown.minutes = 59;
                        }
                        else {
                            clearInterval(interval);
                        }
                    }
                }
                return newCountdown;
            });
        }, 60000); // Update every minute

        return () => clearInterval(interval);

    }, [data?.remainingTime]);
    return (
        <div className='flex font-popins gap-x-4 justify-center items-center mt-[4rem] lg:hidden ml-4 mr-4 z-50'>
            {
                decodedToken !== null && (
                    <div className='overflow-x-auto flex gap-x-5 p-1'>

                        <div className='flex-1 min-w-[14rem] shadow-otpShadow h-[8.5rem] rounded-md p-3 flex flex-col'>

                            <div>
                                <h1 className='mb-1'>Track Your Period</h1>
                            </div>

                            <div className='flex-1 flex flex-col justify-center'>

                                <div>
                                    <p className='text-slate-700'>Days Left :</p>
                                </div>

                                <div className='mt-1 flex gap-x-2 items-center'>

                                    <div>
                                        <div className='w-[2rem] h-[2rem] rounded-sm bg-[#f56b0e] flex justify-center items-center mb-2'>
                                            <p className='text-white'>{countdown?.days}</p>
                                        </div>
                                        <p className='text-sm text-slate-700'>Days</p>
                                    </div>

                                    <p className='mt-[-30px]'>:</p>

                                    <div>
                                        <div className='w-[2rem] h-[2rem] rounded-sm bg-[#f56b0e] flex justify-center items-center mb-2'>
                                            <p className='text-white'>{countdown?.hours}</p>
                                        </div>
                                        <p className='text-sm text-slate-700'>Hours</p>
                                    </div>

                                    <p className='mt-[-30px] ml-[-5px]'>:</p>

                                    <div>
                                        <div className='w-[2rem] h-[2rem] rounded-sm bg-[#f56b0e] flex justify-center items-center mb-2'>
                                            <p className='text-white'>{countdown?.minutes}</p>
                                        </div>
                                        <p className='text-sm text-slate-700'>Minutes</p>
                                    </div>


                                </div>

                            </div>

                        </div>

                        <div className='flex-1 min-w-[14rem] shadow-otpShadow h-[8.5rem] rounded-md p-3'>
                            <h1>Find Best Products</h1>
                            <p className='mt-3'>Unlock You Style</p>
                            <button className='w-[8rem] h-[2.4rem] bg-[#f56b0e] text-white rounded-md mt-3'>Shop Now</button>
                        </div>

                        <div className='flex-1 min-w-[14rem] shadow-otpShadow h-[8.5rem] rounded-md flex flex-col p-3'>
                            <div>
                                <h1 className='mb-1'>Flas Sales</h1>
                            </div>

                            <div className='flex-1 flex flex-col justify-center'>

                                <div>
                                    <p className='text-slate-700'>Sales End In :</p>
                                </div>

                                <div className='mt-1 flex gap-x-2 items-center'>

                                    <div>
                                        <div className='w-[2rem] h-[2rem] rounded-sm bg-[#f56b0e] flex justify-center items-center mb-2'>
                                            <p className='text-white'>10</p>
                                        </div>
                                        <p className='text-sm text-slate-700'>Days</p>
                                    </div>

                                    <p className='mt-[-30px]'>:</p>

                                    <div>
                                        <div className='w-[2rem] h-[2rem] rounded-sm bg-[#f56b0e] flex justify-center items-center mb-2'>
                                            <p className='text-white'>10</p>
                                        </div>
                                        <p className='text-sm text-slate-700'>Hours</p>
                                    </div>

                                    <p className='mt-[-30px] ml-[-5px]'>:</p>

                                    <div>
                                        <div className='w-[2rem] h-[2rem] rounded-sm bg-[#f56b0e] flex justify-center items-center mb-2'>
                                            <p className='text-white'>10</p>
                                        </div>
                                        <p className='text-sm text-slate-700'>Minutes</p>
                                    </div>


                                </div>

                            </div>
                        </div>
                    </div>

                )
            }


        </div>
    );
};

export default Banner;

