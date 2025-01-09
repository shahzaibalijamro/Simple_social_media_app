import express from "express";
import { verifyRequest } from "../middlewares/auth.middlewares.js";
import { createPost } from "../controllers/post.controllers.js";

const postRouter = express.Router();

postRouter.post("/post",verifyRequest,createPost)

export {postRouter};