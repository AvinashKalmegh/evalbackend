const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title:String,
    body:String,
    device:{type:String, enum:["Laptop","Tablet","Mobile"]},
    no_of_comments:Number,
    user_id:String
})


const PostModel = new mongoose.model("post",postSchema);

module.exports = PostModel;