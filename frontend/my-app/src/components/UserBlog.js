import React from 'react'
import {useEffect,useState} from 'react'
import axios from 'axios'
import Blog from '../components/Blog'
// import user from '../../../../backend/model/user';
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
  useEffect(()=>{
    sendRequest().then((data)=>
    setUser(data.userblogs)
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
            author={users.name}
          />
        ))}
    </div>
  )
}

export default UserBlog