const pool = require('../../utils/pool');
const Gram = require('../gram');
require('../../data/data-helper');

describe('Gram class', () => {

  it('should insert a new post into the DB', async() => {
    const gram = await Gram.insert({
      userId: 1,
      photoUrl: 'randomw text that would be a link to a photo url',
      caption: 'I love cranberry',
      tags: ['spicy', 'hot', 'tasty']
    });

    const { rows } = await pool.query('SELECT * FROM grams WHERE id=$1', [gram.id]);

    expect(rows[0]).toEqual({ id: expect.any(String), user_id: expect.any(Number), photo_url: 'randomw text that would be a link to a photo url', caption: 'I love cranberry', tags: ['spicy', 'hot', 'tasty'] });
  });

  it('should find all posts', async() => {
    const allPosts = await Gram.findAll();
    expect(allPosts.length).toEqual(20);
  });

  it('should return a post by id', async() => {
    // ******come back and add all comments for a post once the seed data is created*********
    const firstPost = (await Gram.findAll())[0];
    const findPost = await Gram.findById(firstPost.id);
    expect(findPost).toEqual({ id: expect.any(String), caption: firstPost.caption, tags: firstPost.tags, username: expect.any(String) });
  });

  it('should allow the user to update their posts caption', async() => {
    const firstPost = (await Gram.findAll())[0];
    const newCaption = 'thought it was cute, might delete later';
    const updatePostCaption = await Gram.updateCaption(firstPost.id, newCaption);
    
    expect(updatePostCaption).toEqual({ ...firstPost, caption: updatePostCaption.caption });
  });

  it('should delete a post by id', async() => {
    const firstPost = (await Gram.findAll())[0];
    const deletedPost = await Gram.delete(firstPost.id);
    expect(deletedPost).toEqual(firstPost);

    const findDeletedPost = await Gram.findById(firstPost.id);
    expect(findDeletedPost).toEqual(undefined);

  });
});
