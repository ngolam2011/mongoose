const mongoose = require('mongoose');
const PostSchema = require('./post');
const Schema = mongoose.Schema;

const UserSChema = new Schema({
  name: {
    type: String,
    validate: {
      validator: (name) => name.length > 2,
      message: 'Name must be longer than 2 characters.'
    },
    required: [true, 'Name is required.']
  },
  posts: [PostSchema],
  likes: Number,
  blogPosts: [{
    type: Schema.Types.ObjectId,
    ref: 'blogPost'
  }]
});

UserSChema.virtual('postCount').get(function() {
  return this.posts.length;
});

UserSChema.pre('remove', function(next) {
  const BlogPost = mongoose.model('blogPost');

  BlogPost.remove({ _id: { $in: this.blogPosts } })
    .then(() => next());
});

const User = mongoose.model('user', UserSChema);

module.exports = User;
