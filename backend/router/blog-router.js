const express=require('express')
const router1=new express.Router()
const {getBlog,addBlog,getbyId,getByUserId, updateBlog, deleteBlog}=require("../controllers/blog-control")
router1.get('/',getBlog);
router1.post('/add',addBlog);
router1.put('/update/:id',updateBlog)
router1.delete('/delete/:id/',deleteBlog)
router1.get("/:id",getbyId);
router1.get("/user/:id", getByUserId);
module.exports=router1;
