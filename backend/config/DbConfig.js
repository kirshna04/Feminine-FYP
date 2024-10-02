const mongoose = require('mongoose');
const { databaseConnectionMessages } = require('../common/api_response');

const dbConnection = async()=>{
    let connection = await mongoose.connect(`${process?.env?.MONGO_URL}`)
    if(!connection){
        console.log(databaseConnectionMessages?.failure)
    }
    console.log(databaseConnectionMessages?.success)

}

module.exports = {dbConnection}
