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
    user:{
        type:mongoose.Types.ObjectId,
        ref:"user",// connecting both models
        required:true        
    }
})
const blog=mongoose.model('blog',BlogSchema)
module.exports=blog