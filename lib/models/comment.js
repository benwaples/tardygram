const pool = require('../utils/pool');

module.exports = class Comment {
  id; 
  commentBy;
  postId;
  comment;

  constructor(comment) {
    this.id = comment.id;
    this.commentBy = comment.comment_by;
    this.postId = comment.post_id;
    this.comment = comment.comment;
  }

  static async insert(comment) {
    const { rows } = await pool.query(
      'INSERT INTO comments (comment_by, post_id, comment) VALUES ($1, $2, $3) RETURNING *',
      [comment.commentBy, comment.postId, comment.comment]
    );

    return new Comment(rows[0]);
  }

  static async findAll() {
    const { rows } = await pool.query(
      'SElECT * FROM comments'
    );

    return rows.map(row => new Comment(row));
  }
};
