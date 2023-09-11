import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const labelStyles = { mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" };
const AddBlog = () => {
  const useStyles = makeStyles({
    font: {
      fontFamily: "Roboto !important",
    },
  });
  const classes = useStyles();
  const {token}=useSelector((state)=>state.auth)
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    desc: "",
    image: "",
    liked: 0,
  });
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const sendRequest = async () => {
    const res = await axios
      .post(
        "https://blogappmern.onrender.com/api/blog/add",
        {
          title: inputs.title,
          desc: inputs.desc,
          image: inputs.image,
          liked: 0,
          author: localStorage.getItem("userId"),
        },
        {
          headers: {Authorization: `Bearer ${token}`},
        }
      )
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(inputs);
    sendRequest()
      .then((data) => console.log())
      .then(() => navigate("/blog"));
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
            fontWeight={"bold"}
            padding={3}
            color="grey"
            variant="h2"
            textAlign={"center"}
          >
            Post Your Blog
          </Typography>
          <InputLabel className={classes.font} sx={labelStyles}>
            Title
          </InputLabel>
          <TextField
            InputProps={{ disableUnderline: true }}
            className={classes.font}
            name="title"
            onChange={handleChange}
            value={inputs.title}
            margin="auto"
            variant="outlined"
          />
          <InputLabel>Description</InputLabel>
          <TextField
            InputProps={{ disableUnderline: true }}
            className={classes.font}
            name="desc"
            onChange={handleChange}
            value={inputs.description}
            margin="auto"
            variant="outlined"
          />
          <InputLabel
            // className={classes.font}
            sx={labelStyles}
          >
            ImageURL
          </InputLabel>
          <TextField
            InputProps={{ disableUnderline: true }}
            name="image"
            onChange={handleChange}
            value={inputs.image}
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
  );
};
export default AddBlog;
