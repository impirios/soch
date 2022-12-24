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

    getAll() {
        return this.userModel.find({}).lean();
    }

    search(text) {
        const query = {
            $text: { $search: text }
        }
        return this.userModel.find(query).select("-password").lean();
    }
}

export default UserService;