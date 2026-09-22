import pool from '../config/db.js';

export const UserModel = {
  findByUsername: async (identifier: string) => {
    const [rows]: any = await pool.query('SELECT * FROM users WHERE username = ? OR email = ?', [identifier, identifier]);
    return rows[0];
  },

  create: async (username: string, email: string, hashedPassword: string) => {
    const [result]: any = await pool.query(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username, email, hashedPassword]
    );
    return result.insertId;
  }
};