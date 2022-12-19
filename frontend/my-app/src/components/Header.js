import React,{useState} from 'react'
import {Tabs,Typography,Box,AppBar, Toolbar, Button,createTheme,ThemeProvider, Tab} from '@mui/material'
import {Link} from 'react-router-dom'
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
  const [value,setvalue]=useState()
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
          textColor='white'
          TabIndicatorProps={{style: {fontWeight:900 }}}
          value={value} onChange={(e,val)=>setvalue(val)}> 
            <Tab LinkComponent={Link} to="/blogs/add" label="All Blogs"></Tab>
            <Tab LinkComponent={Link} to="/myBlog" label ="My Blogs"></Tab>
          </Tabs>
        </Box>
        <Box display="flex" marginLeft="auto">
        <ThemeProvider theme={theme}>
        <Button
        varient="contained"
        LinkComponent={Link}
        to="/auth"
        sx={{ margin: 1, borderRadius: 10 ,fontWeight:900}}
        color="primary"
        >SignUp</Button>
        <Button
        LinkComponent={Link}
        to="/auth"
        varient="contained"
        sx={{ margin: 1, borderRadius: 10 ,fontWeight:900}}
        color="primary"
        >LogOut</Button>
        <Button 
        LinkComponent={Link}
        to="/auth"
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