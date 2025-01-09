import express from "express";
import { verifyRequest } from "../middlewares/auth.middlewares.js";
import { addComment, createPost, getAllPosts, likePost } from "../controllers/post.controllers.js";
import { upload } from "../middlewares/multer.middlewares.js";

const postRouter = express.Router();

//add post
postRouter.post("/post",verifyRequest,upload.single("file"),createPost)

//like post
postRouter.put("/post/:postId",verifyRequest,likePost);

//like post
postRouter.get("/posts",getAllPosts);

//add comment
postRouter.post("/post/:postId",verifyRequest,addComment);

export {postRouter};