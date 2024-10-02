import React, {useRef, useState } from 'react'
import { useGetSingleroductQuery, useUpdateProductMutation } from '../../../services/api\'s/common/userAccountApi'
import { ImCross } from 'react-icons/im'
import { ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Button from '../../../components/button/Button'

const UpdateProductPopup = ({ productId, setUpdateProductPopup }) => {
    const { data } = useGetSingleroductQuery(productId)
    const [productImage, setproductImage] = useState([])
    const [productDetails, setProductDetails] = useState({
        title: data?.SingleProduct?.title?data?.SingleProduct?.title: null,
        description: data?.SingleProduct?.description?data?.SingleProduct?.description : null,
        quantity: data?.SingleProduct?.quantity?data?.SingleProduct?.quantity: null,
        price: data?.SingleProduct?.price?data?.SingleProduct?.quantity : null,
        discount: data?.SingleProduct?.discount?data?.SingleProduct?.discount: null,
    })


    const[updateProduct]=useUpdateProductMutation()
    const [loader, setloader] = useState(false)


    // IMAGE UPLOAD FUNCTION
    const inputRef = useRef(null);
    const handleOnChange = (e) => {
        setproductImage(e.target.files)
    };
    const handleClick = () => {
        inputRef.current.click();
    };

    // INPUT FIELDS ONCHANGE FUNTION 
    const onChangeInput = (e) => {
        setProductDetails({ ...productDetails, [e.target.name]: e.target.value })
    }
    // SUBMIT DATA FUNCTION 
    const updateData = async() => {
        setloader(true)
        const formData = new FormData();
        formData.append("title", productDetails.title || data?.SingleProduct?.title);
        formData.append("description", productDetails.description || data?.SingleProduct?.description);
        formData.append("quantity", productDetails.quantity || data?.SingleProduct?.quantity);
        formData.append("price", productDetails.price || data?.SingleProduct?.price);
        formData.append("discount", productDetails.discount||0);
        Array.from(productImage).forEach(images=>{
            formData.append("images",images)
        }) 

        let result = await updateProduct({ productId, productData: formData })
        if(result?.data){
            toast.success("Product Updated")
            setloader(false)
            setTimeout(() => {
                setUpdateProductPopup(false)
            }, 3000);
        }
        else{
            setloader(false)
            console.log(result.error)
        }
    }


    return (
        <div className='bg-white w-fit p-3 rounded-md shadow-productShadow sm:m-0 m-3'>
            {/* HEADING AND CLOSE POPUP BUTTON  */}
            <div className='flex justify-between items-center'>
                <h1>Update Product</h1>
                <div className='bg-[#eff3fc] min-w-[2rem] min-h-[2rem] flex justify-center gap-x-4 items-center rounded-md cursor-pointer'>
                    <ImCross className='text-sm' onClick={() => setUpdateProductPopup(false)} />
                </div>
            </div>

            {/* PRODUCT NAME AND DESCRIPTION  */}
            <div className='mt-3'>
                <div className='block sm:flex sm:justify-between sm:items-center sm:gap-x-3'>
                    <input defaultValue={productDetails?.title ? productDetails?.title:data?.SingleProduct?.title} style={{ border: "1px solid lightgray" }} onChange={onChangeInput} className='outline-none flex-none w-[100%] sm:mb-0 mb-2 sm:flex-1 h-[2.2rem] rounded-md pl-2 pr-2 placeholder:text-sm' type="text" name='title' placeholder='Enter Product Name' />
                </div>
            </div>

            <div className='sm:mt-3 sm:mb-3'>
            <textarea defaultValue={productDetails?.description ? productDetails?.description:data?.SingleProduct?.description} style={{ border: "1px solid lightgray" }} onChange={onChangeInput} className='outline-none flex-none w-[100%] sm:mb-0  sm:flex-1 h-[3rem] sm:h-[7rem] pt-2 pb-2 resize-none rounded-md pl-2 pr-2 placeholder:text-sm' type="text" name='description' placeholder='Enter Product Description' />

            </div>

            {/* PRODUCT PRICE AND QUANTITY  */}
            <div className='block sm:flex sm:justify-between sm:items-center sm:gap-x-3 mb-3'>
                <input defaultValue={productDetails?.price ? productDetails?.price:data?.SingleProduct?.price} onChange={onChangeInput} style={{ border: "1px solid lightgray" }} className='outline-none flex-none w-[100%] sm:mb-0 mb-2 sm:flex-1 h-[2.2rem] rounded-md pl-2 pr-2 placeholder:text-sm' type="number" name='price' placeholder='Enter Product Price' />
                <input defaultValue={productDetails?.quantity ? productDetails?.quantity:data?.SingleProduct?.quantity} onChange={onChangeInput} style={{ border: "1px solid lightgray" }} className='outline-none flex-none w-[100%] sm:mb-0 mb-2 sm:flex-1 h-[2.2rem] rounded-md pl-2 pr-2 placeholder:text-sm' type="number" name='quantity' placeholder='Enter Product Quantity' />
            </div>

            {/* PRODUCT DISCOUNT AND PRICE  */}

            <div className='block sm:flex sm:justify-between sm:items-center sm:gap-x-3 mb-3'>
                <input defaultValue={productDetails?.discount ? productDetails?.discount:data?.SingleProduct?.discount} onChange={onChangeInput} style={{ border: "1px solid lightgray" }} className='outline-none flex-none w-[100%] sm:mb-0 mb-2 sm:flex-1 h-[2.2rem] rounded-md pl-2 pr-2 placeholder:text-sm' type="number" name='discount' placeholder='Enter Discount In %' />
                <input readOnly value={
                    productDetails?.price ? productDetails?.price - (productDetails?.price * (productDetails?.discount / 100)):data?.SingleProduct?.price - (data?.SingleProduct?.price * (data?.SingleProduct?.discount / 100))
                } style={{ border: "1px solid lightgray" }} className='outline-none flex-none w-[100%] sm:mb-0 mb-2 sm:flex-1 h-[2.2rem] pointer-events-none rounded-md pl-2 pr-2 placeholder:text-sm' type="number" placeholder='Discounted Price' />
            </div>


            {/* IMAGE UPLOAD  */}
            <div style={{ border: "1px solid lightgray" }} className={`h-[2.2rem] flex justify-center items-center rounded-md ${productImage.length > 0 && "bg-[#4f619f]"}`}>
                <label htmlFor="file-input">
                    <button className={`text-sm ${productImage.length > 0 ? "text-[#eff3fc]" : "text-[gray]"}`} onClick={handleClick}>{productImage.length ===0 ? "Upload More Images" : productImage?.length + " New Images Uploaded"}</button>
                </label>
                <input id="file-input" multiple type="file" ref={inputRef} onChange={handleOnChange} style={{ display: 'none' }} />
            </div>

            {/* SUBMIT BUTTON  */}
            <div style={{ border: "1px solid lightgray" }} className='rounded-md flex justify-center items-center mt-3 shadow-otpShadow bg-[#4f619f]' onClick={updateData}>
                <div className='flex justify-center gap-x-3 items-center text-[#eff3fc] cursor-pointer  w-[8rem] sm:w-[10rem] h-[2.1rem] rounded-md'>
                    <Button text={loader?"Loading ...":"Update Product"} className={"text-sm"} />
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

export default UpdateProductPopup
