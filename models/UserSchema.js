const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    Amount: {
        type: Number,
        default: 0
    },
    captcha:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model("User", userSchema)