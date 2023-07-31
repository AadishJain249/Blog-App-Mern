const mongoose=require('mongoose')
const BlogSchema=mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    desc:{
        type:String,
        require:true
    },
    image:{
        type:String,
        require:true
    },
    // count of total blogs liked + unliked
    liked:{
        type:Number,
        default:0,
        require:true
    },
    // how many users like this blog
    likedby:[{
        type: mongoose.Schema.Types.ObjectId, // user id who liked this
        require:true,
        ref:'user'
    }],
    // how many users unlike this blog
    unlikedby:[{
        type: mongoose.Schema.Types.ObjectId,// user id who unliked this
        require:true,
        ref:'user'
    }],
    author:{ // id
        type: mongoose.Schema.Types.ObjectId,
        ref:'user',// connecting both models
        required:true        
    }
})
const blog=mongoose.model('blog',BlogSchema)
module.exports=blog