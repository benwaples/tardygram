const Gram = require('../models/gram');
const chance = require('chance').Chance();

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
  seedPosts
};
