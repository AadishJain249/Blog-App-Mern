const express=require('express')
const router1=new express.Router()
const {getBlog,addBlog,getbyId,getByUserId, updateBlog, deleteBlog,upvote,downvote}=require("../controllers/blog-control")
const { verifyToken } =require('../middleware/middleware');
router1.get('/',verifyToken,getBlog);
router1.post('/add',verifyToken,addBlog)
router1.put('/update/:id',verifyToken,updateBlog)
router1.delete('/delete/:id/',verifyToken,deleteBlog)
router1.get("/:id",verifyToken,getbyId);
router1.get("/user/:id",verifyToken,getByUserId);
router1.put("/likes/:id1/:id",verifyToken,upvote)
router1.put("/unlikes/:id1/:id",verifyToken,downvote)
module.exports=router1;
