const express=require('express')
const router1=new express.Router()
const {getBlog,addBlog,getbyId,getByUserId, updateBlog, deleteBlog,upvote,downvote}=require("../controllers/blog-control")
router1.get('/',getBlog);
router1.post('/add',addBlog)
router1.put('/update/:id',updateBlog)
router1.delete('/delete/:id/',deleteBlog)
router1.get("/:id",getbyId);
router1.get("/user/:id", getByUserId);
router1.put("/likes/:id1/:id",upvote)
router1.put("/unlikes/:id1/:id",downvote)
module.exports=router1;
