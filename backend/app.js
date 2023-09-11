const express=require('express')
const app=express()
const cors = require('cors');
const dotenv = require("dotenv");
var bodyParser = require('body-parser');
dotenv.config();
app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ["*"]);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
app.use(bodyParser());
app.use(cors({
    origin:["http://localhost:3000","https://blogappmern.onrender.com"]
}));
const mongoose=require('./db/mongodb')
const router=require('./router/user-route')
const router1=require('./router/blog-router')
app.get('/',(req,res)=>{
    res.send("hello aaadish");
})
app.use(express.json())
app.use('/api/user',router)
app.use('/api/blog',router1)
app.listen(3000,()=>{
    console.log("3000");
})