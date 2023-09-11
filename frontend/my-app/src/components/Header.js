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
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useState, useEffect } from "react";
import { logout } from "../slice/authSlice";
import { InputBase, Select, MenuItem, FormControl } from "@mui/material";

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
const data = localStorage.getItem("persist:root");
const res = JSON.parse(data);

function Header() {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  // const { users, token, flag } = useSelector((state) => state.auth);
  const data = localStorage.getItem("persist:root");
  const res = JSON.parse(data);
  // console.log(res);
  const flag = res.flag;
  // console.log(flag);
  const token = res.token;
  // console.log(token);
  const [user, setUser] = useState();
  const id = localStorage.getItem("userId");
  // const {token}=useSelector((state)=>state.auth)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const sendRequest = async () => {
    const res = await axios
      .get(`http://localhost:3000/api/user/getUserId/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  // useEffect(() => {
    sendRequest().then((data) => {
      setUser(data.Users.name);
      // console.log(data.Users.name);
    });
  // }, []);

  const handleLogout = () => {
    dispatch(logout());
    Navigate("/");
  };
  // console.log(flag);
  return (
    <>
      <AppBar
        sx={{
          background:
            "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 54%, rgba(0,212,255,1) 100%)",
        }}
      >
        <Toolbar>
          <Typography variant="h6">Blog App</Typography>
          &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;
          <Box display="flex" margin="auto">
            {/* tabs is kind of button feature which help in navigating and tab is child of tabs */}
            <Tabs
            textColor="white"
              TabIndicatorProps={{ style: { fontWeight: 900 } }}
              value={0}
            >
              <Tab TabIndicatorProps={{ style: { fontWeight: 900 } }}
              value={1}LinkComponent={Link} to="/myblogs" label="My-Blogs"></Tab>

              <Tab TabIndicatorProps={{ style: { fontWeight: 900 } }}
              value={2}LinkComponent={Link} to="/blog/add" label="Add-Blog"></Tab>

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

              <FormControl variant="standard" value={user ? user : ""}>
                <Select
                  value={user ? user : ""}
                  sx={{
                    width: "150px",
                    borderRadius: "0.25rem",
                    p: "0.25rem 1rem",
                    "& .MuiSvgIcon-root": {
                      pr: "0.25rem",
                      width: "3rem",
                    },
                    "& .MuiSelect-select:focus": {},
                  }}
                  input={<InputBase />}
                >
                  <MenuItem value={user ? user : ""}>
                    <Typography>{user ? user : ""}</Typography>
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>Log Out</MenuItem>
                </Select>
              </FormControl>
            </ThemeProvider>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}
export default Header;
