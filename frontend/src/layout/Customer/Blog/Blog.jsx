import React, { useEffect, useState } from 'react';
import { quotes } from '../../../constant/quotes';
import BlogListing from '../../../components/Listing/BlogListing';

const Blog = () => {
  const [slideNumber, setSlideNumber] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSlideNumber((prevSlideNumber) => (prevSlideNumber + 1) % quotes.length);
    }, 4000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <div className='w-[100vw] h-[20rem] bg-slate-100 flex justify-center items-center sm:mt-0 mt-2'>
        <p className='pl-2 pr-2 font-popins text-medium md:text-2xl text-center font-semibold'>{quotes[slideNumber].quotes}</p>
      </div>

      <div>
        <BlogListing/>
      </div>
    </div>
  );
};

export default Blog;