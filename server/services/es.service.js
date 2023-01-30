import client from "../config/esClient";
import postMappings from "../helpers/post.mappings";
import PostService from "./post.service";

const typeToIndex = {
    "post": "buzzed_posts"
}
const postService = new PostService();
class EsService {
    index = ""
    type = ""
    constructor(type) {
        this.type = type;
        this.index = typeToIndex[this.type];
    }


    search() {

    }

    async push(post) {
        await this.initialiseClient();
        return client.index({
            index: this.index,
            type: this.type,
            body: post,
            refresh: true
        })
    }

    async bulkPush() {
        console.log("burh")
        await this.initialiseClient().then(console.log).catch(console.log);
        const posts = await postService.getAll(0, 2000, undefined, undefined);
        let EsBulkQuery = [];
        console.log(posts);
        posts.map(p => {
            EsBulkQuery.push({
                index: { _index: this.index, _type: 'products', _id: p._id }
            });
            EsBulkQuery.push(p);
        })
        console.log(EsBulkQuery);

        return client.bulk({ body: EsBulkQuery, refresh: true });



    }

    async initialiseClient() {
        console.log("initialising")
        if (!await client.indices.exists({ index: this.index })) {
            return this.setMapping();
        }
    }



    setMapping() {
        let mappings = {};
        switch (this.type) {
            case "post": {
                mappings = postMappings;
                break;
            }
            default:
                mappings = {};
        }
        if (!mappings) {
            return Promise.reject("mapping not found!")
        }
        console.log(this.index, mappings)
        return client.indices.create({
            index: this.index,
            mappings: mappings
        })
    }
}

export default EsService;