import React, { useEffect } from 'react'
import { FaTrash } from "react-icons/fa"
import { accountScreensColor } from '../../../constant/color';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Listing = ({setcreatePopup,createPopup,data,setData,playStates,setPlayStates}) => {

    const getVideo = async ()=>{
        let result =  await axios.get('http://localhost:4000/api/v1/video/all')
        setData(result.data)
        setPlayStates(result.data.map(()=>false))
    }

    const handleMouseEnter = (index) => {
        setPlayStates((prevStates) =>
            prevStates.map((state, i) => (i === index ? true : state))
        );
    };
    
    const handleMouseLeave = (index) => {
        setPlayStates((prevStates) =>
            prevStates.map((state, i) => (i === index ? false : state))
        );
    };


    const del = (id)=>{
       let result = axios.delete(`http://localhost:4000/api/v1/video/delete/${id}`)
       if(result){
        getVideo()
        toast.success("Video Deleted")
        axios.get('http://localhost:4000/api/v1/video/all')
        .then((res)=>{
            setData(res.data)
            setPlayStates(res.data.map(()=>false))
        })
       }
    }
    useEffect(()=>{
        getVideo()
    },[])
    return (
        <div className='mt-10 w-[100%] relative'>
            <div className='flex justify-between items-center'>
                <h1>Videos</h1>
                <button onClick={()=>setcreatePopup(true)}  className={`w-[7rem] h-[2.5rem] bg-[${accountScreensColor.buttonBg}] shadow-btnshadow1 text-white rounded-[8px]`}>Add Video</button>
            </div>
            <div className='mt-5'>
                <div className={`flex overflow-x-auto gap-x-5 pb-[1rem]`}>
                    {data?.map((item, index) => (
                        <div key={item._id} style={{ border: '1px solid #ebeaea' }} className={`cursor-pointer h-[18rem] bg-white relative rounded-lg shadow-productShadow`}>
                            {/* BLOG IMAGE */}
                            <div key={item._id} className=''>
                                {
                                    playStates[index] ?
                                        <video onMouseLeave={() => handleMouseLeave(index)} autoPlay src={item?.video} alt={`Video ${item.id}`} className='h-[15rem] w-[15rem] min-w-[15rem] object-cover object-center' /> :
                                        <img onMouseEnter={() => handleMouseEnter(index)} src={item?.thumbnail} alt={`Thumbnail ${item.id}`} className='h-[15rem] w-[15rem] min-w-[15rem] object-cover object-center' />
                                }
                                <p className='mt-[1rem] px-4' onClick={()=>del(item._id)}><FaTrash className=' text-red-800 cursor-pointer'/></p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

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

export default Listing
