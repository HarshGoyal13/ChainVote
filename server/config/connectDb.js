const mongoose = require("mongoose");
require("dotenv").config();


const connectDb = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("DB Connection Successfully");
    }catch(error){
        console.log(error);
        console.log("ERROR In Database COnnection");
    }
}

module.exports = connectDb;