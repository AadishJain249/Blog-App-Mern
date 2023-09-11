/* eslint-disable array-callback-return */
import React,{useEffect,useState} from 'react'
import axios from 'axios'
import Blog from '../components/Blog'
import { useSelector } from 'react-redux'
function Blogs() 
{
  const {token}=useSelector((state)=>state.auth)
  const [blogs,setBlogs]=useState()
  const sendRequest=async()=>
  {
    const res=await axios.get('http://blogappmern.onrender.com/api/blog/',
    {
      headers: {Authorization: `Bearer ${token}`},
    }).catch((err)=>console.log(err))
    const data=await res.data
    return data
  }
  useEffect(()=>{
    sendRequest().then((data)=>setBlogs(data.blogs))
  },[])
  return (
    <div>
      {blogs &&blogs.map((blog,err)=>(
        <Blog
        id={blog._id}
        isUser={localStorage.getItem('userId')=== blog.author._id}
        title={blog.title}
        desc={blog.desc}
        image={blog.image}
        author={blog.author.name}
        liked={blog.liked}
        ></Blog>
      ))}
    </div>
  )
}
export default Blogs