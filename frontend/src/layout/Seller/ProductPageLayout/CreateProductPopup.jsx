import React, { useEffect, useRef, useState } from 'react'
import { ImCross } from 'react-icons/im'
import Button from '../../../components/button/Button'
import { SellerjwtDecodeFunction } from '../../../helper/jwt';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useGetSellerProfileQuery, usePostProductMutation } from '../../../services/api\'s/common/userAccountApi';

const CreateProductPopup = ({ setCreateProductPopup }) => {

    const inputRef = useRef(null);
    const [discountedAmount, setdiscountedAmount] = useState(0)
    const [productImage, setproductImage] = useState([])
    const [accountId] = useState(SellerjwtDecodeFunction().payload._id)
    const { data } = useGetSellerProfileQuery(accountId)
    const [productDeatls, setProductDeatils] = useState({
        title: "",
        description: "",
        quantity: "",
        price: "",
        discount: "",
        seller_id:data._id
    })
    const [loader, setloader] = useState(false)
    const [postProduct] = usePostProductMutation()

    const handleOnChange = (e) => {
        setproductImage(e.target.files)
    };
    const handleClick = () => {
        inputRef.current.click();
    };

    const onChangeInput = (e) => {
        setProductDeatils({ ...productDeatls, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        setdiscountedAmount(productDeatls.price - (productDeatls.price * (productDeatls.discount / 100)))
    }, [productDeatls.price, productDeatls.discount]);

    const submitData = async () => {
        setloader(true)
        const formData = new FormData();
        formData.append("title", productDeatls.title);
        formData.append("description", productDeatls.description);
        formData.append("quantity", productDeatls.quantity);
        formData.append("price", productDeatls.price);
        formData.append("discount", productDeatls.discount);
        formData.append("seller_id", productDeatls.seller_id);
        Array.from(productImage).forEach(images => {
            formData.append("images", images)
        })

        if (!productDeatls.description || !productDeatls.discount || productImage.length === 0 || !productDeatls.price || !productDeatls.quantity || !productDeatls.title) {
            setloader(false)
            toast.error("All Fields Are Required")
        }
        else {
            let result = await postProduct(formData)
            if (result.data) {
                toast.success("Product Added")
                setloader(false)
                setTimeout(() => {
                    setCreateProductPopup(false)
                }, 3000);
            }
            else{
                setloader(false)
                console.log(result.error)
            }
        }


    }
    return (

        <div className='bg-white w-fit p-3 rounded-md shadow-productShadow sm:m-0 m-3'>

            {/* HEADING AND CLOSE POPUP BUTTON  */}
            <div className='flex justify-between items-center'>
                <h1>Add New Product</h1>
                <div className='bg-[#eff3fc] min-w-[2rem] min-h-[2rem] flex justify-center gap-x-4 items-center rounded-md cursor-pointer'>
                    <ImCross className='text-sm' onClick={() => setCreateProductPopup(false)} />
                </div>
            </div>

            {/* MAIN INPUT FIELDS  */}
            <div className='mt-3'>

                {/* PRODUCT NAME AND DESCRIPTION  */}
                <div className='block sm:flex sm:justify-between sm:items-center sm:gap-x-3'>
                    <input style={{ border: "1px solid lightgray" }} onChange={onChangeInput} className='outline-none flex-none w-[100%] sm:mb-0 mb-2  sm:flex-1 h-[2.2rem] rounded-md pl-2 pr-2 placeholder:text-sm' type="text" name='title' placeholder='Enter Product Name' />
                </div>

                <div className='sm:mt-3'>
                    <textarea style={{ border: "1px solid lightgray" }} onChange={onChangeInput} className='outline-none flex-none w-[100%] sm:mb-0  sm:flex-1 h-[3rem] sm:h-[7rem] pt-2 pb-2 resize-none rounded-md pl-2 pr-2 placeholder:text-sm' type="text" name='description' placeholder='Enter Product Description' />
                </div>


                {/* PRODUCT PRICE AND QUANTITY  */}

                <div className='block sm:flex sm:justify-between sm:items-center sm:gap-x-3 mb-3'>
                    <input onChange={onChangeInput} style={{ border: "1px solid lightgray" }} className='outline-none flex-none w-[100%] sm:mb-0 mb-2 sm:flex-1 h-[2.2rem] rounded-md pl-2 pr-2 placeholder:text-sm' type="number" name='price' placeholder='Enter Product Price' />
                    <input onChange={onChangeInput} style={{ border: "1px solid lightgray" }} className='outline-none flex-none w-[100%] sm:mb-0 mb-2 sm:flex-1 h-[2.2rem] rounded-md pl-2 pr-2 placeholder:text-sm' type="number" name='quantity' placeholder='Enter Product Quantity' />
                </div>

                {/* PRODUCT DISCOUNT AND PRICE  */}

                <div className='block sm:flex sm:justify-between sm:items-center sm:gap-x-3 mb-3'>
                    <input onChange={onChangeInput} style={{ border: "1px solid lightgray" }} className='outline-none flex-none w-[100%] sm:mb-0 mb-2 sm:flex-1 h-[2.2rem] rounded-md pl-2 pr-2 placeholder:text-sm' type="number" name='discount' placeholder='Enter Discount In %' />
                    <input readOnly value={discountedAmount} style={{ border: "1px solid lightgray" }} className='outline-none flex-none w-[100%] sm:mb-0 mb-2 sm:flex-1 h-[2.2rem] pointer-events-none rounded-md pl-2 pr-2 placeholder:text-sm' type="number" placeholder='Discounted Price' />
                </div>

                {/* IMAGE UPLOAD  */}
                <div style={{ border: "1px solid lightgray" }} className={`h-[2.2rem] flex justify-center items-center rounded-md ${productImage.length > 0 && "bg-[#4f619f]"}`}>
                    <label htmlFor="file-input">
                        <button className={`text-sm ${productImage.length > 0 ? "text-[#eff3fc]" : "text-[gray]"}`} onClick={handleClick}>{productImage.length > 0 ? "File Uploaded" : "Upload File"}</button>
                    </label>
                    <input id="file-input" multiple type="file" ref={inputRef} onChange={handleOnChange} style={{ display: 'none' }} />
                </div>

                {/* ADD PRODUCT  */}
                <div style={{ border: "1px solid lightgray" }} className='rounded-md flex justify-center items-center mt-3 shadow-otpShadow bg-[#4f619f]' onClick={submitData}>
                    <div className='flex justify-center gap-x-3 items-center text-[#eff3fc] cursor-pointer  w-[8rem] sm:w-[10rem] h-[2.1rem] rounded-md'>
                        <Button text={loader?"Loading ...":"Post Product"} className={"text-sm"} />
                    </div>
                </div>


            </div>

            <ToastContainer
                position="top-right"
                autoClose={2500}
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

export default CreateProductPopup
