import mongoose from "mongoose";
import User from "../models/user.models.js";
import Post from "../models/post.models.js";
import Comment from "../models/comment.models.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { generateAccessandRefreshTokens } from "../utils/token.utils.js";

// registers User
const registerUser = async (req, res) => {
    const { userName, email, password } = req.body;
    try {
        const user = await User.create({ userName, email, password });
        const { accessToken, refreshToken } = generateAccessandRefreshTokens(user);
        res
            .cookie("refreshToken", refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 })
            .status(201).json({
                message: "New user created",
                user,
                accessToken
            })
    } catch (error) {
        console.log(error.message);
        if (error.message === "Password does not meet the required criteria") {
            return res.status(400).json({ message: "Password does not meet the required criteria!" });
        }
        if (error.code === 11000) {
            return res.status(400).json({ message: "userName or email already exists." });
        }
        if (error.message === "Username must be unique!") {
            return res.status(400).json({ message: "This username is already taken." });
        }
        if (error.message === "Email must be unique!") {
            return res.status(400).json({ message: "This email is already taken." });
        }
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ message: 'Server error' });
    }
}

const loginUser = async function (req, res) {
    const { userNameOrEmail, password } = req.body;
    try {
        if (!userNameOrEmail || !password) {
            return res.status(400).json({ message: "Username, email, and password are required!" });
        }
        const user = await User.findOne({
            $or: [{ email: userNameOrEmail }, { userName: userNameOrEmail }]
        });
        if (!user) return res.status(404).json({
            message: "User does not exist!"
        })
        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if (!isPasswordCorrect) return res.status(401).json({
            message: "Invalid credentials"
        })
        const { accessToken, refreshToken } = generateAccessandRefreshTokens(user)
        res
            .cookie("refreshToken", refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 })
            .status(200)
            .json({
                message: "User successfully logged in!",
                user,
                accessToken,
                refreshToken
            })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "An error occurred during login" });
    }
}

const deleteUser = async (req, res) => {
    const { refreshToken } = req.cookies;
    let session;
    try {
        if (!refreshToken) {
            return res.status(401).json({ message: "No refresh token provided" });
        }
        const decodedToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        session = await mongoose.startSession();
        session.startTransaction();
        const deleteUserPosts = await Post.deleteMany({ userId: { _id: decodedToken._id } }, { session });
        const deleteUserComments = await Comment.deleteMany({ userId: decodedToken._id }, { session });
        const deleteUserLikes = await Post.updateMany(
            { likes: decodedToken._id },
            { $pull: { likes: decodedToken._id } },{session}
        );
        const deleteUser = await User.findByIdAndDelete(decodedToken._id, { session });
        if (!deleteUser) {
            await session.abortTransaction();
            return res.status(404).json({
                message: "User not found"
            })
        }
        await session.commitTransaction();
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            maxAge: 0,
            path: '/',
        });
        return res.status(200).json({ message: "User deleted!" });
    } catch (error) {
        if (session) await session.abortTransaction()
        if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Invalid or expired token" });
        }
        console.log(error);
        return res.status(500).json({ message: "Error occurred while deleting the user" });
    } finally {
        if (session) await session.endSession()
    }
};


export { registerUser, loginUser, deleteUser }