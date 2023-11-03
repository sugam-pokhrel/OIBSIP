const mongoose = require('mongoose');
const oderSchema = new mongoose.Schema({
    _id:{
        type:String,
        required:true
    },
    payment_id:{
        type:String,
        required:true
    },
    razorpay_signature:{
        type:String,
        required:true
    },
    user:{
        type:String,
        required:true
    },
    name:{
        type:String,
        
    },
    amount:{
        type:Number,

    },
    status:{
        type:String,
        default:"Received"
        
        
        
    },
    


    }
    
)

module.exports=mongoose.model('Order',oderSchema)