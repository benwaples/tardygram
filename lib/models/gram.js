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
    console.log(rows, 'rawdata');
    return rows.map(gram => new Gram(gram));
  }
};
