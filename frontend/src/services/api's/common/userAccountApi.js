import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { base_url } from "../base_url";

export const userAccountApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: base_url,
  }),
  tagTypes: ["BuyerProfile", "Product", "Blog","SellerProfile"],
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (userData) => ({
        url: "/user-registration",
        method: "POST",
        body: userData,
      }),
    }),
    verifyAccount: builder.mutation({
      query: ({id,otp}) => ({
        url: `/user/verify/account/${id}`,
        method: "PUT",
        body: {otp},
      }),
    }),
    resendOtp: builder.mutation({
      query: (id) => ({
        url: `/user/resend/otp/${id}`,
        method: "PUT"
      }),
    }),
    loginUser: builder.mutation({
      query: (userData) => ({
        url: "/user-login",
        method: "POST",
        body: userData,
      }),
    }),
    sendOtp: builder.mutation({
      query: (userData) => ({
        url: "/forget-password/send-otp",
        method: "POST",
        body: userData,
      }),
    }),
    verifyOtp: builder.mutation({
      query: (userData) => ({
        url: "/forget-password/verify-otp",
        method: "POST",
        body: userData,
      }),
    }),
    changePassword: builder.mutation({
      query: (userData) => ({
        url: "/forget-password/change-password",
        method: "POST",
        body: userData,
      }),
    }),
    updatePassword: builder.mutation({
      query: ({ id, password }) => ({
        url: `/change/password/${id}`,
        method: "PUT",
        body: password,
      }),
    }),
    // PRODUCT APIS
    postProduct: builder.mutation({
      query: (productData) => ({
        url: "/create/product",
        method: "POST",
        body: productData,
      }),
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation({
      query: ({ productId, productData }) => ({
        url: `/update/product/${productId}`,
        method: "PUT",
        body: productData,
      }),
      invalidatesTags: ["Product"],
    }),
    // GET ALL PRODUCT
    getProduct: builder.mutation({
      query: () => ({
        url: "/get/product",
        method: "GET",
      }),
      providesTags: ["Product"],
    }),
    // GET BY SELLER
    getBuyerProduct: builder.query({
      query: (sellerId) => ({
        url: `/get/product/seller/${sellerId}`,
        method: "GET",
      }),
      providesTags: ["Product"],
    }),
    // GET SINGLE
    getSingleroduct: builder.query({
      query: (productId) => ({
        url: `/get/product/${productId}`,
        method: "GET",
      }),
      providesTags: ["Product"],
    }),
    //DELETE PRODUCT
    deleteSingleProduct: builder.mutation({
      query: (productId) => ({
        url: `/delete/product/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),

    // BLOG APIS
    postBlog: builder.mutation({
      query: (blogData) => ({
        url: "/blog/create",
        method: "POST",
        body: blogData,
      }),
      invalidatesTags: ["Blog"],
    }),
    updateBlog: builder.mutation({
      query: ({ BlogId, blogData }) => ({
        url: `/blog/update/${BlogId}`,
        method: "PUT",
        body: blogData,
      }),
      invalidatesTags: ["Blog"],
    }),

    getBlog: builder.mutation({
      query: () => ({
        url: "/blog/all",
        method: "GET",
      }),
      providesTags: ["Blog"],
    }),
    // GET SINGLE
    getSingleBlog: builder.query({
      query: (blogId) => ({
        url: `/blog/single/${blogId}`,
        method: "GET",
      }),
      providesTags: ["Blog"],
    }),
    //DELETE PRODUCT
    deleteBlog: builder.mutation({
      query: (blogId) => ({
        url: `/blog/delete/${blogId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Blog"],
    }),

    // GET BUYER PROFILE
    getBuyerProfile: builder.query({
      query: (accountId) => ({
        url: `/buyer/profile/${accountId}`,
        method: "GET",
      }),
      providesTags: ["BuyerProfile"],
    }),
    updateBuyerProfile: builder.mutation({
      query: ({ accountId, profileData }) => ({
        url: `/buyer/profile/update/${accountId}`,
        method: "PUT",
        body: profileData,
      }),
      invalidatesTags: ["BuyerProfile"],
    }),
    // SELLER PROFILE
    getSellerProfile: builder.query({
      query: (accountId) => ({
        url: `/seller/profile/${accountId}`,
        method: "GET",
      }),
      providesTags: ["SellerProfile"],
    }),
    updateSellerProfile: builder.mutation({
      query: ({ accountId, profileData }) => ({
        url: `/seller/profile/update/${accountId}`,
        method: "PUT",
        body: profileData,
      }),
      invalidatesTags: ["SellerProfile"],
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useVerifyAccountMutation,
  useResendOtpMutation,
  useLoginUserMutation,
  useUpdatePasswordMutation,
  useSendOtpMutation,
  useVerifyOtpMutation,
  useChangePasswordMutation,
  usePostProductMutation,
  useGetProductMutation,
  usePostBlogMutation,
  useGetBuyerProductQuery,
  useGetSingleroductQuery,
  useDeleteSingleProductMutation,
  useUpdateProductMutation,
  useGetBlogMutation,
  useGetSingleBlogQuery,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
  useGetBuyerProfileQuery,
  useUpdateBuyerProfileMutation,
  useGetSellerProfileQuery,
  useUpdateSellerProfileMutation
} = userAccountApi;
