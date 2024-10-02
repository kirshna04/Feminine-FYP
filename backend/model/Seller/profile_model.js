const mongoose = require('mongoose');

const profile_schema = mongoose.Schema({
    account_id:{ type:mongoose.Types.ObjectId, ref:"user_account" },
    name:{type:String},
    email:{type:String},
    country:{type:String},
    city:{type:String},
    image:{type:String}
})


const sellerProfile = mongoose.model('sellerProfile',profile_schema,'sellerProfile')

module.exports = sellerProfile