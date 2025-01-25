const nodemailer = require("nodemailer");
require("dotenv").config();

const contactEmail = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    }
});

contactEmail.verify((error)=>{
    if(error){
        console.log("Error Verifying Email", error);
    }else{
        console.log("Ready to send");
    }
})

module.exports = contactEmail;
