import React, { useEffect, useState } from 'react';
import './style.css'
import axios from 'axios';

const VideoListing = () => {
  const [data, setData] = useState([])
  const [playStates, setPlayStates] = useState();

  const getVideo = async () => {
    let result = await axios.get('http://localhost:4000/api/v1/video/all')
    setData(result.data)
    setPlayStates(result.data.map(() => false))
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
  useEffect(() => {
    getVideo()
  }, [])

  return (
    <div className='w-screen overflow-x-auto overflow-y-auto p-5 font-popins'>
      {/* TITLE */}
      <div className='flex gap-4 items-center mb-10'>
        <div className='w-[1rem] h-[2rem] bg-[#034694]'></div>
        <h1 className='text-lg font-popins'>Our Videos</h1>
      </div>
      {
        data?.length > 0 && (
          <div className='flex justify-center items-center pb-[6rem] sm:pb-0'>
            <div className={`product`}>
              {data?.map((item, index) => (
                <div key={item.id} style={{ border: '1px solid #ebeaea' }} className={`cursor-pointer h-[20rem] bg-white relative rounded-lg shadow-productShadow`}>
                  {/* BLOG IMAGE */}
                  <div>
                    {
                      playStates[index] ?
                        <video onMouseLeave={() => handleMouseLeave(index)} autoPlay src={item?.video} alt={`Video ${item.id}`} className='h-[20rem] w-[100%] object-cover object-center' /> :
                        <img onMouseEnter={() => handleMouseEnter(index)} src={item?.thumbnail} alt={`Thumbnail ${item.id}`} className='h-[20rem] w-[100%] object-cover object-center' />
                    }
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      }
    </div>
  );
};

export default VideoListing;

