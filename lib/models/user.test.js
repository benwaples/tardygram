const pool = require('../utils/pool');
const fs = require('fs');
const User = require('./user');

describe('User class', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  it('should insert a user into our database', async() => {
    const user = await User.insert({
      email: 'ben@ben.com',
      password: 'password'
    });

    expect(user.toJSON()).toEqual({
      id: expect.any(String),
      email: 'ben@ben.com',
    });
  });
});
