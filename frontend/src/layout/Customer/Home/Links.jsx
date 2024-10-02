import React from 'react'
import { navLinks } from '../../../constant/navLinks'
import { useNavigate } from 'react-router-dom'
const Links = () => {
    const nav = useNavigate()
    return (
        <>
            <div className='sm:flex justify-center items-center w-screen mt-4 font-popins hidden'>
                <div className='flex gap-4 sm:gap-10 items-center'>
                    {navLinks?.map((item,key) => {
                        return (
                            <div key={key+1} onClick={()=>nav(`${item.route}`)}>
                                <p className=' cursor-pointer'>{item?.name}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className='hidden sm:flex w-screen h-[0.2px] bg-gray-200 mt-4'></div>
        </>
    )
}

export default Links