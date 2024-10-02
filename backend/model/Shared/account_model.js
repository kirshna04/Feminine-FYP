const mongoose = require('mongoose');
// CUSTOMER AND SELLER COMMON ACCOUNT 

const user_account_schema =new mongoose.Schema({
    
    role:{type:String,required:true},
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    otp:{type:String,default:null},
    otp_verified:{type:Boolean,default:false},
    otp_valid_till:{type:Number},
    account_verified:{type:Boolean,default:false}
},{timestamps:true})


const user_account =new mongoose.model("user_account",user_account_schema,"user_account")

module.exports = user_account