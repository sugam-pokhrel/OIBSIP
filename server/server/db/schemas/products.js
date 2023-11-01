const mongoose = require('mongoose');
const sendEmail = require('../../utils/stockemail');
const PizzaSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
        maxlength:32
    },
    price:{
        type:Number,
        required:true,
        trim:true,
        maxlength:32
    },
    quantity:{
        type:Number,
        required:true,
        trim:true,
        maxlength:32
    },
    imageUrl:{
        type:String,
        required:true,
        trim:true,
        
    },
    rating:{
        type:Number,
        required:true,
        trim:true,
        maxlength:32
    },
    
}, {timestamps:true})

PizzaSchema.pre('save', function (next) {
    if (this.isModified('quantity') && this.quantity <= 5) {
      // Perform your custom actions here, e.g., send notifications or trigger an event
      // This code will run whenever the 'quantity' field is modified and falls below 5.
      console.log(this.title+'pizza quantity is below 5!');
      sendEmail(this.title+'pizza quantity is below 5!')
      // Replace the console.log statement with your custom event handling logic.
    }
    next();
  });

const Pizza=mongoose.model('Pizza',PizzaSchema)
module.exports=Pizza