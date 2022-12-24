import mongoose from "mongoose";
import models from "../models";

class FeedService {
    postModel;
    relationModel;
    constructor() {
        this.postModel = models.postModel;
        this.relationModel = models.relationModel;
    }

    getFeed(userId){
        this.relationModel.aggregate([
            {
                $match: {
                    "from": { $eq: userId }
                }
            },
            {
                $lookup: {
                    from: "posts",
                    localField: "to",
                    foreignField: "authorId",
                    as: "posts"
                }
            }


        ])
    }


}

export default FeedService;