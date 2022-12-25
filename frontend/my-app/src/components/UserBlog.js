import React from 'react'
import {useEffect,useState} from 'react'
import axios from 'axios'
import Blog from '../components/Blog'
function UserBlog() {
  const [users, setUser] = useState();
  // const id = localStorage.getItem("userId");
  // console.log(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const sendRequest=async()=>{
    const res=await axios.get(`http://localhost:3000/api/blog/63a84d5120b28f430c473036`).catch((err)=>console.log(err))
    // console.log(res);
    const data=await res.data
    // console.log(data.blogs);
    return data
  }
  // 
  useEffect(()=>{
    sendRequest().then((data)=>
    setUser(data.blogs)
    )
  },[])
  console.log(users);
  return (
    <div>
      {users &&
        users.blogs &&
        users.blogs.map((blog, index) => (
          <Blog
            id={blog._id}
            key={index}
            // isUser={true}
            title={blog.title}
            desc={blog.desc}
            image={blog.image}
            author={blog.author}
          />
        ))}
    </div>
  )
}

export default UserBlog