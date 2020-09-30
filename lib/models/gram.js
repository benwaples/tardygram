const pool = require('../utils/pool');

module.exports = class Gram {
  id;
  userId;
  photoUrl;
  caption;
  tags;

  constructor(gram) {
    this.id = gram.id;
    this.userId = gram.user_id;
    this.photoUrl = gram.photo_url;
    this.caption = gram.caption;
    this.tags = gram.tags;
  }

  static async insert(gram) {
    const { rows } = await pool.query(
      'INSERT INTO grams (user_id, photo_url, caption, tags) VALUES ($1, $2, $3, $4) RETURNING *', 
      [gram.userId, gram.photoUrl, gram.caption, gram.tags]
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

  static async updateCaption(id, caption) {
    const { rows } = await pool.query(
      `UPDATE grams
        SET caption=$1
        WHERE id=$2
      RETURNING *
      `,
      [caption, id]
    );
    return new Gram(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM grams WHERE id=$1 RETURNING *',
      [id]
    );

    if(!rows[0]) return null;
    else return new Gram(rows[0]);
  }
};
