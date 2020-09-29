require('../lib/data/data-helper');
const request = require('supertest');
const app = require('../lib/app');

describe('tardygram post gram route', () => {

  it('should insert a gram if user is authorized via POST', async() => {
    const agent = request.agent(app);
    await agent
      .post('/api/v1/auth/signup')
      .send({
        email: 'ben@ben.com',
        password: 'password'
      });
    
    const placeHolder = {
      userId: 1,
      caption: 'I love cranberry',
      tags: ['spicy', 'hot', 'tasty']
    };

    return await agent
      .post('/api/v1/posts')
      .send({
        caption: 'I love cranberry',
        tags: ['spicy', 'hot', 'tasty']
      })
      .then(post => expect(post.body).toEqual({ ...placeHolder, id: expect.any(String) }));
  });

  it('should not let a user post if they are not authorized via POST', async() => {

    return await request(app)
      .post('/api/v1/posts')
      .send({
        caption: 'I love cranberry',
        tags: ['spicy', 'hot', 'tasty']
      })
      .then(post => expect(post.body).toEqual({ status: 500, message: 'jwt must be provided' }));
    
  });
});

describe('tardygram auth routes', () => {
  

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

  it('should verify a user via GET', async() => {
    const agent = request.agent(app);
    await agent
      .post('/api/v1/auth/signup')
      .send({
        email: 'ben@ben.com',
        password: 'password'
      });
    
    const response = await agent
      .get('/api/v1/auth/verify');

    expect(response.body).toEqual({
      id: expect.any(String),
      email: 'ben@ben.com'
    });
      
    const responseWithoutUser = await request(app)
      .get('/api/v1/auth/verify');

    expect(responseWithoutUser.body).toEqual({
      status: 500,
      message: 'jwt must be provided'
    });
  });
});
 
