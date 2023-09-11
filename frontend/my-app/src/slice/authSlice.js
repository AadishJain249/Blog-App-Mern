import {createSlice } from "@reduxjs/toolkit";
const authSlice = createSlice({
  name: "auth",
  initialState: { 
    users:null,
    token:null,
    flag: false 
  },
  reducers: {
    register:(state,action)=>{
      state.users=action.payload.users
      state.token=action.payload.token
      
    },
    login:(state,action)=> {
      state.users=action.payload.users
      state.token=action.payload.token
      state.flag = true;
    },
    logout:(state)=> {
      state.users=null
      state.flag = false;
    },
  },
});
export const {register,login,logout} = authSlice.actions;
export default authSlice.reducer
