import mongoose from "mongoose";
import models from "../models";

class UserService {
    userModel;
    constructor() {
        this.userModel = models.userModel;
    }

    create(user) {
        return this.userModel(user).save();
    }

    delete(alias) {
        return this.userModel.findOneAndDelete({ alias });
    }

    get(alias, email = undefined, _id = undefined) {
        let orQuery = [];
        if (alias) {
            orQuery.push({ "alias": alias })
        }

        if (email) {
            orQuery.push({ "email": email })
        }

        if (_id) {
            orQuery.push({ "_id": mongoose.Types.ObjectId(_id) });
        }
        console.log(orQuery);
        return this.userModel.findOne({ $or: orQuery }).lean();
    }

    update(alias, updatedUser) {
        return this.userModel.findOneAndUpdate({ alias }, updatedUser, { new: true });
    }

    getAll(userId) {
        console.log(JSON.stringify([

            {
                "$addFields": { "userId": { "$toString": "$_id" } }
            },
            {
                $match:{
                    "userId": {$ne:userId}
                }
            },
            {
                $lookup: {
                    from: "relations",
                    localField: "userId",
                    foreignField: "to",
                    as: "relation"
                }
            }
        ]))
        return this.userModel.aggregate([
            {
                $match:{
                    "_id": {$ne:mongoose.Types.ObjectId(userId)}
                }
            },
            {
                "$addFields": { "userId": { "$toString": "$_id" } }
            },
            {
                $lookup: {
                    from: "relations",
                    localField: "userId",
                    foreignField: "to",
                    as: "relation"
                }
            }
        ]);
    }

    search(text) {
        let query = {};
        if (text) {
            query = {
                $text: { $search: text }
            }
        }

        return this.userModel.find(query).select("-password").lean();
    }
}

export default UserService;