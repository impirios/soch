import EsService from "../services/es.service";

const esService = new EsService('post');

function pushPostToES(post) {
    return esService.push(post);
}

async function pushAllPostsToEs(req, res, next) {
    console.log(esService)
    try {
        return await esService.bulkPush().then(x=>res.json({status:true,message:"reindexd"}))

    } catch (error) {
        console.log(error)
    }
}

export default {
    pushPostToES,
    pushAllPostsToEs
}