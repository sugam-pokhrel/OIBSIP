const express = require('express');
const router = express.Router()
const Payment=require('../db/schemas/oderSchema')
const instance = require('../utils/razorpay');
const crypto = require('crypto');
const auth=require('../middleware/authMiddleware')
const pizzaBase=require('../db/schemas/pizzaBases')
const Sauce=require('../db/schemas/Sauce')
const Cheese=require('../db/schemas/cheese')
const PIZZA=require('../db/schemas/products')




router.post('/checkout', async (req, res) => {
    const options ={
        amount:Number(req.body.amount*100),
        currency:"INR",
    };
    const order = await instance.orders.create(options);
    console.log(order);
    res.status(200).json({
        success:true,order
    })


})

router.post('/paymentverification', async (req, res) => {
   
    console.log(req.query.q)

    let Userdata=JSON.parse(req.query.q)
    

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    try {
        const expectedSignature = crypto.createHmac('sha256', 'HX3FFmsIsX9CYHbKTBeQNPWK').update(body).digest('hex');
        const isAuth = expectedSignature === razorpay_signature;
        
        if (isAuth) {
            let data=await Payment.create({
                _id: razorpay_order_id,
                payment_id: razorpay_payment_id,
                razorpay_signature: razorpay_signature,
                user:Userdata.email,
                name:Userdata.name,
                amount:Userdata.amount
            });

          

         if(Userdata.isProduct===true) {
            let pizza=await PIZZA.findById(Userdata.id)

            pizza.quantity -= Userdata.quantity;
            await pizza.save();

            

         }else{
            let base=await pizzaBase.findOne({name:Userdata.pizzaTypeBase})
         let sauce=await Sauce.findOne({name:Userdata.pizzaTypeSauce})
         let cheese=await Cheese.findOne({name:Userdata.pizzaTypeCheese})
         console.log(base)

        base.quantity -= Userdata.quantity;
        sauce.quantity -= Userdata.quantity;
        cheese.quantity -= Userdata.quantity;
        
       
        await base.save();
        await sauce.save();
        await cheese.save();

         

         


         }  

         

            return res.redirect(`http://localhost:5173/`);
        } else {
            return res.status(400).json({ success: false });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, error: 'Server error' });
    }
});


module.exports = router;