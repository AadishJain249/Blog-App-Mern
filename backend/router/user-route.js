const express=require('express')
const router=new express.Router()
const { getUser, signup, login,verify ,loginUser, logout} = require('../controllers/user-control')
router.get('/',getUser)
router.post('/signup',signup);
router.post('/login',login);
router.get('/token',verify)
router.get('/loginuser',loginUser)
router.post('/logout',logout)
module.exports=router
