const user = require("../model/user");
const blog=require("../model/blog");
const mongoose=require('mongoose');
const {findByIdAndUpdate} = require("../model/user");
const getBlog=async(req,res,next)=>{
    let blogs;
    try {
        blogs=await blog.find().populate('author')
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
    const {title,desc,image,liked,author}=req.body
    let exist;
    try
    {
       exist=await user.findById(author)
    }
    catch(err)
    {
        return console.log(err);
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
        // console.log(exist.blogs);
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
        blogs=await blog.findById(id).populate('author')
    } catch (error) {
        return console.log(error);
    }
    // console.log(blogs);
    return res.status(200).json({blogs})
}
const getByUserId=async(req,res,next)=>{
    const userid=req.params.id;
    let userblogs;
    try {
        userblogs=await user.findById(userid).populate('blogs')
    } catch (error) {
        return console.log(error);
    }
    if(!userblogs)
    {
        return res.status(400).json({message:"No Blog Found"});
    }
    // console.log(userblogs);
    return res.status(200).json({userblogs});
}
const deleteBlog=async(req,res,next)=>
{
    var id=req.params.id; //blog id
    let b
    try 
    {
        b=await blog.findById(id)
        if(!b)
        {
            return res.status(400).json({message:"Unable to delete"})
        }
        var id1=b.author
        await user.update({ _id: id1 }, { $pull: { blogs:id } })
        await user.update({ _id: id1 }, { $pull: { likedblog:id } })
        await user.update({ _id: id1 }, { $pull: { unlikedblog:id } })
        b.delete()
        res.status(200).json({
            success: true,
          });
    }
    catch(error)
    {
        console.log(error);
    }
}
const upvote=async(req,res,next)=>
{
    const userid=req.params.id1// user id in blog to check it is present in like or unlike
    const blogid=req.params.id; //blog id 
    console.log(userid+" "+blogid);
    let blogs=await blog.findById(blogid) // finding particular blog
    const flag=blogs.likedby.includes(userid)
    if(!flag)
    {
        blogs.likedby.push(userid) 
        // await blogs.update({ _id: blogid },{ $pull: { unlikedby:userid } })   
        blogs.liked+=1;
    }
    await blogs.save()
    res.status(200).send(blogs)
}
const downvote=async(req,res,next)=>
{
    
    const userid=req.params.id1// user id in blog to check it is present in like or unlike
    const blogid=req.params.id; //blog id 
    let blogs=await blog.findById(blogid) // finding particular blog
    const flag=blogs.unlikedby.includes(userid)
    if(!flag)
    {
        blogs.unlikedby.push(userid) 
        // await blogs.update({ _id: blogid },{ $pull: { unlikedby:userid } })   
        blogs.liked-=1;
    }
    await blogs.save()
    res.status(200).send(blogs)
}
module.exports={
    getBlog,addBlog,getbyId,getByUserId,updateBlog,deleteBlog,upvote,downvote
}