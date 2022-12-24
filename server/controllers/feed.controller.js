import FeedService from "../services/feed.service";

const feedService = new FeedService();

function getFeed(req, res, next) {
    const userId = req.user._id;
    return feedService.getFeed(userId).then(posts => {
        return res.json({ status: true, data: posts })
    }).catch(err => res.status(404).send({ message: "not found" }));
}

export default {
    getFeed
}