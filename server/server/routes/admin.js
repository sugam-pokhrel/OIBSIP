const router=require('express').Router();
const OTPModel=require('../db/schemas/otp')
const bcrypt = require('bcrypt');
const Admin=require('../db/schemas/Admin')
router.post('/register',async(req,res)=>{

    console.log('creating Admin');


    let {name,email,password}=req.body
    console.log(req.body)



    if(!name || !email || !password){
        return res.status(400).json({error:"please add all the fields"})
    }

    const AdminExists=await Admin.findOne({email:email})
    if(AdminExists){
    return res.status(400).json({error:"Admin already exists"})
    }

    let admin=async()=>{
        try{
            let newAdmin=await new Admin({name,email,password,role:req.body.role?req.body.role:0})
            await newAdmin.save()
            const randomNum = Math.floor(Math.random() * 100000);
            await OTPModel.create({ email: email, otp: randomNum });
            await sendEmail(email,randomNum)
            console.log("Email in action")
            return res.json({message:"please verify your opt to continue"})




        }
        catch(error){
            await OTPModel.deleteOne({email:email})

            console.log(error)
            return res.status(400).json({error:"error adding Admin"})
        }
    }
    admin();

    //         await generateToken(res,newAdmin._id)


    //         return res.json({message:"Admin added successfully"})
    //     }catch(error){
    //         console.log(error)
    //        
    //     }
    // }

  

})

module.exports=router;