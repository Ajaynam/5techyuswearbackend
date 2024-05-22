
const mysql = require('mysql2/promise');

const pool = mysql.createPool({



  // host: '103.191.209.34',
  // user: "ubzrnkmd_nyus_admin",
  // password: "Win@nyus",
  // database: "ubzrnkmd_ecom_nyus",

  host: 'localhost' ,
  user: "root",
  password: "",
  database: "eyeflow",

  
});

pool.getConnection()
  .then(connection => {
    console.log('Connected to the database');
    connection.release();
  })
  .catch(err => {
    console.error('Error connecting to the database:', err);
  });

module.exports = {
  queryAsync: async (sql, values) => {
    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.execute(sql, values);
      return rows;
    } finally {
      connection.release();
    }
  },
};
