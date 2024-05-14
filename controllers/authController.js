


const db = require('../models/db');
const jwt = require('jsonwebtoken');

const secretKey = 'your-secret-key';

const authenticateUser = async (role, username, password) => {
  try {
    if (!username || !password) {
      throw new Error('Username and password are required');
    }

    let tableName;

    switch (role) {
      case 'admin':
        tableName = 'user';
        break;
      // case 'sanchalak':
      //   tableName = 'sanchalak';
      //   break;
      // case 'incharge':
      //   tableName = 'incharge';
      //   break;
      // case 'sahayojak':
      //   tableName = 'sahayojak';
      //   break;
      // case 'sevadal':
      //   tableName = 'sevadal';
      //   break;

      default:
        throw new Error('Invalid role');
    }

    const sql = `SELECT * FROM ${tableName} WHERE username = ? AND ${role}_password = ?`;

    const results = await db.queryAsync(sql, [username, password]);

    if (results.length === 1) {
      const data = results[0];
      const token = jwt.sign({ role, username }, secretKey, { expiresIn: '10d' });
      // req.role = role
      return { data, token, role };
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error authenticating user:', error);
    throw error;
  }
};

module.exports = {
  authenticateUser,
};
