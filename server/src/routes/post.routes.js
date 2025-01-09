import express from "express";
import { verifyRequest } from "../middlewares/auth.middlewares.js";
import { createPost } from "../controllers/post.controllers.js";
import { upload } from "../middlewares/multer.middlewares.js";

const postRouter = express.Router();

postRouter.post("/post",verifyRequest,upload.single("file"),createPost)

export {postRouter};