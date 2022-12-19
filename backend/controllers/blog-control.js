const user = require("../model/user");
const blog=require("../model/blog");
const mongoose=require('mongoose');
const {findByIdAndUpdate} = require("../model/user");
const getBlog=async(req,res,next)=>{
    let blogs;
    try {
        blogs=await blog.find().populate()
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
    const {title,desc,image,author}=req.body
    let exist;
    try
    {
       exist=await user.findById(author)
    }
    catch(err)
    {
        console.log(err);
    }
    if(!exist)
    {
        return res.status(400).json({message: "Unable to find the id of the user"})
    }
    const blogss=new blog({
        title,desc,image,author
    })
    try {
        
        await blogss.save()
        console.log(exist.blogs);
        exist.blogs.push(blogss._id)
        await exist.save()
        // const session=mongoose.startSession();
        // (await session).startTransaction()
        // await blogss.save({session})
        // exist.blogs.push(blogss) // pushing blogs in user as well blogs tera user model me
        // await exist.save({session})
        // (await session).commitTransaction({session})
    } catch (error) {
        console.log(error);
    }
    return res.status(200).send({blogss})
}
const updateBlog=async(req,res,next)=>{
    const {title,desc}=req.body
    const blogid=req.params.id
    // console.log(req.body);
    // console.log(blogid);
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
        userblogs=await user.findById(userid).populate();
    } catch (error) {
        return console.log(error);
    }
    if(!userblogs)
    {
        return res.status(400).json({message:"No Blog Found"});
    }
    return res.status(404).json({ message: "No Blog Found" });
}
const deleteBlog=async(req,res,next)=>{
    const id=req.params.id;
    let blogs
    try {
        blogs=await blog.findByIdAndRemove(id).populate() // populate tera ref dega user user me bhi details dhundega
        await blog.user.blogs.pull(blog); // user me se id remove 
        await blog.user.save()
    } catch (error) {
        return console.log(error);   
    }
    if(!blogs)
    {
        return res.status(400).json({message:"Unable to delete"})
    }
    return res.status(200).json({message:"Succesfully deleted"})
}
module.exports={
    getBlog,addBlog,getbyId,getByUserId,updateBlog,deleteBlog
}