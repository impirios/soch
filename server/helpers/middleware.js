import config from "../config/config";
import PostService from "../services/post.service";
import UserService from "../services/user.service";
const jwt = require('jsonwebtoken');
const postService = new PostService();
const userService = new UserService();
async function checkLogin(req, res, next) {
    if (req.headers.authorization && req.headers.authorization.substr("Bearer")) {
        let token = req.headers.authorization.split(' ')[1].trim();

        try {
            var decoded = jwt.verify(token, config.jwtSecret);
            const user = await userService.get(undefined,undefined,decoded._id);
            if(user){
                req.user = user;
                return next();
    
            }
            else{
                throw new Error();

            }
        }
        catch (err) {
            if (err) {
                return res.status(401).send({
                    message: 'Invalid token!'
                })
            }
        }
    } else {
        return res.status(404).send({
            message: 'No token found!'
        })
    }
}

async function postBelongsToUser(req, res, next) {
    let userID = req.user._id, postId = req.body.id;
    let post = await postService.get(postId)

    if (post.authorId == userID) {
        req.post = post;
        return next();
    }
    else {
        return res.status(401).send({ message: "Unauthorised" })
    }
}

export default {
    checkLogin,
    postBelongsToUser
}
