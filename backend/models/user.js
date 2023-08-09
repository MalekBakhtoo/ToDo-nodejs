const mongoose  = require("mongoose");
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        maxLength: 1024,
        minLength: 8,
    }
});
module.exports = mongoose.model('user' , userSchema);