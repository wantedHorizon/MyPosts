
const mongoose = require('mongoose');



const postSchema = mongoose. Schema({
  title: { type: String, required: true} ,
  content: { type: String, default: "empty msg"},
  imagePath: { type: String, required: true}

});

module.exports = mongoose.model('Post', postSchema);
