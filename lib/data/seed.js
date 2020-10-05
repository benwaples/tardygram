const Gram = require('../models/gram');
const User = require('../models/user');
const Comment = require('../models/comment');
const chance = require('chance').Chance();

const seed = async({ userCount = 4, commentCount = 100, postCount = 20 } = {}) => {
  const usersToInsert = [...Array(userCount)]
    .map((_, i) => ({
      email: `test${i}@test.com`,
      passwordHash: '$2a$08$K8OenYPpwdtiljqgHj/YbOhTJZnlLItp/soPXf4CVis.RdqUg7nB6'
    }));

  const insertedUsers = await Promise.all(usersToInsert.map(user => User.insert(user)));

  const postsToInsert = [...Array(postCount)]
    .map(() => ({
      userId: chance.integer({ min: 1, max: 5 }),
      photoUrl: chance.word(),
      caption: chance.company(),
      tags: [chance.word(), chance.word(), chance.word()]
    }));

  const insertedPosts = await Promise.all(postsToInsert.map(post => Gram.insert(post)));

  const commentsToSeed = [...Array(commentCount)]
    .map(() => ({
      commentBy: chance.pickone(insertedUsers).id,
      postId: chance.pickone(insertedPosts).id,
      comment: chance.sentence()
    }));

  await Promise.all(commentsToSeed.map(comment => Comment.insert(comment)));
};


module.exports = {
  seed,
};
