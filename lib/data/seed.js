const Gram = require('../models/gram');
const User = require('../models/user');
const chance = require('chance').Chance();

const seedUsers = async({ userCount = 4 } = {}) => {
  const usersToInsert = [...Array(userCount)]
    .map(() => ({
      email: chance.email(),
      passwordHash: chance.string({ length: 22 })
    }));

  await Promise.all(usersToInsert.map(user => User.insert(user)));
};

const seedPosts = async({ postCount = 5 } = {}) => {
  const postsToInsert = [...Array(postCount)]
    .map(() => ({
      userId: chance.integer({ min: 1, max: 5 }),
      caption: chance.company(),
      tags: [chance.word(), chance.word(), chance.word()]
    }));

  await Promise.all(postsToInsert.map(post => Gram.insert(post)));
};

module.exports = {
  seedPosts, seedUsers
};
