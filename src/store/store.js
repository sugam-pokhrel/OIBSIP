import { configureStore } from "@reduxjs/toolkit";
import  cartReducer  from "./CartSlice";
import  userReducer  from "./localSlice";
import paymentReducer from "./authSlice";
const store=configureStore({
    reducer: {
        cart: cartReducer,
        user: userReducer,
        payment: paymentReducer
        // products: productsReducer
    }


});

export default store;