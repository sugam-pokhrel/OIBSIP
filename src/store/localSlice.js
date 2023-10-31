import { createSlice } from "@reduxjs/toolkit";
import { useEffect } from "react";
let user=localStorage.getItem('user')?JSON.parse(localStorage.getItem('user')):null

    
const initialState = user;



const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state, action) => {
            
            localStorage.removeItem('user')
            state=null;
            
        },
        setUser:(state,action)=>{
            state=action.payload
        }
       
    }
});

export const {logout,setUser} = userSlice.actions;
export default userSlice.reducer;

