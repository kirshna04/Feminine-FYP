const mongoose = require('mongoose')

const videoSchema = mongoose.Schema({
    thumbnail:{type:String,required:true},
    video:{type:String,required:true},

},{timestamps:true})


const Video = mongoose.model("Video",videoSchema,"Video")


module.exports = Video