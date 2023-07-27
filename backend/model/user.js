const mongoose=require('mongoose')
const UserSchema=mongoose.Schema({
    name:{
        type:String,
        unique:true,
        trim:true,
        require:true
    },
    email:{
        type:String,
        unique:true,
        trim:true,
        require:true
    },
    password:{
        type:String,
        minlength:8,
        require:true
    },
    // likedblog: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'blog'
    // }],
    // unlikedblog: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'blog'
    // }],
    blogs:[{ // particular user blogs list 1 per time
        type:mongoose.Schema.Types.ObjectId,
        ref:'blog',// connecting both models
        required:true        
    }]
})
const user=mongoose.model('user',UserSchema)
module.exports=user