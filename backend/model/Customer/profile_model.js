const mongoose = require('mongoose')

const profile_schema = mongoose.Schema({
    account_id:{ type:mongoose.Schema.Types.ObjectId, ref:"user_account" },
    name:{type:String},
    email:{type:String},
    image:{type:String,default:null},
    country:{type:String,default:null},
    city:{type:String,default:null},
    lastPeriodDate:{type:Date,default:null},
})

const customerProfile = new mongoose.model("customerProfile",profile_schema,'customerProfile')

module.exports = customerProfile