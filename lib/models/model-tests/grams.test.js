const pool = require('../../utils/pool');
const fs = require('fs');
const Gram = require('../gram');

describe('Gram class', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  it.only('should insert a new post into the DB', async() => {
    const gram = await Gram.insert({
      userId: 1,
      caption: 'I love cranberry',
      tags: ['spicy', 'hot', 'tasty']
    });

    const { rows } = await pool.query('SELECT * FROM grams WHERE id=$1', [gram.id]);

    expect(rows[0]).toEqual({ id: expect.any(String), user_id: expect.any(Number), caption: 'I love cranberry', tags: ['spicy', 'hot', 'tasty'] });
  });
});
