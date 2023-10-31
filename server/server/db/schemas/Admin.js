const mongoose=require('mongoose');
const bcrypt = require('bcrypt');

const adminSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        min:3,
        max:20
    },
    email:{
        type:String,
        
        required:true,
        trim:true,
        unique:true,
        lowercase:true,
    },

    password:{

    },
    role:{
        type:Number,
        default:1
    }

},{timestamps:true})

adminSchema.pre('save', async function (next) {
    // Only hash the password if it has been modified (or is new)
    if (!this.isModified('password')) {
      return next();
    }
  
    try {
      // Generate a salt and hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(this.password, salt);
  
      // Store the hashed password in the database
      this.password = hashedPassword;
      next();
    } catch (error) {
      return next(error);
    }
  });

adminSchema.methods.comparePassword=async function(password,next){
    try{
        let result=await bcrypt.compare(password,this.password)
        return result
    }catch(error){
        return next(error)
    }
}  
  

const Admin=mongoose.model('Admin',adminSchema)
module.exports=Admin

