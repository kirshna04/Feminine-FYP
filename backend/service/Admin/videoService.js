const {uploadSingleFile2 } = require("../../config/firebase.config");
const { asyncErrorHandler, ErrorHandler } = require("../../middleware/Error/Utils");
const { VideoModel } = require("../../model");
const { api_messages, statusCode } = require("../../common/api_response");


const createVideo = asyncErrorHandler(async(req,res)=>{
    let thumbnail = req.files.thumbnail
    let video = req.files.video
    let thumbnailUrl=await uploadSingleFile2(thumbnail)
    let videoUrl=await uploadSingleFile2(video)
    let created= await VideoModel.create({thumbnail:thumbnailUrl,video:videoUrl})
    res.status(200).json(created)
})

// const updateBlog = asyncErrorHandler(async(req,res)=>{
//     let {title,description} = req.body
//     let image = req.file
//     if (image){
//         let imageUrl=await uploadSingleFile(image)
//         let createdBlog= await BlogModel.findByIdAndUpdate(req.params.id,{title,description,image:imageUrl})
//         res.status(200).json(createdBlog)
//     }
//     else{
//         let createdBlog= await BlogModel.findByIdAndUpdate(req.params.id,{title,description})
//         res.status(200).json(createdBlog)   
//     }
// })

const getVideo = asyncErrorHandler(async(req,res)=>{
    let all= await  VideoModel.find({})
    if (all.length>0){
        res.status(200).json(all)
    }
    else{
        throw new ErrorHandler (api_messages.no_data_found,statusCode.NotFound)
    }
})

// const getSingleBlog = asyncErrorHandler(async(req,res)=>{
//     let singleBlog= await BlogModel.findById(req?.params?.id)
//     if (singleBlog){
//         res.status(200).json(singleBlog)
//     }
//     else{
//         throw new ErrorHandler (api_messages.no_data_found,statusCode.NotFound)
//     }
// })

const deleteVideo = asyncErrorHandler(async(req,res)=>{
    let del= await VideoModel.findByIdAndDelete(req?.params?.id)
    if (del){
        res.status(200).json({msg:"Blog Deleted"})
    }
    else{
        throw new ErrorHandler (api_messages.no_data_found,statusCode.NotFound)
    }
})





module.exports = {createVideo,getVideo,deleteVideo}