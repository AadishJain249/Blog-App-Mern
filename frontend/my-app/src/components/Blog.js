import React from 'react'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Avatar from '@mui/material/Avatar';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import { Box } from '@mui/system';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useNavigate } from "react-router-dom";
// import {axios} from 'axios'
import axios from "axios";

function Blog({title,desc,image,author,id,isUser}) {
  const Navigate=useNavigate()
  const current = new Date();
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
    return data;
  }
  const handleDelete=()=>{
    deleteRequest()
    .then(() => navigate("/"))
    .then(() => navigate("/blogs"));
  }
  console.log({image});
  return (
    <Card
          sx={{
          width: "40%",
          margin: "auto",
          // height:"10",
          // padding:"30",
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
      // alt="Paella dish"
    />
    <CardContent>
      <Typography variant="body2" color="text.secondary">
        <b>{author}</b>{":"}{desc}
      </Typography>
    </CardContent>
    <CardActions disableSpacing>
      <IconButton aria-label="add to favorites">
        <FavoriteIcon />
      </IconButton>
      <IconButton aria-label="share">
        <ShareIcon/>
      </IconButton>
    </CardActions>
    </Card>
    )
}
export default Blog