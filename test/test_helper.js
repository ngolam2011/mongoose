const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/users_test');

mongoose.Promise = global.Promise;

before((done) => {
  mongoose.connection
    .once('open', () => { done(); })
    .on('error', (error) => {
      console.warn('Error', error);
    });
});

beforeEach((done) => {
  const { users, comments, blogposts } = mongoose.connection.collections;
  users.drop(() => {
    comments.drop(() => {
      blogposts.drop(() => {
        done();
      });
    });
  });
});
