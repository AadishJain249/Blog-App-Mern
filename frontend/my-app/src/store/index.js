import {configureStore,createSlice} from '@reduxjs/toolkit'
// auth slice takes only 1 object means we can create only 1 object with following paramters
const authSlice=createSlice({
    name:"auth", // jispe hame apna action lagana hai
    initialState:{isLoggedIn:false} // it is the inital state value jo ki
    // undefined  hoti hai shuru me and ye local storage se value uthati hai
    ,
    reducers:{
        login(state){
            state.isLoggedIn=true
        },
        logout(state)
        {
            state.isLoggedIn=false
        }
    }
})