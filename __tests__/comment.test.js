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

  it('should return all comments via GET', async() => {
    return request(app)
      .get('/api/v1/comments')
      .then(res => expect(res.body.length).toEqual(100));
  });

  it('should delete a comment by id via DELETE', async() => {
    const firstComment = (await Comment.findAll())[0];
    return await getAgent()
      .delete(`/api/v1/comments/${firstComment.id}`)
      .then(res => expect(res.body).toEqual(firstComment));
  });
});
