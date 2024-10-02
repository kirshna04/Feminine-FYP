const { uploadSingleFile } = require("../../config/firebase.config");
const { asyncErrorHandler, ErrorHandler } = require("../../middleware/Error/Utils");
const { BlogModel } = require("../../model");
const { api_messages, statusCode } = require("../../common/api_response");


const createBlog = asyncErrorHandler(async(req,res)=>{
    let {title,description} = req.body
    let image = req.file
    let imageUrl=await uploadSingleFile(image)
    let createdBlog= await BlogModel.create({title,description,image:imageUrl})
    res.status(200).json(createdBlog)
})

const updateBlog = asyncErrorHandler(async(req,res)=>{
    let {title,description} = req.body
    let image = req.file
    if (image){
        let imageUrl=await uploadSingleFile(image)
        let createdBlog= await BlogModel.findByIdAndUpdate(req.params.id,{title,description,image:imageUrl})
        res.status(200).json(createdBlog)
    }
    else{
        let createdBlog= await BlogModel.findByIdAndUpdate(req.params.id,{title,description})
        res.status(200).json(createdBlog)   
    }
})

const getBlog = asyncErrorHandler(async(req,res)=>{
    let allBlog= await BlogModel.find({})
    if (allBlog.length>0){
        res.status(200).json(allBlog)
    }
    else{
        throw new ErrorHandler (api_messages.no_data_found,statusCode.NotFound)
    }
})

const getSingleBlog = asyncErrorHandler(async(req,res)=>{
    let singleBlog= await BlogModel.findById(req?.params?.id)
    if (singleBlog){
        res.status(200).json(singleBlog)
    }
    else{
        throw new ErrorHandler (api_messages.no_data_found,statusCode.NotFound)
    }
})

const deleteBlog = asyncErrorHandler(async(req,res)=>{
    let deleteBlog= await BlogModel.findByIdAndDelete(req?.params?.id)
    if (deleteBlog){
        res.status(200).json({msg:"Blog Deleted"})
    }
    else{
        throw new ErrorHandler (api_messages.no_data_found,statusCode.NotFound)
    }
})





module.exports = {createBlog,getBlog,getSingleBlog,updateBlog,deleteBlog}