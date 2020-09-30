const pool = require('../../utils/pool');
const Comment = require('../comment');
require('../../data/data-helper');

describe.only('Comment Class', () => {
  it('should insert a comment into the db', async() => {
    const comment = await Comment.insert({
      commentBy: 1,
      postId: 1,
      comment: 'ablkjsd;lfkj'
    });

    const { rows } = await pool.query('SELECT * FROM comments WHERE id=$1', [comment.id]);
    const constructedFoundComment = new Comment(rows[0]);
    expect(constructedFoundComment).toEqual({ ...comment, id: expect.any(String) });
  });
});
