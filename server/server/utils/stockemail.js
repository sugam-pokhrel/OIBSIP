const nodemailer = require('nodemailer');

const User = require('../db/schemas/User');

const sendEmail=async(text)=>{

    let users=await User.find({role:1}).select('email');
    let emailArray = users.map((user) => user.email);
    
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
  to:emailArray , // recipient email
  subject: 'LOW STOCK', // email subject
  text: 'DEAR AMIN'+" "+text, // email text
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

    console.log(error)

   
    



}    
    

}

module.exports=sendEmail;