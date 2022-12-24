import mongoose from "mongoose";
import models from "../models";

class PostService {
    postModel;
    constructor() {
        this.postModel = models.postModel;
    }

    create(post) {
        return this.postModel(post).save();
    }
    update(id, post) {
        return this.postModel.findByIdAndUpdate(mongoose.Types.ObjectId(id), post);
    }
    delete(id) {
        return this.postModel.findByIdAndDelete(mongoose.Types.ObjectId(id));
    }
    get(id) {
        return this.postModel.findById(mongoose.Types.ObjectId(id));
    }
    getCount(id) {
        return this.postModel.find({ authorId: id }).count();
    }
    getAll(page, perPage, sortBy, userId) {
        let query = {};
        if (userId) {
            query = { userId };
        }
        return this.postModel.find(query).skip(page * perPage).limit(perPage).sort(sortBy).lean();
    }
    search(text) {
        const query = {
            $text: { $search: text }
        }
        return this.postModel.find(query).lean();
    }

    getByUserId(id) {
        return this.postModel.find({ authorId: id }).lean();
    }

    searchByTags(tags = []) {
        let orQuery = {};
        if (tags.length) {
            orQuery = { $or: tags.map(t => ({ "tags": t })) };

        }
        console.log(JSON.stringify(orQuery), 'cmoone')
        return this.postModel.find(orQuery).lean();

    }

    getTags() {

    }

    getTrendingTags() {

    }

    getPostsWithTrendingTags() {

    }
}

export default PostService;