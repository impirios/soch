import mongoose from "mongoose";
import postSchema from "./post.model";
import relationSchema from "./relationship.model";
import userSchema from "./user.model";

const postModel = mongoose.model('post',postSchema);
const relationModel = mongoose.model("relation",relationSchema);
const userModel = mongoose.model("user",userSchema);

export default{
    postModel,
    relationModel,
    userModel
}