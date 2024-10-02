import React, { useEffect, useState } from "react";
import { MdModeEditOutline } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import ProductCard from "./ProductCard";
import Input from "../../../components/input/Input";
import Button from "../../../components/button/Button";
import { AiOutlinePlus, AiFillEye } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import CreateProductPopup from "./CreateProductPopup";
import {
  SellerjwtDecodeFunction,
  jwtDecodeFunction,
} from "../../../helper/jwt";
import {
  useDeleteSingleProductMutation,
  useGetBuyerProductQuery,
  useGetSellerProfileQuery,
} from "../../../services/api's/common/userAccountApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UpdateProductPopup from "./UpdateProductPopup";
import { useNavigate } from "react-router-dom";

const ProductPageLayout = ({ setshowLeftSideBar, showLeftSideBar }) => {
  const [serachValue, setserachValue] = useState("");
  const [AddProductPopup, setCreateProductPopup] = useState(false);
  const [UpdateSingleProductPopup, setUpdateProductPopup] = useState(false);
  const { data } = useGetSellerProfileQuery(
    SellerjwtDecodeFunction().payload._id
  );
  // const [productData, setProductData] = useState(second)
  let productData = useGetBuyerProductQuery(data?._id).data;
  console.log(productData);
  const [deleteSingleProduct] = useDeleteSingleProductMutation();
  const [productId, setproductId] = useState("");
  const nav = useNavigate();
  const FilterData = (e) => {
    setserachValue(e.target.value);
  };

  const deleteProduct = async (id) => {
    let result = await deleteSingleProduct(id);
    if (result.data) {
      toast.success("Data Deleted");
    }
  };

  return (
    <div className="font-popins w-[100%] h-[100vh] bg-[#fbfcfe] overflow-hidden pt-5 pl-5 pr-5 md:pl-10 md:pr-10 overflow-x-auto relative">
      <div className="flex gap-x-4 items-center">
        {!showLeftSideBar && (
          <div
            onClick={() => setshowLeftSideBar(true)}
            className="bg-[#eff3fc] min-w-[2.5rem] md:hidden min-h-[2.5rem] flex justify-center items-center rounded-md"
          >
            <GiHamburgerMenu />
          </div>
        )}
        <h1 className="text-xl font-semibold">Products Page .</h1>
      </div>

      <div className="flex justify-between items-center">
        <div>{/* <h1>Total Products</h1> */}</div>
        <div
          style={{ border: "1px solid lightgray" }}
          className="rounded-md"
          onClick={() => setCreateProductPopup(true)}
        >
          <div className="flex justify-center gap-x-3 items-center bg-[#FBFBFE] overflow-hidden text-[#4f619f] w-[8rem] sm:w-[10rem] h-[2.1rem] rounded-md">
            <Button text={"Add Product"} className={"text-sm"} />
            <AiOutlinePlus />
          </div>
        </div>
      </div>

      <div className=" block mt-2">
        <Input
          name={"searchvalue"}
          style={{ border: "1px solid lightgray" }}
          onChangeFunc={FilterData}
          placeholder={"Filter By Name"}
          className={
            "bg-[#fffff] text-sm placeholder:tracking-wider  outline-none w-[100%] h-[2.5rem] pl-3 pr-5 rounded-md"
          }
        />
      </div>

      <div className="w-[100%] h-[1px] bg-[lightgray] mt-4 mb-4"></div>

      <div className="font-popins h-[70vh] mb-4 shadow-productShadow rounded-md overflow-y-auto">
        <div className="h-[100%] rounded-md p-3 w-[100%] mb-4">
          {/* MAIN TABLE  */}
          <div className="mt-3 w-full overflow-x-scroll md:overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="">
                  <th className="pb-1 pr-4  text-start font-normal whitespace-nowrap">
                    Product Id
                  </th>
                  <th className="pb-1 pl-4 pr-4 text-start font-normal whitespace-nowrap">
                    Product Name
                  </th>
                  <th className="pb-1 pl-4 pr-4 text-start font-normal whitespace-nowrap">
                    Total Quanity
                  </th>
                  <th className="pb-1 pl-4 pr-4 text-start font-normal whitespace-nowrap">
                    Price
                  </th>
                  <th className="text-start text-sm pl-4 pr-4 font-normal whitespace-nowrap">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {productData == undefined ? (
                  <tr className="w-[100%] text-xl text-center h-[50vh] ">
                    <td colSpan={8} className="">
                      No Products Found
                    </td>
                  </tr>
                ) : (
                  productData?.AllProduct?.filter((value) => {
                    return value?.title
                      ?.toLowerCase()
                      .includes(serachValue.toLowerCase());
                  })?.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td
                          style={{ borderBottom: "1px solid lightgray" }}
                          className="pr-4 pt-3 pb-3 text-sm whitespace-nowrap"
                        >
                          {item?._id}
                        </td>
                        <td
                          style={{ borderBottom: "1px solid lightgray" }}
                          className="pl-4 pr-4 pt-3 pb-3 text-sm whitespace-nowrap"
                        >
                          {item?.title}
                        </td>
                        <td
                          style={{ borderBottom: "1px solid lightgray" }}
                          className="pl-4 pr-4 pt-3 pb-3 text-sm whitespace-nowrap"
                        >
                          {item?.quantity}
                        </td>
                        <td
                          style={{ borderBottom: "1px solid lightgray" }}
                          className="pl-4 pr-4 pt-3 pb-3 text-sm whitespace-nowrap"
                        >
                          {item?.price}
                        </td>
                        <td
                          style={{ borderBottom: "1px solid lightgray" }}
                          className="pt-4 pb-4 pl-4 pr-4 text-start whitespace-nowrap flex items-center gap-x-4"
                        >
                          <AiFillEye
                            onClick={() =>
                              nav(`/seller/dashboard/product/view/${item?._id}`)
                            }
                            className="text-[#4f619f] cursor-pointer"
                          />
                          <MdModeEditOutline
                            onClick={() => {
                              setUpdateProductPopup(true),
                                setproductId(item?._id);
                            }}
                            className="text-[#4f619f] cursor-pointer"
                          />
                          <FaTrash
                            onClick={() => deleteProduct(item?._id)}
                            className="text-red-600 cursor-pointer text-sm"
                          />
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* POPUPS  */}

      {/* CREATE PRODUCT POPUP  */}

      {AddProductPopup && (
        <div className=" absolute top-0 left-0 bg-black w-[100%] h-[100%] bg-opacity-50">
          <div className="flex justify-center items-center h-[100%] bg-opacity-100">
            <CreateProductPopup setCreateProductPopup={setCreateProductPopup} />
          </div>
        </div>
      )}

      {/* UPDATE PRODUCT POPUP  */}
      {UpdateSingleProductPopup && (
        <div className=" absolute top-0 left-0 bg-black w-[100%] h-[100%] bg-opacity-50">
          <div className="flex justify-center items-center h-[100%] bg-opacity-100">
            <UpdateProductPopup
              productId={productId}
              setUpdateProductPopup={setUpdateProductPopup}
            />
          </div>
        </div>
      )}

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
  );
};

export default ProductPageLayout;
