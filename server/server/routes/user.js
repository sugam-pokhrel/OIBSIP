const express=require('express')
const User=require('../db/schemas/User');
const  generateToken = require('../utils/generateToken');
const sendEmail=require('../utils/sendemail')
const router=express.Router()
const OTPModel=require('../db/schemas/otp')
const bcrypt = require('bcrypt');
const protect=require('../middleware/authMiddleware')
const orders=require('../db/schemas/oderSchema')




//registering the user

router.post('/signup',async(req,res)=>{

    console.log('creating user');


    let {name,email,password}=req.body
    console.log(req.body)



    if(!name || !email || !password){
        return res.status(400).json({error:"please add all the fields"})
    }

    const userExists=await User.findOne({email:email})
    if(userExists&&userExists.verified==false){

        return res.status(401).json({error:"please verify your email "})


    }
    if(userExists&&req.body.isAdmin==true){
        if(userExists.role==1){
            return res.status(401).json({error:"You are already an admin"})
        }

        userExists.role=1
        await userExists.save()
        return res.json({message:"admin created successfully"})
          


      
      
    }else{
        console.log("user exists")
        try{
        return res.status(404).json({error:"user already exists"})
        }catch(e){
            console.log('e')
        }
    }

    let user=async()=>{
        try{
            let newUser=await new User({name,email,password,role:req.body.isAdmin?1:0})
            await newUser.save()
            const randomNum = Math.floor(Math.random() * 100000);
            await OTPModel.create({ email: email, otp: randomNum });
            
            await sendEmail(email,randomNum)
            console.log("Email in action")
            return res.json({message:"please verify your opt to continue"})




        }
        catch(error){
            await OTPModel.deleteOne({email:email})

            console.log(error)
            return res.status(400).json({error:"error adding user"})
        }
    }
    user();

    //         await generateToken(res,newUser._id)


    //         return res.json({message:"user added successfully"})
    //     }catch(error){
    //         console.log(error)
    //        
    //     }
    // }

  


})

router.post('/login',async(req,res)=>{
    const {email,password}=req.body
    
    const user=await User.findOne({email:email})

    if(user&&user.verified==false){
        return res.status(404).json({error:"please verify your email"})
    }
    if(user&&await user.comparePassword(password)){
        let token= await generateToken(res,user._id)
        user.password=undefined
        console.log(token)
        

        return res.json({message:"user logged in successfully",user:user,token:token})

    
    }else{
        return res.status(400).json({error:"invalid email or password"})
    }


})


router.post('/logout', async (req, res) => {
    res.clearCookie('token', { httpOnly: true }); // Change 'jwt' to 'token' to match the cookie name you used
    res.json({ message: "Logged out successfully" });
});

router.post('/verify',async(req,res)=>{

    const {email,otp}=req.body
    console.log(otp)
    const otpExists=await OTPModel.findOne({email:email,otp:otp})
    console.log(otpExists)
    if(otpExists){
        await OTPModel.deleteOne({email:email,otp:otp})
        await User.updateOne({email:email},{$set:{verified:true}})
        return res.json({message:"user verified successfully"})

    }else{
        return res.status(400).json({error:"invalid otp"})
    }

})

router.post('/forgotpassword',async(req,res)=>{
    const {email}=req.body
    const userExists=await User.findOne({email:email})
    if(userExists&&userExists.verified==false){
        return res.status(400).json({error:"please verify your email"})
    }
    let otpExists=await OTPModel.findOne({email:email})

    if(otpExists){
        await OTPModel.deleteOne({email:email})
    }
    if(userExists&&userExists.verified==true){
        const randomNum = Math.floor(Math.random() * 100000);
        await OTPModel.create({ email: email, otp: randomNum });
        await sendEmail(email,randomNum)
        console.log("Email in action")
        return res.status(400).json({error:"please verify your opt to continue"})
        

    }else{
        return res.status(400).json({error:"user does not exist"})
    }
}
)


router.post('/resetpassword',async(req,res)=>{
    let {email,otp,password}=req.body
    const otpExists=await OTPModel.findOne({email:email,otp:otp})
    if(otpExists){
        await OTPModel.deleteOne({email:email,otp:otp})


    try {
        // Generate a salt and hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
    
        // Store the hashed password in the database
        password = hashedPassword;
        
      } catch (error) {
        return res.send("Error while changing password")
        
      }

        await User.updateOne({email:email},{$set:{password:password}})
        return res.json({message:"password reset successfully"})

    }else{
        return res.status(400).json({error:"invalid otp"})
    }

})



router.post('/isadmin',protect,async(req,res)=>{
    let data=await orders.find({}).select('amount').select('user').select('name')
    let hello=0;
    console.log(data)
    data.map((order)=>{
     
      hello+=order.amount
    })
    console.log(hello)

    let users=await User.find({verified:true}).select('email')

    return res.json({hello,totalOrders:data,orders:data.length,users:users.length,usersData:users})
    



})







module.exports=router