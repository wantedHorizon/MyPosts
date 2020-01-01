
const mongoose = require('mongoose');
const uniqueValid = require("mongoose-unique-validator");



const userSchema = mongoose. Schema({
  email: {type: String, require: true, unique: true},
  password: {type: String, require: true}


});

userSchema.plugin(uniqueValid);
module.exports = mongoose.model('User', userSchema);
