import React from 'react'
import {Tabs,Typography,Box,AppBar, Toolbar, Button,createTheme,ThemeProvider, Tab} from '@mui/material'
import {Link} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
// import axios from 'axios'
import {authActions} from '../store/index'
const theme = createTheme({
    palette: {
      primary: {
        main:'#ffffff',
      },
      secondary: {
        main: '#ffffff',
      },
    },
  });
function Header() {
  // const [value,setvalue]=useState()
  const dispatch=useDispatch()
  const isLogged=useSelector((state)=>state.isLoggedIn)
  const sendReq=async()=>{
  // const res=await axios.post('http://localhost:3000/api/user/logout',null,{
  //   withCredentials:true
  // })
  // if(res.status===200)
  // {
  //   return res
  // }
  // return new Error("Unable TO Logout. Please try again")
}
  
  const handleLog=()=>{
    sendReq().then(()=>dispatch(authActions.logout()))
  }
  return (
  <AppBar sx={{
        background:
        "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 54%, rgba(0,212,255,1) 100%)"
      }}>
        
        <Toolbar>
        <Typography variant='h3'>Blogs App</Typography>
        <Box display="flex" margin="auto">
          {/* tabs is kind of button feature which help in navigating and tab is child of tabs */}
          <Tabs 
          // textColor='white'
          textColor='white'
          TabIndicatorProps={{style: {fontWeight:900 }}}
          value={0} 
          // onChange={(e,val)=>setvalue(val)}
          > 
            <Tab LinkComponent={Link} to="/blog" label="All Blogs"></Tab>
            <Tab LinkComponent={Link} to="/myblogs" label ="My Blogs"></Tab>
          </Tabs>
        </Box>
        <Box display="flex" marginLeft="auto">
        
        <ThemeProvider theme={theme}>
        <Button
        varient="contained"
        LinkComponent={Link}
        to="/signup"
        sx={{ margin: 1, borderRadius: 10 ,fontWeight:900}}
        color="primary"
        >SignUp</Button>

        {isLogged &&<Button 
        onClick={handleLog}
        LinkComponent={Link}
        to="/"
        varient="contained"
        sx={{ margin: 1, borderRadius: 10 ,fontWeight:900}}
        color="primary"
        >LogOut</Button>}

        <Button 
        LinkComponent={Link}
        to="/login"
        varient="contained"
        sx={{ margin: 1, borderRadius: 10,fontWeight:900 }}
        color="secondary">Login</Button>
        </ThemeProvider>
        </Box>
        </Toolbar>
    </AppBar>
  )
}
export default Header