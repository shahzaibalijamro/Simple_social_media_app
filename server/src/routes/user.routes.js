import express from "express"
import {  deleteUser, getAllUsers, loginUser,registerUser} from "../controllers/users.controllers.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyRequest } from "../middlewares/auth.middelwares.js";
const userRouter = express.Router();

//get all users
userRouter.get("/all",getAllUsers)

//register User
userRouter.post("/register", upload.single("image"), registerUser)

//login User
userRouter.post("/login", loginUser)

//delete User
userRouter.delete("/delete", verifyRequest, deleteUser)

export { userRouter }