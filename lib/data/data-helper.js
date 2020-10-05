const fs = require('fs');
const pool = require('../utils/pool');
const request = require('supertest');
const app = require('../app');
const { seed } = require('./seed');

beforeEach(() => {
  return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
});

beforeEach(() => {
  return seed();
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
