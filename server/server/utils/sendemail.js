const nodemailer = require('nodemailer');
const OTPModel = require('../db/schemas/otp');


const sendEmail=async(email,text)=>{


try{
console.log(process.env.EMAIL)

// Create a transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  service: 'Gmail', // e.g., 'Gmail', 'Outlook', 'Yahoo', etc.
  auth: {
    
    user: process.env.EMAIL, // your email address
    pass: process.env.APPPASSWORD, // your email password or an app-specific password
  },
  debug: true,
});

// Email data
const mailOptions = {
  from: process.env.EMAIL, // sender email
  to:email , // recipient email
  subject: 'Verify you otp', // email subject
  text: 'The otp is'+" "+text, // email text
};

// Send email
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error('Error sending email: ', error);
    
  } else {
    console.log('Email sent: ', info.response);
  }
});

}catch(error){

    OTPModel.deleteOne({email:email})
    



}    
    

}

module.exports=sendEmail;