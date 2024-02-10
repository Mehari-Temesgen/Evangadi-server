const mysql2 = require("mysql2");

const connection = mysql2.createPool({
  user: process.env.USER,
  database: process.env.DATABASE,
  host: "localhost",
  password: process.env.PASSWORD,
  connectionLimit: 10,
});
console.log(process.env.PASSWORD);

module.exports = connection.promise();
