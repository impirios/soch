import middleware from "../helpers/middleware";
import PostService from "../services/post.service";

const postService = new PostService();

function extractTags(text) {
    let tags = [];
    text = text.split('#');
    text.shift();
    (text || []).map(t => {
        t = t.split(' ')[0];
        if (t.length) {
            tags.push(t.toLowerCase());
        }
    })
    return tags || [];

}

function createPost(req, res, next) {
    let post = req.body;
    post.tags = extractTags(post.content);
    post.authorId = req.user._id;
    post.userData = {
        name:req.user.name,
        alias:req.user.alias,
        thumbImage:req.user.thumbImage
    }
    post.created_at=new Date();
    return postService.create(post).then(p => {
        return res.json({ status: true, message: "post created" })
    });
}

function updatePost(req, res, next) {
    let post = req.body;
    post.tags = extractTags(post.content);
    post.edited = true;
    return postService.update(post.id, post).then(p => {
        return res.json({ status: true, message: "post created" })
    });
}

function getPost(req, res, next) {
    const postId = req.query.id;
    return postService.get(postId)
        .then(p => res.json({ status: true, data: p }))
        .catch(err => res.status(404).send({ message: "post not found" }))
}

function deletePost(req, res, next) {
    const postId = req.query.id;
    return postService.delete(postId)
        .then(p => res.json({ status: true, message: "deleted" }))
        .catch(err => res.status(404).send({ message: "post not found" }))
}


function getAllPosts(req, res, next) {
    let filters = req.query;
    let page = filters.page || 0, perPage = filters.perPage || 12, sortBy = filters.sortBy || 'created_at', userId = filters.userId;
    return postService.getAll(page, perPage, sortBy, userId)
        .then(posts => res.json({ status: true, data: posts }))
        .catch(err => res.status(404).send({ message: "No posts" }))
}

function getPostsByTags(req, res, next) {
    let tags = (req.query.tags || '').split(',');
    return postService.searchByTags(tags)
        .then(posts => res.json({ status: true, data: posts }))
        .catch(err => res.status(404).send({ message: "No posts for this tag" }))

}

function searchPosts(req, res, next) {
    const query = req.query.text;
    return postService.search(query)
        .then(posts => res.json({ status: true, data: posts }))
        .catch(err => res.status(404).send({ message: "No Matching posts" }))

}

function getById(req, res, next) {
    const query = req.query.userId;
    return postService.getByUserId(query)
        .then(posts => res.json({ status: true, data: posts }))
        .catch(err => res.status(404).send({ message: "No Matching posts" }))

}

export default {
    createPost,
    updatePost,
    getPost,
    getAllPosts,
    getPostsByTags,
    searchPosts,
    deletePost,
    getById
}