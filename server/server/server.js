const express=require('express')
const dotenv=require('dotenv')
const connect=require('./db/connect')
const user=require('./routes/user')
const router=express.Router();
const cookieParser=require('cookie-parser');
const protect = require('./middleware/authMiddleware');
const admin=require('./routes/admin')
const cors=require('cors')
const payment=require('./routes/payment')
const PizzaBase=require('./db/schemas/pizzaBases')
const Sauce=require('./db/schemas/Sauce')
const Cheese=require('./db/schemas/cheese')
const products=require('./db/schemas/products')


dotenv.config({path:'./.env'});
// const cors=require('cors')
// const mongoose=require('mongoose')


// const pizzaBaseNames = ["Pepperoni", "Margherita", "Vegetarian", "Chicken", "BBQ"];
// const sauceNames = ["Spicy Red Sauce", "BBQ Sauce", "Buffalo Sauce", "Marinara Sauce", "Chocolate Sauce"];
// const cheeseNames = ["MOZZARELLA", "AGED HAVARTI", "GORGONZOLA"];


const app=express()
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(cookieParser())
app.use(cors('*'))

connect()

app.use('/user',user)

app.get('/test',protect,(req,res)=>{
    console.log(req.user)
    res.send("hello")
}
)

app.use('/admin',admin)

app.use('/razorpay',payment)

app.get("/api/getkey",(req,res)=>{
    return res.status(200).json({key:'rzp_test_qmiqtGUuo3fSew'})
})

app.get('/pizza1',async(req,res)=>{
    let product=await  products.find({});
    return res.json(product)

})    
app.get('/pizza',async(req,res)=>{
    let product=await  products.find({}).select('title').select('quantity');
   

    return res.json(product)

}).post('/pizza',async(req,res)=>{
    let pizzaBase=await products.findById(req.body.id)
    pizzaBase.quantity=30;
    await pizzaBase.save()
    return res.json(pizzaBase);
    


});    

app.get('/sauce',async(req,res)=>{
    let sauce=await Sauce.find({})
    return res.json(sauce)

}).post('/sauce',async(req,res)=>{
    let pizzaBase=await Sauce.findById(req.body.id)
    pizzaBase.quantity=30;
    await pizzaBase.save()
    return res.json(pizzaBase)
    


});
app.get('/cheese',async(req,res)=>{
    let cheese=await Cheese.find({})
   return res.json(cheese)


}
).post('/cheese',async(req,res)=>{
    let pizzaBase=await Cheese.findById(req.body.id)
    pizzaBase.quantity=30;
    await pizzaBase.save()
    return res.json(pizzaBase)
    


});
app.get('/pizzabase',async(req,res)=>{
    let pizzaBase=await PizzaBase.find({})
   return res.json(pizzaBase)

}).post('/pizzabase',async(req,res)=>{
    let pizzaBase=await PizzaBase.findById(req.body.id)
    pizzaBase.quantity=30;
    await pizzaBase.save()
   return res.json(pizzaBase)



});





// app.get('/pizza',async(req,res)=>{
//     const saveData = async () => {
//         try {
//           // Save pizza bases
//           await PizzaBase.create({ name: "Pepperoni" });
//           await PizzaBase.create({ name: "Margherita" });
//           await PizzaBase.create({ name: "Vegetarian" });
//           await PizzaBase.create({ name: "Chicken" });
//           await PizzaBase.create({ name: "BBQ" });
      
//           // Save sauces
//           await Sauce.create({ name: "Spicy Red Sauce" });
//           await Sauce.create({ name: "BBQ Sauce" });
//           await Sauce.create({ name: "Buffalo Sauce" });
//           await Sauce.create({ name: "Marinara Sauce" });
//           await Sauce.create({ name: "Chocolate Sauce" });
      
//           // Save cheeses
//           await Cheese.create({ name: "MOZZARELLA" });
//           await Cheese.create({ name: "AGED HAVARTI" });
//           await Cheese.create({ name: "GORGONZOLA" });
      
//           console.log('Data saved to MongoDB');
//         } catch (error) {
//           console.error('Error saving data: ', error);
//         }
   
// }
// await saveData();

//     res.send("hello")
// })














app.listen(process.env.PORT,()=>{
    console.log("server is running on port "+process.env.PORT)
}
)
