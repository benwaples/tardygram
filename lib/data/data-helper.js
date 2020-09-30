const fs = require('fs');
const pool = require('../utils/pool');
const request = require('supertest');
const app = require('../app');
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

const agent = request.agent(app);
beforeEach(() => {
  return agent
    .post('/api/v1/auth/login')
    .send({
      email: 'test1@test.com',
      password: 'password'
    });
});

module.exports = {
  getAgent: () => agent
};
