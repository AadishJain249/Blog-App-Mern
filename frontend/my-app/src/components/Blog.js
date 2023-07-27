import React, { useState } from 'react'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Avatar from '@mui/material/Avatar';
import {useSelector} from 'react-redux'
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import "../components/Blog.css"
import { red } from '@mui/material/colors';
import { Box } from '@mui/system';
import 'materialize-css/dist/css/materialize.min.css'
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
// import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import {
  FacebookShareButton,
  WhatsappShareButton,
  WhatsappIcon,
  FacebookIcon,
  TwitterIcon,
  TwitterShareButton
} from 'react-share';
import axios from "axios";

function Blog({title,desc,image,author,id,isUser,liked}) {
  const Navigate=useNavigate()
  const isLogged=useSelector((state)=>state.isLoggedIn)
  const current = new Date();
  const [count,setcount]=useState()
  const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
  const handleEdit=()=>{
    Navigate(`/myblogs/${id}`)
  }
  const navigate=useNavigate()
  const deleteRequest=async()=>{
    const res = await axios
    .delete(`http://localhost:3000/api/blog/delete/${id}`)
    .catch((err) => console.log(err));
    const data = await res.data;
    // console.log(data);  
    setcount(data)
    return data;
  }
  const increment=async()=>{
    const id1 = localStorage.getItem("userId");
    const res=await axios.put(`http://localhost:3000/api/blog/likes/${id1}/${id}`)
    .catch((err) => console.log(err));
    const data = await res.data;
    // console.log(data);  
    setcount(data.liked)
    return data;
  }
  const decrement=async()=>{
    const id1= localStorage.getItem("userId");
    const res=await axios.put(`http://localhost:3000/api/blog/unlikes/${id1}/${id}`)
    .catch((err) => console.log(err));
    const data = await res.data;
    // console.log(data);  
    setcount(data.liked)
    return data;
  }
  
  const handleDelete=()=>{
    deleteRequest()
    .then(() => navigate("/"))
    .then(() => navigate("/blog"));
  }
  return (
    <Card
          sx={{
          width: "40%",
          margin: "auto",
          marginTop:"30%", 
          mt: 2,
          padding: 5,
          boxShadow: "5px 5px 10px #ccc",
          ":hover": {
            boxShadow: "10px 10px 20px #ccc",
          },
        }}
      >
     {!isUser && (<Box display="flex">
            <IconButton onClick={handleEdit} sx={{ marginLeft: "auto" }}>
              <ModeEditOutlineIcon color="warning" />
            </IconButton>
            <IconButton onClick={handleDelete}>
              <DeleteOutlineIcon color="error" />
            </IconButton>
      </Box> )}
    <CardHeader
      avatar={
        <Avatar sx={
          { bgcolor: red[500],
           width:35, height: 35 }
          } aria-label="name">
          {author?author.charAt(0):""}
        </Avatar>
      }
      title={title}
      subheader={date}
    />
    <CardMedia
      component="img"
      height="194"
      image={image}
    />
    <CardContent>
      <Typography variant="body2" color="text.secondary">
        <b>{author}</b>{":"}{desc}
      </Typography>
    </CardContent>
    <div class="main">
    
    <div class="box1">
    <div class="a1">
    <FacebookShareButton
    url='https://www.facebook.com/'>
    <FacebookIcon size={40} round={true} />
    </FacebookShareButton>
    </div>
    <div class="a2">
    <WhatsappShareButton url='https://www.whatsapp.com/'>
    <WhatsappIcon size={40} round={true} />
    </WhatsappShareButton>
    </div>
    <div class="a3">
    <TwitterShareButton url='https://www.twitter.com/'>
    <TwitterIcon size={40} round={true}></TwitterIcon>
    </TwitterShareButton>   
    </div>
    </div>
    
    <div class="box2">

    {isLogged && <div class="b1">
    <button class="material-icons" onClick={increment}>thumb_up</button>
    </div>}

    {isLogged &&<div class="b2">
    <button class="material-icons" onClick={decrement}>thumb_down</button>   
    </div>}
    <div class="b3">
    <b>{count}</b>
    </div>
    
    </div>
    
    </div>

    </Card>

    )
}
export default Blog