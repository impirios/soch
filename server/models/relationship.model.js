const mongoose = require('mongoose');

const relationSchema = new mongoose.Schema({
    from: { type: String, required: true },
    to: { type: String, required: true },
    started_at: { type: Date ,default:new Date()}
})

export default relationSchema;