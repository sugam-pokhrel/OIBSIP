const Razorpay=require('razorpay')
require('dotenv').config({path:'../'});

const instance=new Razorpay({
    key_id:'rzp_test_qmiqtGUuo3fSew',
    key_secret:'HX3FFmsIsX9CYHbKTBeQNPWK'
})
module.exports=instance