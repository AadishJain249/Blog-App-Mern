// import {configureStore,createSlice} from '@reduxjs/toolkit'
// // auth slice takes only 1 object means we can create only 1 object with following paramters
// const authSlice=createSlice({
//     name:"auth", // jispe hame apna action lagana hai
//     initialState:{isLoggedIn:false} // it is the inital state value jo ki
//     // undefined  hoti hai shuru me and ye local storage se value uthati hai
//     ,
//     reducers:{
//         login(state){
//             state.isLoggedIn=true
//         },
//         logout(state)
//         {
//             state.isLoggedIn=false
//         }
//     }
// })
// export const authActions=authSlice.authActions
// export const store=configureStore({
//     reducer:authSlice.reducer
// })
import { configureStore, createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { isLoggedIn: false },
  reducers: {
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      state.isLoggedIn = false;
    },
  },
});

export const authActions = authSlice.actions;

export const store = configureStore({
  reducer: authSlice.reducer,
});