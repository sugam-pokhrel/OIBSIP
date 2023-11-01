const mongoose = require('mongoose');
const sendEmail = require('../../utils/stockemail');
const cheeseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 32,
  },
  price: {
    type: Number,
    default: 10,
    trim: true,
    maxlength: 32,
  },
  quantity: {
    type: Number,
    default: 30,
    trim: true,
    maxlength: 32,
  },
});

cheeseSchema.pre('save', function (next) {
  if (this.isModified('quantity') && this.quantity <= 5) {
    // Perform your custom actions here, e.g., send notifications or trigger an event
    // This code will run whenever the 'quantity' field is modified and falls below 5.
    console.log('Cheese quantity is below 5!');
    sendEmail('Cheese quantity is below 5!')
    // Replace the console.log statement with your custom event handling logic.
  }
  next();
});

const Cheese = mongoose.model('Cheese', cheeseSchema);
module.exports = Cheese;
