const express=require('express')
const router=new express.Router()
const { getUser, signup, login } = require('../controllers/user-control')
router.get('/',getUser)
router.post('/signup',signup);
router.post('/login',login);
module.exports=router
