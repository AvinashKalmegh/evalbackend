const { Router } = require("express");
const PostModel = require("../Models/postModel");

const postRouter = Router();


postRouter.get("/",async(req,res)=>{
    try {
        const {user_id} = req.body;
        const {device=["Laptop","Tablet","Mobile"]} = req.query;
        const postData = await PostModel.find({$and:[{user_id},{device:{$in:device}}]});
        res.status(200).json({"Posts": postData})
    } catch (error) {
        res.send({"error":error})
    }
})


postRouter.post("/add",async(req,res)=>{
    try {
        const postData = PostModel(req.body);
        await postData.save();
        res.send({"result":"Post added successfully", "Post": postData});
    } catch (error) {
        res.send({"error":error})
    }
})

postRouter.get("/top",async(req,res)=>{
    try {
        const {no_of_comments} = req.body;
        const postData = await PostModel.find({$max:{no_of_comments}}).limit(3);
        res.status(200).json({"Posts": postData})
    } catch (error) {
        res.send({"error":error})
    }
})


postRouter.patch("/update/:id",async(req,res)=>{
    try {
        const postData = await PostModel.findByIdAndUpdate((_id=req.params.id),req.body);
         await postData.save();
        res.send({"result":"Post Updated Successfully!","Post":postData})
    } catch (error) {
        res.send({"error":error.message})
    }
})


postRouter.delete("/delete/:id",async(req,res)=>{
    try {
        await PostModel.findByIdAndDelete({_id:req.params.id});
        res.send({"result":"Post has been deleetd!"})
    } catch (error) {
        res.send({"error":error})
    }
})

module.exports = postRouter;