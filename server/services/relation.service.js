import models from "../models";

class RelationService {
    relationModel;
    constructor() {
        this.relationModel = models.relationModel;
    }

    create(user1, user2) {
        const relation = {
            from: user1,
            to: user2
        }
        return this.relationModel(relation).save()
    }

    delete(user1, user2) {
        return this.relationModel.findOneAndDelete({ from: user1, to: user2 });
    }

    get(user1, user2) {
        return this.relationModel.findOne({ from: user1, to: user2 });
    }

    getFollowers(userId) {
        return this.relationModel.aggregate([
            {
                $match: {
                    "to": { $eq: userId }
                }
            },
            {
                "$addFields": { "followerId": { "$toObjectId": "$from" } },

            },
            {
                $lookup: {
                    from: "users",
                    localField: "followerId",
                    foreignField: "_id",
                    as: "follower"
                }
            }
        ])
    }

    getFollowing(userId) {
        return this.relationModel.aggregate([
            {
                $match: {
                    "from": { $eq: userId }
                }
            },
            {
                "$addFields": { "followingId": { "$toObjectId": "$to" } },

            },
            {
                $lookup: {
                    from: "users",
                    localField: "followingId",
                    foreignField: "_id",
                    as: "following"
                }
            }
        ])
    }

    getFollowersCount(userId) {
        return this.relationModel.find({ to: userId }).countDocuments();
    }

    getFollowingCount(userId) {
        return this.relationModel.find({ from: userId }).countDocuments();
    }

    clearFollowers(userId) {
        return this.relationModel.deleteMany({ from: userId });
    }

    clearFollowers(userId) {
        return this.relationModel.deleteMany({ to: userId });
    }

}

export default RelationService;