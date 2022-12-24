import React from "react";
import Header from "./components/Header";
import {Routes,Route} from "react-router-dom"
import Login from "./components/Login";
import Blogs from "./components/Blogs";
import AddBlog from "./components/AddBlog"
import UserBlog from "./components/UserBlog";
import BlogDetail from "./components/BlogDetail";
import SignUp from "./components/SignUp";
function App() {
  return (
    <React.Fragment>
      <header>
      <Header></Header>
      </header>
      <main>
        <Routes>
          {/* <Route path="/" element={<Header></Header>}></Route> */}
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/signup" element={<SignUp></SignUp>}></Route>
          <Route path="/blogs" element={<Blogs></Blogs>}></Route>
          <Route path="/myblogs" element={<UserBlog></UserBlog>}></Route>
          <Route path="/myblogs/:id" element={<BlogDetail></BlogDetail>}></Route>
          <Route path="/blog/add" element={<AddBlog></AddBlog>}></Route>
        </Routes>
      </main>
    </React.Fragment>
    
  )
}
export default App;
