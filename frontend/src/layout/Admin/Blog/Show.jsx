import React from 'react'
import { ImCross } from 'react-icons/im'
import { useGetSingleBlogQuery } from '../../../services/api\'s/common/userAccountApi'

const Show = ({ setcreatePopup, blogId }) => {
    const { data } = useGetSingleBlogQuery(blogId)

    return (
        <div className='bg-white pt-5 pb-5 pl-2 pr-2 w-[20rem] rounded-md h-[20rem] overflow-y-auto'>

            <div className='flex justify-end items-center mb-4'>
                <ImCross onClick={() => { setcreatePopup(false) }} className=' cursor-pointer' />
            </div>

            <div className='flex justify-center items-center'>
                <img src={data?.image} alt="" className='w-[100%] h-[7rem] rounded-md' />
            </div>
            <p className='mt-3'>{data?.title}</p>
            <p className='mt-1 text-sm text-gray-500 w-[90%'>{data?.description}</p>

        </div>
    )
}

export default Show

