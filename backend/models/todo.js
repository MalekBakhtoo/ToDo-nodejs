const mongoose = require('mongoose');
const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    isDone: {
        type: Boolean,
        default: false
    }
});
module.exports = mongoose.model("todo", todoSchema);