import React, { createContext} from 'react'
import Product from '../components/Product'
const getDefaultCart = ()=>{
  let cart = {};
  for (let i = 0; i < Product.length; i++) {
    cart[i] = 0;
  }
  return cart;
};
export const shopContext  = createContext(null);

export const shopContextProvider = (props) =>{
  const [cartItems, setCartItems] =  React.useState(getDefaultCart());
  const addToCart = (item) =>{
    setCartItems((prev) =>({...prev, [itemId]: prev[itemId] + 1}))
  }
  const removeFromCart = (item) =>{
    setCartItems((prev) =>({...prev, [itemId]: prev[itemId] - 1}))
  }
  const contextValue ={
    cardItems,
    addToCart,
    removeFromCart,
  }
  return <shopContext.Provider value={contextValue}>{props.Children}</shopContext.Provider>
};