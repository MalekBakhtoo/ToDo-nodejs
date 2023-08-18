const mongoose  = require("mongoose");
const joi = require('joi');
const jwt = require('jsonwebtoken');
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
    },
    
});
userSchema.methods.genereatJwt = function () {
    let token = jwt.sign({
        _id: this._id,
        name: this.name,
        email : this.email,

    }, 'privateKey', {
        expiresIn: "2h",
    });
    return token;
}
function validateUser(user) {
    const schema = joi.object({
        name: joi.string().min(3).max(50).required(),
        password: joi.string().min(8).max(26).required(),
        email: joi.string().required().email()
    });
    return schema.validate(user);
}
function validateLogin(user) {
    const schema = joi.object({
        email: joi.string().required().email(),
        password: joi.string().min(8).max(26).required()
    });
    return schema.validate(user);
}
module.exports.validateUser = validateUser;
module.exports.validateLogin = validateLogin;
module.exports.userModel = mongoose.model('user' , userSchema);