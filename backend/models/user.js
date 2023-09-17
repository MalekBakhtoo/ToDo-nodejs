const mongoose = require("mongoose");
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
    phone: {
        type: String,
        default: "None"
    },
    mobile: {
        type: String,
        default: "None"
    },
    address: {
        type: String,
        default: "None"
    },
    job: {
        type: String,
        default: "None"
    },
    image :{
        type : String,
        default : "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
    }

});
userSchema.methods.genereatJwt = function () {
    let token = jwt.sign({
        _id: this._id,
        name: this.name,
        email: this.email,

    }, 'privateKey', {
        expiresIn: "2h",
    });
    return token;
}
function validateUser(user) {
    const schema = joi.object({
        name: joi.string().min(3).max(50).required(),
        password: joi.string().min(8).max(26).required(),
        email: joi.string().required().email(),
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
function validateUserUpdate(user) {
    const schema = joi.object({
        name: joi.string().min(3).max(50).required(),
        phone : joi.string().min(7).max(15).required(),
        mobile : joi.string().min(10).max(15).required(),
        address : joi.string().max(55).required()
    });
    return schema.validate(user);
}
module.exports.validateUser = validateUser;
module.exports.validateUserUpdate = validateUserUpdate;
module.exports.validateLogin = validateLogin;
module.exports.userModel = mongoose.model('user', userSchema);