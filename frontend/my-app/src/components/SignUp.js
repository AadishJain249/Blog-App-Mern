import React from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import { useDispatch } from "react-redux";
import { register } from "../slice/authSlice";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
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
function SignUp() {
  const defaultTheme = createTheme();
  const history = useNavigate();
  const dispatch = useDispatch();
  const [inputs, setInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const sendRequest = async () => {
    const response = await axios
      .post("https://blogappmern.onrender.com/api/user/signup", {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
      })
      .catch((err) => {
        // eslint-disable-next-line no-cond-assign
        if ((err.status = 404)) {
          alert("email already used");
        }
      });
    const data = await response.data;
    dispatch(register(data));
    return data;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest()
      .then((data) => localStorage.setItem("userId", data.users._id))
      .then(() => history("/login"));
  };
  return (
    <>
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
              Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="User Name"
                name="name"
                autoComplete="name"
                onChange={handleChange}
                autoFocus
              />
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
                Sign In
              </Button>
              <Link to="/login">
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Already Login?
                </Button>
              </Link>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
    </>
  );
}
export default SignUp;
