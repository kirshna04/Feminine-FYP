import React, { useEffect, useState } from 'react';
import shoppingImage from '../../assets/slider3.jpg';
import shoppingImage2 from '../../assets/slider1.jpg';
import shoppingImage3 from '../../assets/slider4.jpg';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import {useGetBuyerProfileQuery} from '../../services/api\'s/common/userAccountApi'
import { jwtDecodeFunction } from '../../helper/jwt';

const Slider = () => {
  const decodedToken = jwtDecodeFunction();
  const [accountId] = useState(decodedToken?.payload?._id);  
  const { data } = useGetBuyerProfileQuery(accountId)
  const [countdown, setCountdown] = useState({
    days: data?.remainingTime.days || 0,
    hours: data?.remainingTime.hours || 0,
    minutes: data?.remainingTime.minutes || 0,
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
    <div className="pt-5 lg:flex items-center ml-2 mr-2 font-popins overflow-x-auto">
    {
      decodedToken !== null && (
      <div className='w-[15rem] h-[20rem] shadow-otpShadow p-4 rounded-2xl hidden lg:flex lg:flex-col m-1 '>

        <div>
          <h1 className='mb-2'>Track Your Period</h1>
        </div>

        <div className='flex-1 flex flex-col justify-center'>

          <div>
            <p className='text-slate-700'>Days Left :</p>
          </div>

          <div className='mt-2 flex gap-x-2 items-center'>

            <div>
              <div className='w-[2.5rem] h-[2.5rem] rounded-sm bg-[#f56b0e] flex justify-center items-center mb-2'>
                <p className='text-white'>{countdown?.days}</p>
              </div>
              <p className='text-sm text-slate-700'>Days</p>
            </div>

            <p className='mt-[-30px]'>:</p>

            <div>
              <div className='w-[2.5rem] h-[2.5rem] rounded-sm bg-[#f56b0e] flex justify-center items-center mb-2'>
                <p className='text-white'>{countdown?.hours}</p>
              </div>
              <p className='text-sm text-slate-700'>Hours</p>
            </div>

            <p className='mt-[-30px] ml-[-5px]'>:</p>

            <div>
              <div className='w-[2.5rem] h-[2.5rem] rounded-sm bg-[#f56b0e] flex justify-center items-center mb-2'>
                <p className='text-white'>{countdown?.minutes}</p>
              </div>
              <p className='text-sm text-slate-700'>Minutes</p>
            </div>


          </div>

        </div>

      </div>
      )

    }

      <Swiper className="w-full lg:flex-1" spaceBetween={0} effect={'fade'} pagination={{ clickable: true }} autoplay={{ delay: 3000 }} modules={[EffectFade, Navigation, Pagination, Autoplay]}>

        <SwiperSlide className='flex justify-center'>
          <img src={shoppingImage} className={`${decodedToken===null ? "md:w-[60%]":"w-[90%]"} w-[100%] h-[20rem] sm:h-[20rem] rounded-2xl bg-no-repeat`} />
        </SwiperSlide>

        <SwiperSlide className='flex justify-center'>
          <img src={shoppingImage3} className={`${decodedToken===null ? "md:w-[60%]":"w-[90%]"} w-[100%] h-[20rem] sm:h-[20rem] rounded-2xl bg-no-repeat`}/>
        </SwiperSlide>

        <SwiperSlide className='flex justify-center'>
          <img src={shoppingImage2} className={`${decodedToken===null ? "md:w-[60%]":"w-[90%]"} w-[100%] h-[20rem] sm:h-[20rem] rounded-2xl bg-no-repeat`} />
        </SwiperSlide>



      </Swiper>

      {
      decodedToken !== null && (
      <div className='hidden lg:block m-1'>

        <div className='h-[9.5rem] w-[15rem] shadow-otpShadow rounded-xl p-3 mb-4'>
          <h1>Find Best Selling Products</h1>
          <p className='mt-3'>Unlock You Style</p>
          <button className='w-[8rem] h-[2.4rem] bg-[#f56b0e] text-white rounded-md mt-3'>Shop Now</button>
        </div>


        <div className='h-[9.5rem] w-[15rem] shadow-otpShadow rounded-xl p-3 flex flex-col'>
        <div>
          <h1 className='mb-2'>Flas Sales</h1>
        </div>

        <div className='flex-1 flex flex-col justify-center'>

          <div>
            <p className='text-slate-700'>Sales End In :</p>
          </div>

          <div className='mt-2 flex gap-x-2 items-center'>

            <div>
              <div className='w-[2.5rem] h-[2.5rem] rounded-sm bg-[#f56b0e] flex justify-center items-center mb-2'>
                <p className='text-white'>10</p>
              </div>
              <p className='text-sm text-slate-700'>Days</p>
            </div>

            <p className='mt-[-30px]'>:</p>

            <div>
              <div className='w-[2.5rem] h-[2.5rem] rounded-sm bg-[#f56b0e] flex justify-center items-center mb-2'>
                <p className='text-white'>10</p>
              </div>
              <p className='text-sm text-slate-700'>Hours</p>
            </div>

            <p className='mt-[-30px] ml-[-5px]'>:</p>

            <div>
              <div className='w-[2.5rem] h-[2.5rem] rounded-sm bg-[#f56b0e] flex justify-center items-center mb-2'>
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
}

export default Slider;


