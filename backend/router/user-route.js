const express=require('express')
const router=new express.Router()
const { getUser, signup, login ,getSpecificUser} = require('../controllers/user-control')
router.get('/',getUser)
router.post('/signup',signup);
router.post('/login',login);
// router.get('/token',verify)
// router.get('/loginuser',loginUser)
// router.post('/logout',logout)
router.get('/getUserId/:id',getSpecificUser)
module.exports=router
