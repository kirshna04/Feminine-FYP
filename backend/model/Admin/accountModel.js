const mongoose = require('mongoose');

const admin_account_schema =new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    otp:{type:String,default:null},
    otp_verified:{type:Boolean,default:false},
    otp_valid_till:{type:Number},
},{timestamps:true})


const admin_account =new mongoose.model("admin_account",admin_account_schema,"admin_account")

module.exports = admin_account