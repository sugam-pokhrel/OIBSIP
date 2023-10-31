const mongoose=require('mongoose')
const bcrypt = require('bcrypt');
const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        maxlength:32
    },
    verified:{
        type:Boolean,
        default:false
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        trim:true,
        
    },
    salt:String,
    role:{
        type:Number,
        default:0
    },
    purchases:{
        type:Array,
        default:[]
    }
},{timestamps:true})



UserSchema.pre('save', async function (next) {
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

UserSchema.methods.comparePassword=async function(password,next){
    try{
        let result=await bcrypt.compare(password,this.password)
        return result
    }catch(error){
        return next(error)
    }
}  
  
const User=mongoose.model('User',UserSchema);
module.exports=User

