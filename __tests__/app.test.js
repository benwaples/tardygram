const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');

describe('tardygram routes', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  it('sign up a user via POST', async() => {
    const response = await request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'ben@ben.com',
        password: 'password'
      });

    expect(response.body).toEqual({
      id: expect.any(String),
      email: 'ben@ben.com'
    });
  });

  it('sets authorization for a user based on email via POST', async() => {
    const response = await request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'ben@ben.com',
        password: 'password'
      });

    const foundUser = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'ben@ben.com',
        password: 'password'
      });

    expect(foundUser.body).toEqual(response.body);
  });
});
 
