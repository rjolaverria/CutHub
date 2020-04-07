const mongoose = require('mongoose');
const userObject = {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'user'
};

const PostSchema = new mongoose.Schema({
  userid: userObject,
  text: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  avatar: {
    type: String
  },
  likes: [
    {
      userid: userObject
    }
  ],
  comments: [
    {
      userid: userObject,
      text: {
        type: String,
        required: true
      },
      name: {
        type: String
      },
      avatar: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Post = mongoose.model('posts', PostSchema);
