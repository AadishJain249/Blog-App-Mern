import React from 'react'
import { Box, Button, TextField, Typography } from "@mui/material";
import  { useState } from "react";
import axios from "axios";
import {useDispatch} from 'react-redux'
import { authActions } from '../store/index';
import { useNavigate } from "react-router-dom";
function Login() {
  const history=useNavigate()
  const dispatch=useDispatch()
  const [inputs,setInput]=useState({
    email: "",
    password: ""
  })
const handleChange = (e) => {
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    // console.log(e.target.name,"aadish",e.target.value);
  };
  const sendRequest=async()=>{
    const response=await axios.post('http://localhost:3000/api/user/login',{
      email:inputs.email,
      password:inputs.password,
    }).catch((err) => {
      // eslint-disable-next-line no-cond-assign
      if(err.status=404){
         alert("User has not logged in");
      }})
    // console.log(response);
    const data=await response.data
    return data
  }
  const formHandler=(e)=>{
    e.preventDefault()
    // console.log(inputs);
    sendRequest()
    .then((data)=>localStorage.setItem("userId",data.user._id))
    .then(() => dispatch(authActions.login()))
    .then(()=>history('/blog'))
  }
  return (
    <form onSubmit={formHandler}>
        <Box 
            marginLeft="auto"
            marginRight="auto"
            width={300}
            height={700}
            display="flex"
            flexDirection={"column"}
            justifyContent="center"
            alignItems="center"
        >
        <Typography 
            variant="h4"
            color="Black"
            fontFamily="cursive"
        >Login</Typography>
        <TextField
              name="email"
              onChange={handleChange}
              value={inputs.email}
              type={"email"}
              variant="outlined"
              placeholder="Email"
              margin="normal"
        ></TextField>
        <TextField
              name="password"
              onChange={handleChange}
              value={inputs.password}
              type="password"
              variant="outlined"
              placeholder="Password"
              margin="normal"
        ></TextField>
         <Button variant="contained" type="submit">
            Login
          </Button>
          </Box>
    </form>
    )
}
export default Login