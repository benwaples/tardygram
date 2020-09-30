const pool = require('../utils/pool');

module.exports = class Gram {
  id;
  userId;
  caption;
  tags;

  constructor(gram) {
    this.id = gram.id;
    this.userId = gram.user_id;
    this.caption = gram.caption;
    this.tags = gram.tags;
  }

  static async insert(gram) {
    const { rows } = await pool.query(
      'INSERT INTO grams (user_id, caption, tags) VALUES ($1, $2, $3) RETURNING *', 
      [gram.userId, gram.caption, gram.tags]
    );

    return new Gram(rows[0]);
  }

  static async findAll() {
    const { rows } = await pool.query('SELECT * FROM grams');
    return rows.map(gram => new Gram(gram));
  }

  static async findById(id) {
    // ******come back and add all comments for a post once the seed data is created*********
    const { rows } = await pool.query(
      `SELECT grams.id, caption, tags, users.email AS username FROM grams
        JOIN users 
        ON users.id = grams.user_id
        WHERE grams.id=$1`,
      [id]
    );
    return rows[0];
  }
};
