const user = require("../model/user");
const bcrypt=require('bcryptjs')
const getUser= async(req,res,next)=>{
    let Users;
    try {
         Users=await user.find()
         
    } catch (error) {
        return console.log(error);
    }
    if(!Users)
    {
        return res.status(400).json({message:"user doesn't exist"});
    }
    return res.status(200).json({Users}) // this will send list of users 
}
const signup=async(req,res,next)=>{
    const {name,email,password}=req.body
    let exist;
    try
    {
        exist=await user.findOne({email})
    }
    catch(err)
    {
        console.log(err);
    }
    if(exist)
    {
        return res.status(200).json({message: "user already exist"})
    }
    const hash=bcrypt.hashSync(password)
    console.log(hash);
    const users=new user({
        name,
        email,
        password:hash,
        blogs:[]
    })
    try {
        await users.save()
    } catch (error) {
        console.log(error);
    }
    return res.status(200).send({users})
    
}
const login=async(req,res,next)=>{
    const {email,password}=req.body
    let exist;
    try
    {
        exist=await user.findOne({email})
    }
    catch(err)
    {
        console.log(err);
    }
    if(!exist)
    {
        return res.status(400).json({message: "user has not login"})
    }
    const passmatch=bcrypt.compareSync(req.body.password,exist.password)    
    if(!passmatch)
    {
        return res.status(400).json({message: "wrong password"})
    }
    return res.status(200).json({
        message: "successfully login",
        user:exist// info of user
    })
}
module.exports={
    getUser,signup,login
}