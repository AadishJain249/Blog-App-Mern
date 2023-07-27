const user = require("../model/user");
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const secret="Aad"
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
        return res.status(400).json({message: "user already exist"})
    }
    const hash=bcrypt.hashSync(password)
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
    const token=jwt.sign({id:exist._id},secret,{
        expiresIn:"29days"
    })
    res.cookie(String(exist._id),token,{
        path:'/',
        expires:new Date(Date.now()+1000*86400),
        httpOnly:true,
        sameSite:'lax'
    })
    // console.log("Generated Token\n", token);
    return res.status(200).json({
        message: "successfully login",
        user:exist// info of user
        ,token
    })
}
const verify=async(req,res,next)=>{
    // const header=req.headers[`authorization`]
    // const slice=header.split(" ")[1]
  const cookies = req.headers.cookie;
  const slice = cookies.split("=")[1];
//   console.log(slice);
    if(!slice)
    {
        return res.send({message:"no token"})
    }
    
    jwt.verify(String(slice),secret,(err,_user)=>{
        if(err)
        {
            return res.send({message:"inavlid token"})
        }
        // console.log(_user.id);
        // req.id=_user.id
    })
    // next()
}
const loginUser = async (req, res, next) => {
    const cookies = req.headers.cookie;
    const slice = cookies.split("=")[0];
    const userId=slice;
    console.log(userId);
    let users;
    try {
      users = await user.findById(userId, "-password");
    } catch (err) {
      return new Error(err);
    }
    if (!users) {
      return res.status(404).json({ messsage: "User Not FOund" });
    }
    return res.status(200).json({ users });
  };
  const logout=async(req,res,next)=>{
      const cookies = req.headers.cookie;
      const slice = cookies.split("=")[1];
      if(!slice)
      {
          return res.send({message:"no token"})
      }
      jwt.verify(String(slice),secret,(err,_user)=>
      {
          if(err)
          {
              return res.send({message:"inavlid token"})
          }
          console.log(`${_user.id}`);
          console.log(cookies);
          console.log(slice);
          res.clearCookie(`${_user.id}`)
          req.cookies[`${_user.id}`] = ""; // header se clear karna
          return res.status(200).json({ message: "Successfully Logged Out" });
      })
      next()
  }
module.exports={
    getUser,signup,login,verify,loginUser,logout
}