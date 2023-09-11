import React from "react";
import {
  Tabs,
  Typography,
  Box,
  AppBar,
  Toolbar,
  Button,
  createTheme,
  ThemeProvider,
  Tab,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useState, useEffect } from "react";
import { logout } from "../slice/authSlice";
// import { authActions } from "../store/index";
const theme = createTheme({
  palette: {
    primary: {
      main: "#ffffff",
    },
    secondary: {
      main: "#ffffff",
    },
  },
});
function Header() {
  const dispatch = useDispatch();
  const { users, token, flag } = useSelector((state) => state.auth);
  const [user, setUser] = useState();
  const id = localStorage.getItem("userId");
  // const {token}=useSelector((state)=>state.auth)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const sendRequest = async () => {
    const res = await axios
      .get(`http://localhost:3000/api/user/getUserId/${id}`,
      {
        headers: {Authorization: `Bearer ${token}`},
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  useEffect(() => {
    sendRequest().then((data) => {
      setUser(data.Users.name);
      // console.log(data.Users.name);
    });
  }, []);

  const handleLog = () => {
    dispatch(logout());
  };
  return (
    <AppBar
      sx={{
        background:
          "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 54%, rgba(0,212,255,1) 100%)",
      }}
    >
      <Toolbar>
        <Typography variant="h6">Blog App</Typography>
        &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;
        <Typography>{user}</Typography>
        <Box display="flex" margin="auto">
          {/* tabs is kind of button feature which help in navigating and tab is child of tabs */}
          <Tabs
            textColor="white"
            TabIndicatorProps={{ style: { fontWeight: 900 } }}
          >
            <Tab LinkComponent={Link} to="/myblogs" label="My-Blogs"></Tab>
            <Tab LinkComponent={Link} to="/blog/add" label="Add-Blog"></Tab>
            <Tab LinkComponent={Link} to="/blog" label="All-Blogs"></Tab>
          </Tabs>
        </Box>
        <Box display="flex" marginLeft="auto">
          <ThemeProvider theme={theme}>
            {!flag && (
              <Button
                varient="contained"
                LinkComponent={Link}
                to="/"
                sx={{ margin: 1, borderRadius: 10, fontWeight: 900 }}
                color="primary"
              >
                SignUp
              </Button>
            )}

            {!flag && (
              <Button
                LinkComponent={Link}
                to="/login"
                varient="contained"
                sx={{ margin: 1, borderRadius: 10, fontWeight: 900 }}
                color="secondary"
              >
                Login
              </Button>
            )}

            {flag && (
              <Button
                onClick={handleLog}
                LinkComponent={Link}
                to="/"
                varient="contained"
                sx={{ margin: 1, borderRadius: 10, fontWeight: 900 }}
                color="primary"
              >
                LogOut
              </Button>
            )}
          </ThemeProvider>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
export default Header;
