const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  title: {type: String, required: true},
  date: {type: Date, required: true},
  returned: {type: Boolean, required: true},
  comment: {type: String}
});

module.exports = mongoose.model('Post', postSchema);
