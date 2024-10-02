import React, { useRef, useState } from 'react'
import { ImCross } from 'react-icons/im'
import { accountScreensColor } from '../../../constant/color'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
const Popup = ({ setcreatePopup,setData,setPlayStates }) => {
  const [loading, setloading] = useState(false)
  const thumbailRef = useRef(null);
  const [thumbnail, setThumbnail] = useState(null)

  const videoRef = useRef(null);
  const [video, setvideo] = useState(null)

  const handleOnChangeThumbnail = (e) => {
    setThumbnail(e.target.files[0])
  };
  const handleClickThumbnail = () => {
    thumbailRef.current.click();
  };

  const handleOnChangeVideo = (e) => {
    setvideo(e.target.files[0])
  };
  const handleClickVideo = () => {
    videoRef.current.click();
  };

  const onSubmit = async (e) => {
    e.preventDefault()
    setloading(true)
    if (!thumbnail.name || !video?.name) {
      toast.error("All Fields Are Required")
      setloading(false)
    }
    else {

      const formData = new FormData();
      formData.append("thumbnail", thumbnail);
      formData.append("video", video);

      let result = await axios.post('http://localhost:4000/api/v1/video/create', formData)
      if (result.status === 200) {
        toast.success("Vide Uploaded")
        setTimeout(() => {
          axios.get('http://localhost:4000/api/v1/video/all')
            .then((res) => {
              setData(res.data)
              setPlayStates(res.data.map(() => false))
            })
          setcreatePopup(false)
        }, 2000);
      }


    }
  }



  return (
    <div className='bg-white px-5 py-3 w-[20rem] rounded-md'>

      <div className='flex justify-between items-center mb-4'>
        <h1>Add Video</h1>
        <ImCross onClick={() => { setcreatePopup(false) }} className=' cursor-pointer' />
      </div>

      {/* FOR THUMBNAIL  */}
      <div style={{ border: "1px solid lightgray" }} className={`h-[2.5rem] flex justify-center items-center rounded-md mb-2 ${thumbnail?.name && `bg-[${accountScreensColor.buttonBg}]`}`}>
        <label htmlFor="file-input">
          <button className={` ${thumbnail ? "text-[#eff3fc]" : "text-[gray]"}`} onClick={handleClickThumbnail}>{thumbnail ? "File Uploaded" : "Upload Thumbnail"}</button>
        </label>
        <input id="file-input" multiple type="file" ref={thumbailRef} onChange={handleOnChangeThumbnail} style={{ display: 'none' }} />
      </div>

      {/* FOR VIDEO  */}
      <div style={{ border: "1px solid lightgray" }} className={`h-[2.5rem] flex justify-center items-center rounded-md mb-2 ${video?.name && `bg-[${accountScreensColor.buttonBg}]`}`}>
        <label htmlFor="file-input">
          <button className={` ${video ? "text-[#eff3fc]" : "text-[gray]"}`} onClick={handleClickVideo}>{video ? "Video Uploaded" : "Upload Video"}</button>
        </label>
        <input id="file-input" multiple type="file" ref={videoRef} onChange={handleOnChangeVideo} style={{ display: 'none' }} />
      </div>

      <button onClick={onSubmit} className={`w-[100%] h-[2.5rem] bg-[${accountScreensColor.buttonBg}] shadow-btnshadow1 text-white rounded-[8px]`}>{loading ? "Loading..." : "Post Video"}</button>


      <ToastContainer
        position="top-right"
        autoClose={2000}
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

export default Popup
