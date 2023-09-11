import React, { useEffect } from 'react'
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useSelector } from 'react-redux';
import {useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
function BlogDetail() {
  const labelStyles = { mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" };
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
  });
  const {token}=useSelector((state)=>state.auth)
  const [blog,setBlogs]=useState()
  const id=useParams().id
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const fetchDetails=async()=>{
    const res = await axios
    .get(`https://blogappmern.onrender.com/api/blog/${id}`,
    {
      headers: {Authorization: `Bearer ${token}`},
    })
    .catch((err) => console.log(err));
    const data = await res.data;
    // console.log(data);
    return data;
  }
  
  useEffect(()=>{
    fetchDetails().then((data)=>{
      setBlogs(data)
      // console.log(setBlogs);
      console.log(data);
      setInputs({
        title:data.blogs.title,
        desc:data.blogs.desc
      })
    })
  },[])
  const sendRequest = async () => {
    const res = await axios
      .put(`http://blogappmern.onrender.com/api/blog/update/${id}`, {
        title: inputs.title,
        desc: inputs.desc,
      },
      {
        headers: {Authorization: `Bearer ${token}`},
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(inputs);
    sendRequest()
      .then((data) => console.log())
      .then(() => navigate("/myblogs"));
  };
  
  return (
  
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          border={3}
          borderColor="linear-gradient(90deg, rgba(58,75,180,1) 2%, rgba(116,49,110,1) 36%, rgba(2,0,161,1) 73%, rgba(69,92,252,1) 100%)"
          borderRadius={10}
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          margin={"auto"}
          marginTop={14}
          display="flex"
          flexDirection={"column"}
          width={"50%"}
        >
          <Typography
            // className={classes.font}
            fontWeight={"bold"}
            padding={3}
            color="grey"
            variant="h2"
            textAlign={"center"}
          >
            Post Your Blog
          </Typography>
          <InputLabel 
          // className={classes.font}
           sx={labelStyles}>
            Title
          </InputLabel>
          <TextField
            // className={classes.font}
            name="title"
            onChange={handleChange}
            value={inputs.title}
            margin="auto"
            variant="outlined"
          />
          <InputLabel 
          // className={classes.font}
           sx={labelStyles}>
            Description
          </InputLabel>
          <TextField
            // className={classes.font}
            name="desc"
            onChange={handleChange}
            value={inputs.description}
            margin="auto"
            variant="outlined"
          />
          <Button
            sx={{ mt: 2, borderRadius: 4 }}
            variant="contained"
            color="warning"
            type="submit"
          >
            Submit
          </Button>
        </Box>
      </form>
    </div>
  )
}

export default BlogDetail