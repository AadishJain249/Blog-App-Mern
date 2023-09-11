const user = require("../model/user");
const blog=require("../model/blog");
const getBlog=async(req,res)=>{
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
const addBlog=async(req,res)=>{
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
    return res.status(200).send({})
}
const updateBlog=async(req,res)=>{
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
const getbyId=async(req,res)=>{
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
const getByUserId=async(req,res)=>{
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
const deleteBlog=async(req,res)=>
{
    console.log("sdffsd");
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
        await user.findByIdAndUpdate(id1, { $pull: { blogs:id} },{new:true})
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
const like=async(req,res)=>
{
    const userid=req.params.id1// user id in blog to check it is present in like or unlike
    const users=await user.findById(userid)
    const blogid=req.params.id; // blog id 
    let blogs=await blog.findById(blogid) //finding particular blog
    const flag=users.likedBy.includes(blogid)
    if(flag)
    {
        return res.status(200).send("You Already Liked The Blog")   
    }
    users.likedBy.push(blogid);
    console.log(users);
    blogs.likes++;
    console.log(blogs);
    try {
        await blogs.save();
        await users.save();
        res.status(201).send(blogs);
    } catch(e) {
        res.status(400).send(e);
    }
}
module.exports={
    getBlog,addBlog,getbyId,getByUserId,updateBlog,deleteBlog,like,
}