const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    created_at: { type: Date, default: new Date() },
    content: { type: String, required: true },
    authorId: { type: String, required: true },
    userData: {},
    edited: { type: Boolean, default: false },
    tags: [{ type: String }]
})

postSchema.index({
    "content": "text",
})
postSchema.index({ tags: 1 });
export default postSchema;