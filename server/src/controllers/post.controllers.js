import mongoose from "mongoose";
import Post from "../models/post.models.js";
import User from "../models/user.models.js";
import { uploadImageToCloudinary } from "../utils/cloudinary.utils.js";

const createPost = async (req,res) => {
    const {content} = req.body;
    const user = req.user;
    const file = req.file ? req.file.path : "";
    console.log(content);
    console.log(user._id);
    console.log(file);
    
    let session;
    try {
        if ((!content || content.trim() === "") && !file) {
            return res.status(400).json({
                message: "A post must consist of either text or media or both!"
            })
        }
        let media;
        if (file) {
            media = await uploadImageToCloudinary(file);
            if (!media) {
                return res.status(500).json({
                    message: "Could not upload media!"
                })
            }
        }
        session = await mongoose.startSession();
        session.startTransaction();
        //create post
        const post = await Post.create([{
            content: content || "",
            media: media || "",
            userId: user._id,
        }],{session});
        //update user posts
        await User.findByIdAndUpdate(user._id,{$push: {posts: post[0]._id}},{session});
        await session.commitTransaction();
        return res.status(200).json({
            message: "Post created!",
            post
        })
    } catch (error) {
        console.log(error);
        if (session) await session.abortTransaction();
        return res.status(500).json({
            message: "Something went wrong!"
        })
    }finally{
        if (session) await session.endSession();
    }
}

export {createPost}