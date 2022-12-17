const user = require("../model/user");
const blog=require("../model/blog");
const mongoose=require('mongoose');
const {findByIdAndUpdate} = require("../model/user");
const getBlog=async(req,res,next)=>{
    let blogs;
    try {
        blogs=await blog.find().populate("user")
    }
    catch (error) {
       return console.log(error);
    }
    if(!blogs)
    {
        return res.status(200).json({message:"No Blogs Found"});
    }
    return res.status(200).json({blogs});
}
const addBlog=async(req,res,next)=>{
    const {title,desc,image,user}=req.body
    let exist;
    try
    {
        exist=await user.findById(user)
    }
    catch(err)
    {
        console.log(err);
    }
    if(!exist)
    {
        return res.status(400).json({message: "Unable to find the id of the user"})
    }
    const blogs=new blog({
        title,desc,image,user
    })
    try {
        await blogs.save()
    } catch (error) {
        console.log(error);
    }
    return res.status(200).send({blogs})
}
const updateBlog=async(req,res,next)=>{
    const {title,desc}=req.body
    const blogid=req.params.id
    let blogs
    try {
        blogs=await blog.findByIdAndUpdate(blogid,{
            title,desc
        })
    } catch (error) {
        return console.log(error);
    }
    if(!blogs)
    {
        return res.status(400).json({message:"unable to update the blog"})
    }
    return res.status(200).json({blogs})
}
const getbyId=async(req,res,next)=>{
    const id=req.params.id
    let blogs
    try {
        blogs=await blog.findById(id)
    } catch (error) {
        return console.log(error);
    }
    return res.status(400).json({blogs})
}
const getByUserId=async(req,res,next)=>{
    const userid=req.params.id;
    let userblogs;
    try {
        userblogs=await user.findById(userid).populate("blog");
    } catch (error) {
        return console.log(error);
    }
    if(!userblogs)
    {
        return res.status(400).json({message:"No Blog Found"});
    }
    return res.status(404).json({ message: "No Blog Found" });
}
module.exports={
    getBlog,addBlog,getbyId,getByUserId,updateBlog
}