import React, { useRef, useState } from 'react'
import { accountScreensColor } from '../../../constant/color'
import { ImCross } from 'react-icons/im'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { usePostBlogMutation } from '../../../services/api\'s/common/userAccountApi';
const Popup = ({ setcreatePopup }) => {
    const [blogData, setblogData] = useState({ title: "", description: "" })
    const inputRef = useRef(null);
    const [image, setImage] = useState(null)
    const [loading, setloading] = useState(false)
    const [postBlog] = usePostBlogMutation()

    const handleOnChange = (e) => {
        console.log(e.target.files)
        setImage(e.target.files[0])
    };
    const handleClick = () => {
        inputRef.current.click();
    };

    const submitData = async() => {
        setloading(true)
        if (!blogData.description || !blogData.title || !image?.name) {
            toast.error("All Fields Are Required")
            setloading(false)
        }
        else {

            const formData = new FormData();
            formData.append("title", blogData.title);
            formData.append("description", blogData.description);
            formData.append("image", image);
            let result = await postBlog(formData)
            if (result.data) {
                toast.success("Blog Added")
                setloading(false)
                setTimeout(() => {
                    setcreatePopup(false)
                }, 2000);
            }
            else{
                setloading(false)
                console.log(result.error)
            }
        }
    }
    return (
        <div className='bg-white px-5 py-3 w-[20rem] rounded-md'>

            <div className='flex justify-between items-center mb-4'>
                <h1>Add Blog</h1>
                <ImCross onClick={() => { setcreatePopup(false) }} className=' cursor-pointer' />
            </div>

            <input style={{ border: "1px solid lightgray" }} className='outline-none w-[100%]  mb-4 h-[2.2rem] rounded-md pl-2 pr-2 placeholder:text-sm ' type="text" name='title' placeholder='Enter Blog Title' onChange={(e)=>{setblogData({...blogData,[e.target.name]:e.target.value})}} />
            <textarea style={{ border: "1px solid lightgray" }} className='outline-none w-[100%]  mb-4 h-[6rem] rounded-md pl-2 pr-2 placeholder:text-sm  resize-none pt-2' type="text" name='description' placeholder='Enter Blog Desscription' onChange={(e)=>{setblogData({...blogData,[e.target.name]:e.target.value})}} />

            <div style={{ border: "1px solid lightgray" }} className={`h-[2.5rem] flex justify-center items-center rounded-md mb-2 ${image?.name && `bg-[${accountScreensColor.buttonBg}]`}`}>
                <label htmlFor="file-input">
                    <button className={` ${image ? "text-[#eff3fc]" : "text-[gray]"}`} onClick={handleClick}>{image ? "File Uploaded" : "Upload Image"}</button>
                </label>
                <input id="file-input" multiple type="file" ref={inputRef} onChange={handleOnChange} style={{ display: 'none' }} />
            </div>

            {/* <button className={`w-[100%] h-[2.5rem] mb-2 bg-[${accountScreensColor.buttonBg}] shadow-btnshadow1 text-white rounded-[8px]`}>Upload Image</button> */}
            <button onClick={submitData} className={`w-[100%] h-[2.5rem] bg-[${accountScreensColor.buttonBg}] shadow-btnshadow1 text-white rounded-[8px]`}>{loading ?"Loading...":"Add Blog"}</button>
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
