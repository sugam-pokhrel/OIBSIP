import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';  
import { json } from "body-parser";
let initialState
const authSlice = createSlice({
    name: 'auth',
    initialState:{
        data:[],
        status:'idle',

    },
    reducers: {
        login: (state, action) => {
            state.push(action.payload);
        },
        logout: (state, action) => {
            return state.filter(item => item.id !== action.payload.id);
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(checkouthandler.pending,(state,action)=>{
            state.status='loading'
        })
        .addCase(checkouthandler.fulfilled,(state,action)=>{
            state.status='fulfilled'
            state.data=action.payload
        })
        .addCase(checkouthandler.rejected,(state,action)=>{
            state.status='failed'
            console.log(action.payload)
        })

    }

});
export default authSlice.reducer;

export const {login, logout} = authSlice.actions;

// export const auth=createAsyncThunk('localhost:5000/user/login',async({email,password})=>{
//     const response=await fetch('http://localhost:5000/user/login',{
//         method:'POST',
//         headers:{
//             'Content-Type':'application/json'
//         },
//         body:JSON.stringify({email,password})
//     })
//     const data=await response.json()
//     if(response.status===400){
//         toast.error(data.error)
//         return data
//     }
//     if(response.status===404){
//         toast.error(data.error)
//         return
//     }
//     if(response.status===401){
//         toast.error(data.error)
//         return
//     }
//     if(response.status===200){
//         toast.success(data.message)
//         return
//     }
//     return data
// }
// )

export const checkouthandler =createAsyncThunk('localhost:5000/razorpay',async({amount,formData})=>{
    let user=localStorage.getItem('user')?JSON.parse(localStorage.getItem('user')):null

    
    
    formData={...formData,email:user.email,amount:amount}
    
    formData=JSON.stringify(formData)
    

    const {data:{key}}=await axios.get("http://localhost:5000/api/getkey")
    const {data:{order}}=await axios.post("http://localhost:5000/razorpay/checkout",{amount})
    console.log(window);
    const options ={
      key,
      amount:order.amount,
      currency:"INR",
      name:"PIZZAMONSTER",
      description:"PIZZAMONSTER",
      image:"https://img.freepik.com/premium-vector/pizza-monster-illustration_166742-84.jpg",
      order_id:order.id,
     
      callback_url:"http://localhost:5000/razorpay/paymentverification?q="+formData,
      prefill:{
        name:"Sugam Pokhrel",
        email:"sugamf7@gmail.com",
        contact:"7878785498"
      },
      notes:{
        "address":"razorapy official"
      },
      theme:{
        "color":"#3379cc"
      }
    };
    const razor = new window.Razorpay(options);
    razor.open();

  }
)