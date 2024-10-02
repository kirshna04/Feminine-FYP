import React, { useState } from 'react'
import VideoListing from '../../../components/Listing/VideoListing'
import Video from '../../../assets/video3.mp4'
import Video2 from '../../../assets/video2.mp4'
import Video3 from '../../../assets/video1.mp4'
import { HiMiniSpeakerWave,HiMiniSpeakerXMark } from "react-icons/hi2";


const Videos = () => {

  const [currentVideo, setCurrentVideo] = useState(Video);
  const [playAudio,setPlayAudio]=useState(true)

  const handleNextVideo = () => {
    const videoList = [Video, Video2, Video3];
    const currentIndex = videoList.indexOf(currentVideo);
    const nextVideoIndex = (currentIndex + 1) % videoList.length;
    const nextVideo = videoList[nextVideoIndex];
    setCurrentVideo(nextVideo);
  };

  return (
    <div>

      <div className='sm:pl-10 sm:pr-10 pr-2 pl-2 pt-5 relative'>
        <video src={currentVideo} autoPlay muted={playAudio} onEnded={handleNextVideo} className='w-full sm:h-[28rem] h-[18rem] bg-center object-cover rounded-[0.5rem]' />
        <div className='cursor-pointer absolute sm:right-14 top-10 right-5' onClick={()=>setPlayAudio((prev)=>!prev)}>
          {
            playAudio?<HiMiniSpeakerXMark className='text-white'/>:<HiMiniSpeakerWave className='text-white'/>}
        </div>
      </div>

      <div className='mt-4'>
        <VideoListing />
      </div>
    </div>
  )
}

export default Videos
