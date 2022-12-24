const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    alias: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    created_at: { type: Date, default: new Date() },
    lastActivityAt: { type: Date, default: new Date() },
    thumbImage: { type: String, default: `https://source.unsplash.com/random/200x200?sig=${parseInt(Math.random() * 1000)}` }
})
userSchema.index({
    "name": "text", 
    "alias": "text"
})

export default userSchema;