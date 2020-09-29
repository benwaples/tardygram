const fs = require('fs');
const pool = require('../utils/pool');
const { seedPosts, seedUsers } = require('./seed');

beforeEach(() => {
  return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
});

beforeEach(() => {
  return seedUsers();
});

beforeEach(() => {
  return seedPosts();
});
