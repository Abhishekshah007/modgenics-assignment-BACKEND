// section 1: importing modules and intializing
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// section 2: creating schema
const userSchema = new Schema({
    fullname: {
      type: String,
      required: true,
      unique: true,  
      index: true     
    },
    Amount: {
      type: Number,
      default: 0
    },
    captcha: {
      type: String,
      required: true
    }
  });
  
module.exports = mongoose.model("User", userSchema)