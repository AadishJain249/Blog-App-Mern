import React from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions, login } from "../slice/authSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CssBaseline from "@mui/material/CssBaseline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Blog-App
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
function Login() {
  const defaultTheme = createTheme();

  const history = useNavigate();
  const dispatch = useDispatch();
  const { users, token, flag } = useSelector((state) => state.auth);
  // console.log(flag);
  // console.log(users);
  // console.log(token);
  const [inputs, setInput] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    // console.log(e.target.name,"aadish",e.target.value);
  };
  const sendRequest = async () => {
    const response = await axios
      .post("https://blogappmern.onrender.com/api/user/login", {
        email: inputs.email,
        password: inputs.password,
      })
      .catch((err) => {
        // eslint-disable-next-line no-cond-assign
        if ((err.status = 404)) {
          alert("User has not logged in");
        }
      });
    // console.log(response);
    const data = await response.data;
    dispatch(login(data));
    return data;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(inputs);
    sendRequest()
      .then((data) => localStorage.setItem("userId", data.user._id))
      .then(() => history("/blog"));
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 5,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#FFC300" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              onChange={handleChange}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              onChange={handleChange}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
export default Login;
