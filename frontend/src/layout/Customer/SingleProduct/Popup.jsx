import React, { useState } from 'react'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { ImCross } from 'react-icons/im'
const Popup = ({ setshowImagePopup, images }) => {
  const [image, setimage] = useState(images)
  const [currentImage, setcurrentImage] = useState(0)


  const forwardImage = () => {
    if (currentImage === image?.length - 1) {
      setcurrentImage(0);
    } else {
      setcurrentImage(currentImage + 1);
    }
  };
  const backwardImage = () => {
    if (currentImage === 0) {
      setcurrentImage(image?.length - 1);
    } else {
      setcurrentImage(currentImage - 1);
    }
  };


  return (
    <div className='shadow-otpShadow w-fit h-[50%] rounded-md relative'>

      <div className='rounded-md'>
        <img src={image[currentImage]} alt="" className='h-[20rem] w-[30rem] min-w-[30rem] bg-cover rounded-md' />
      </div>

      <div className=' absolute top-5 right-4'>
        <ImCross onClick={() => setshowImagePopup(false)} className='cursor-pointer ' />
      </div>


      <div className='absolute top-[40%]'>
        <AiOutlineRight onClick={forwardImage} className='text-black text-6xl cursor-pointer' />
      </div>

      <div className='absolute top-[40%] right-[0]'>
        <AiOutlineLeft onClick={backwardImage} className='text-black text-6xl cursor-pointer' />
      </div>

    </div>
  )
}

export default Popup
