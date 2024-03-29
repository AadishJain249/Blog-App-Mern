import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Blog from "../components/Blog";
function UserBlog() {
  const [user, setUser] = useState();
  const id = localStorage.getItem("userId");
  const data=localStorage.getItem('persist:root')
  const res=JSON.parse(data)
  const tokens=res.token;
  var token = tokens.substring(1, tokens.length-1);

  // const { users, token, flag } = useSelector((state) => state.auth);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const sendRequest = async () => {
    const res = await axios
      .get(`http://blogappmern.onrender.com/api/blog/user/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  useEffect(() => {
    sendRequest().then((data) => setUser(data.userblogs));
  }, []);

  return (
    <div>
      {user &&
        user.blogs &&
        user.blogs.map((blog, index) => (
          <Blog
            id={blog._id}
            key={index}
            isUser={true}
            title={blog.title}
            desc={blog.desc}
            image={blog.image}
            author={user.name}
          />
        ))}
    </div>
  );
}
export default UserBlog;
