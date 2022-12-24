import PostService from "../services/post.service";
import RelationService from "../services/relation.service";
import UserService from "../services/user.service";

const relationService = new RelationService();
const postService = new PostService();
const userService = new UserService();

async function follow(req, res, next) {
    const userId = req.user._id, followingId = req.body.userId;

    const following = await userService.get(undefined, undefined, followingId);

    if (req.user && following && (userId != followingId)) {
        let alreadyFollows = await relationService.get(userId, followingId);
        if (alreadyFollows) {
            res.json({ status: true, message: "you already follow " + following.alias })
        }
        return relationService.create(userId, followingId).then(x => res.json({ status: true, message: "you now follow " + following.alias }))
    }
    else {
        res.status(500).send({ message: "Internal server error" });
    }
}

function unFollow(req, res, next) {
    const userId = req.user._id, followingId = req.body.userId;
    if (userId && followingId) {
        return relationService.delete(userId, followingId).then(x => res.json({ status: true, message: "unfollowed " + req.body.alias }))
    }
    else {
        res.status(500).send({ message: "Internal server error" });
    }
}

function getFollowersAndStats(req, res, next) {
    const userId = req.query.userId;
    return Promise.all([
        relationService.getFollowersCount(userId),
        relationService.getFollowingCount(userId),
        postService.getCount(userId)
    ])
        .then(stats => {
            res.json({
                status: true,
                data: {
                    followers: stats[0] || 0,
                    following: stats[1] || 0,
                    posts: stats[2] || 0
                }
            })
        })
}

function getFollowers(req, res, next) {
    const userId = req.query.userId;
    return relationService.getFollowers(userId)
        .then(users => res.json({ status: true, data: users }))
        .catch(err => res.status(404).send({ message: "not found", err: err }));

}

function getFollowing(req, res, next) {
    const userId = req.query.userId;
    return relationService.getFollowing(userId)
        .then(users => res.json({ status: true, data: users }))
        .catch(err => res.status(404).send({ message: "not found" }));
}


export default {
    follow,
    unFollow,
    getFollowersAndStats,
    getFollowers,
    getFollowing,

}