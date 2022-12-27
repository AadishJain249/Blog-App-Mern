import React from 'react'
import {useEffect,useState} from 'react'
import axios from 'axios'
import Blog from '../components/Blog'
function UserBlog() {
  const [users, setUser] = useState();
  const id = localStorage.getItem("userId");
  // console.log(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const sendRequest=async()=>{
    const res=await axios.get(`http://localhost:3000/api/blog/user/${id}`).catch((err)=>console.log(err))
    // console.log(res);
    const data=await res.data
    // console.log(data.blogs);
    return data
  }
  // 
  useEffect(()=>{
    sendRequest().then((data)=>
    setUser(data.userblogs.blogs)
    )
  },[sendRequest])
  // console.log(users);
  return (
    <div>
      {users &&
        users &&
        users.map((blog, index) => (
          <Blog
            id={blog._id}
            key={index}
            // isUser={true}
            title={blog.title}
            desc={blog.desc}
            image={blog.image}
            author={blog.name}
          />
        ))}
    </div>
  )
}

export default UserBlog