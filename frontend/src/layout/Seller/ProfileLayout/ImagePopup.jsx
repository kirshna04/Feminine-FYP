import React, { useRef } from 'react'
import { ImCross } from 'react-icons/im'

const ImagePopup = ({ setshowImagePopup, setProfileImage, profileImage }) => {


  const inputRef = useRef(null);
  const handleOnChange = (e) => {
    setProfileImage(e.target.files[0])
    setshowImagePopup(false)
  };
  const handleClick = () => {
    inputRef.current.click();
  };

  return (
    <div className='bg-white w-fit rounded-md p-4 shadow-otpShadow ml-2 mr-2 font-popins'>

      <div className='flex justify-between items-center '>
        <h1 className='text-base sm:text-lg'>Image Preview</h1>
        <ImCross onClick={() => setshowImagePopup(false)} className='cursor-pointer' />
      </div>
      <img src={URL.createObjectURL(profileImage)} alt="" className='w-[20rem] h-[20rem] rounded-md mt-4 mb-4' />
      <div style={{ border: "1px solid lightgray" }} className={`h-[2.2rem] mt-4 flex justify-center items-center rounded-md`}>
        <label htmlFor="file-input">
          <button className={`text-sm text-[gray] `} onClick={handleClick}>Change Image</button>
        </label>
        <input id="file-input" type="file" ref={inputRef} onChange={handleOnChange} style={{ display: 'none' }} />
      </div>
    </div>
  )
}

export default ImagePopup
