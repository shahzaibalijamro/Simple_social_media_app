import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: [true,"Content is required!"]
    },
    media:{
        type: String,
        required: [true,"Media is required!"]
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Author Id is required!"]
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Like"
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }]
},{timestamps:true});

export default mongoose.model("Post",postSchema);