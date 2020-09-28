const pool = require('../utils/pool');
const Service = require('../services/user-service');

module.exports = class User {
  id;
  email;
  passwordHash;

  constructor(user) {
    this.id = user.id;
    this.email = user.email;
    this.passwordHash = user.password_hash;
  }

  static async insert(user) {
    const { rows } = await pool.query(
      'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING *', [user.email, user.passwordHash]
    );
  

    return new User(rows[0]);
  } 

  static async findByEmail(email) {
    const { rows } = await pool.query(
      'SELECT * FROM users WHERE email=$1', [email]
    );

    if(!rows[0]) return null;
    else return new User(rows[0]);
  }

  toJSON() {
    return {
      id: this.id,
      email: this.email
    };
  }


};
