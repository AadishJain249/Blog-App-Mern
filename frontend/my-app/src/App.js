import React,{useEffect} from "react";
import Header from "./components/Header";
import {Routes,Route} from "react-router-dom"
import Login from "./components/Login";
import Blogs from "./components/Blogs";
import AddBlog from "./components/AddBlog"
import UserBlog from "./components/UserBlog";
import BlogDetail from "./components/BlogDetail";
import SignUp from "./components/SignUp";
import {useSelector,useDispatch} from 'react-redux'
function App() {
  const { users, token, flag } = useSelector((state) => state.auth);
  console.log(flag);
  return (
    <React.Fragment>
    <header>
      {flag &&<Header />}
    </header>
    <main>
      <Routes>
          <>
            <Route path="/" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            {flag &&<Route path="/blog" element={<Blogs />} />}
            {flag &&<Route path="/blog/add" element={<AddBlog />} />}
            {flag &&<Route path="/myblogs" element={<UserBlog/>} />}
            {flag &&<Route path="/myblogs/:id" element={<BlogDetail />} />}
          </>
      </Routes>
    </main>
  </React.Fragment>
  )

}
export default App;
