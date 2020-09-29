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
    console.log(allPosts);
    expect(allPosts.length).toEqual(5);
  });
});
