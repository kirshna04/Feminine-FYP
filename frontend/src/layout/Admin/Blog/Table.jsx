import React, { useEffect, useState } from 'react'
import { AiFillEye } from 'react-icons/ai'
import { MdModeEditOutline } from "react-icons/md";
import { FaTrash } from "react-icons/fa"
import Popup from './Popup';
import { accountScreensColor } from '../../../constant/color';
import Edit from './Edit';
import Show from './Show';
import { useDeleteBlogMutation, useGetBlogMutation } from '../../../services/api\'s/common/userAccountApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Table = () => {
    const data = [
        { orderId: "444416", image: "Image", Title: "Harry Newman", Description: "XYZ DESCRIPTIONXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", Read: "2 min" },
        { orderId: "444416", image: "Image", Title: "Harry Newman", Description: "XYZ DESCRIPTION", Read: "2 min" },
        { orderId: "444416", image: "Image", Title: "Harry Newman", Description: "XYZ DESCRIPTION", Read: "2 min" },
        { orderId: "444416", image: "Image", Title: "Harry Newman", Description: "XYZ DESCRIPTION", Read: "2 min" },
    ]
    const [createPopup, setcreatePopup] = useState(false)
    const [updatePopup, setupdatePopup] = useState(false)
    const [showPopup, setshowPopup] = useState(false)
    const [blogId, setblogId] = useState("")
    const [delBlog, setDelBlog] = useState(false)
    // const nav = useNavigate()
    const [getBlog] = useGetBlogMutation()
    const [allBlog, setAllBlog] = useState([])
    const [deleteBlog] = useDeleteBlogMutation()
    const getAllBlog = async () => {
        let result = await getBlog()
        setAllBlog(result?.data)
    }
    useEffect(() => {
        getAllBlog()
    }, [createPopup, updatePopup, delBlog])

    const deleteProduct = async (id) => {
        let result = await deleteBlog(id)
        if (result.data) {
            toast.success("Blog Deleted")
        }
    }



    return (
        <div className='font-popins h-[17rem] overflow-y-auto overflow-x-auto'>

            <div className='bg-[#ebeffa] rounded-md p-3 w-[100%] overflow-x-auto'>

                <div className='flex justify-between'>
                    <h1>All Blogs</h1>
                    <button onClick={() => setcreatePopup(true)} className={`w-[7rem] h-[2rem] bg-[${accountScreensColor.buttonBg}] shadow-btnshadow1 text-white rounded-[8px]`}>Add Blog</button>

                </div>

                {/* MAIN TABLE  */}
                {
                    allBlog?.length > 0 && (
                        <div className='mt-3 w-full overflow-x-scroll md:overflow-x-auto'>
                            <table className='w-full'>

                                <thead>
                                    <tr className=''>
                                        <th className='pb-2 pr-4 text-start font-normal whitespace-nowrap'>Id</th>
                                        <th className='pb-2 pr-4 text-start font-normal whitespace-nowrap'>Image</th>
                                        <th className='pb-2 pl-4 pr-4 text-start font-normal whitespace-nowrap'>Title</th>
                                        <th className='pb-2 pl-4 pr-4 text-start font-normal whitespace-nowrap'>Description</th>
                                        {/* <th className='pb-2 pl-4 pr-4 text-start font-normal whitespace-nowrap'>Read</th> */}
                                        {/* <th className='pb-2 pl-4 pr-4 text-start font-normal whitespace-nowrap'>Total Price</th> */}
                                        <th className='pb-2 pl-4 pr-4 text-start font-normal whitespace-nowrap'>Actions</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {allBlog?.map((item, index) => (
                                        <tr key={index}>
                                            <td className=' pr-4 pt-4 text-sm whitespace-nowrap'>{item._id}</td>
                                            <td className='pl-4 pr-4 pt-4 text-sm whitespace-nowrap'><img src={item.image} alt="" className='w-[3rem]' /></td>
                                            <td className='pl-4 pr-4 pt-4 text-sm max-w-fit whitespace-nowrap'>{item.title}</td>
                                            <td className='pl-4 pr-4 pt-4 text-sm whitespace-nowrap max-w-[2rem] truncate overflow-hidden'>{item.description}</td>
                                            {/* <td className='pl-4 pr-4 pt-4 text-sm whitespace-nowrap'>{item.Read}</td> */}
                                            <td className='pt-4 pb-4 pl-4 pr-4 text-center  whitespace-nowrap flex items-center gap-x-4'>
                                                <AiFillEye onClick={() => { setblogId(item._id), setshowPopup(true) }} className='text-[#4f619f] cursor-pointer' />
                                                <MdModeEditOutline onClick={() => { setblogId(item._id), setupdatePopup(true) }} className='text-[#4f619f] cursor-pointer' />
                                                <FaTrash onClick={() => { deleteProduct(item._id), setDelBlog(!delBlog) }} className='text-red-600 cursor-pointer text-sm' />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>

                            </table>
                        </div>
                    )
                }



                {
                    createPopup && (
                        <div className='absolute top-0 left-0 w-[100%] h-screen bg-black z-50 bg-opacity-50'>
                            <div className='flex justify-center items-end md:w-[80%] w-[100%] h-[70%]'>
                                <Popup setcreatePopup={setcreatePopup} createPopup={createPopup} />
                            </div>
                        </div>
                    )
                }

                {
                    updatePopup && (
                        <div className='absolute top-0 left-0 w-[100%] h-screen bg-black z-50 bg-opacity-50'>
                            <div className='flex justify-center items-end md:w-[80%] w-[100%] h-[70%]'>
                                <Edit blogId={blogId} setcreatePopup={setupdatePopup} createPopup={updatePopup} />
                            </div>
                        </div>
                    )
                }

                {
                    showPopup && (
                        <div className='absolute top-0 left-0 w-[100%] h-screen bg-black z-50 bg-opacity-50'>
                            <div className='flex justify-center items-end md:w-[80%] w-[100%] h-[70%]'>
                                <Show blogId={blogId} setcreatePopup={setshowPopup} createPopup={showPopup} />
                            </div>
                        </div>
                    )
                }

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

export default Table
