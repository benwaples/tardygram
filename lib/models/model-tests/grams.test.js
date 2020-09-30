const pool = require('../../utils/pool');
const Gram = require('../gram');
require('../../data/data-helper');

describe('Gram class', () => {

  it('should insert a new post into the DB', async() => {
    const gram = await Gram.insert({
      userId: 1,
      caption: 'I love cranberry',
      tags: ['spicy', 'hot', 'tasty']
    });

    const { rows } = await pool.query('SELECT * FROM grams WHERE id=$1', [gram.id]);

    expect(rows[0]).toEqual({ id: expect.any(String), user_id: expect.any(Number), caption: 'I love cranberry', tags: ['spicy', 'hot', 'tasty'] });
  });

  it('should find all posts', async() => {
    const allPosts = await Gram.findAll();
    expect(allPosts.length).toEqual(5);
  });

  it('should return a post by id', async() => {
    // ******come back and add all comments for a post once the seed data is created*********
    const firstPost = (await Gram.findAll())[0];
    const findPost = await Gram.findById(firstPost.id);
    expect(findPost).toEqual({ id: expect.any(String), caption: firstPost.caption, tags: firstPost.tags, username: expect.any(String) });
  });

  it('should allow the user to update their posts caption', async() => {
    
  });
});
