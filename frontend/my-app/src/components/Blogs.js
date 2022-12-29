/* eslint-disable array-callback-return */
import React,{useEffect,useState} from 'react'
import axios from 'axios'
import Blog from '../components/Blog'
function Blogs() {
  const [blogs,setBlogs]=useState()
  const sendRequest=async()=>{
    const res=await axios.get('http://localhost:3000/api/blog/').catch((err)=>console.log(err))
    const data=await res.data
    return data
  }
  // console.log(blogs);
  useEffect(()=>{
    sendRequest().then((data)=>setBlogs(data.blogs))
  },[])
  return (
    <div>
      {blogs &&blogs.map((blog,err)=>(
        <Blog
        id={blog._id}
        isUser={localStorage.getItem('userId')===blog.author._id}
        title={blog.title}
        desc={blog.desc}
        image={blog.image}
        author={blog.author.name}
        ></Blog>
      ))}
    </div>
  )
}
export default Blogs