import mongoose from "mongoose";
import Post from "../models/post.models.js";
import User from "../models/user.models.js";
import Like from "../models/like.models.js"
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

const likePost = async (req,res) => {
    const user = req.user;
    const {postId} = req.params;
    let session;
    try {
        if (!postId || !mongoose.Types.ObjectId.isValid(postId)) {
            return res.status(400).json({
                message: "Post Id is required and must be valid!"
            })
        }
        session = await mongoose.startSession();
        session.startTransaction();
        const post = await Post.findById(postId).session(session);
        if (!post) {
            await session.abortTransaction()
            return res.status(404).json({
                message: "Post does not exist!"
            })
        }
        const like = await Like.create([{
            userId: user._id,
            postId,
        }],{session});
        //update Post likes
        await Post.findByIdAndUpdate(post._id,{$push: {likes: like[0]._id}},{session});
        await session.commitTransaction();
        return res.status(200).json({
            message: "Post liked",
        })
    } catch (error) {
        console.log(error);
        if (session) await session.abortTransaction()
        return res.status(500).json({
            message: "Something went wrong!"
        })
    }finally{
        if (session) await session.endSession()
    }
}

const getAllPosts = async (req, res) => {
    const page = req.query?.page || 1;
    const limit = req.query?.limit || 10;
    const skip = (+page - 1) * +limit;
    try {
        const posts = await Post.find({}).skip(skip).limit(limit);
        if (posts.length === 0) return res.status(200).json({
            message: "You're all caught up!"
        })
        res.status(200).json(posts)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Something went wrong",
        })
    }
}

export {createPost,likePost,getAllPosts}