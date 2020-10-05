require('../lib/data/data-helper');
const { getAgent } = require('../lib/data/data-helper');
const request = require('supertest');
const app = require('../lib/app');
const Comment = require('../lib/models/comment');

describe('Comment Routes', () => {
  it('add a comment for a user via POST', async() => {
    return await getAgent()
      .post('/api/v1/comments')
      .send({
        commentBy: 1,
        postId: 1,
        comment: 'a whole bunch of stuff'
      })
      .then(res => expect(res.body).toEqual({
        id: res.body.id,
        commentBy: res.body.commentBy,
        postId: 1,
        comment: 'a whole bunch of stuff'
      }));

  });
});
