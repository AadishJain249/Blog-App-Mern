const express=require('express')
// const cors=require('cors')
const app=express()
const cookie=require('cookie-parser')
app.use(cookie())
// app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
const cors = require('cors');
// const corsOptions ={
//     origin:'http://localhost:3000', 
//     credentials:true,            //access-control-allow-credentials:true
//     optionSuccessStatus:200
// }
app.use(cors());
const mongoose=require('./db/mongodb')
const router=require('./router/user-route')
const router1=require('./router/blog-router')
// const cookieParser = require('cookie-parser')
app.use(express.json())
app.use('/api/user',router)
app.use('/api/blog',router1)
app.listen(3000)