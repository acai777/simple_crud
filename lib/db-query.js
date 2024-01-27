require('dotenv').config()
const { Client, Pool } = require("pg");

const logQuery = (statement, parameters) => {
  let timeStamp = new Date();
  let formattedTimeStamp = timeStamp.toString().substring(4, 24);
  console.log(formattedTimeStamp, statement, parameters);
};

module.exports = {
  async dbQuery(statement, ...parameters) {
    let pool = new Pool({
      user: process.env.USER,
      password: process.env.PASSWORD,
      host: process.env.HOST,
      port: process.env.PORT,
      database: process.env.DATABASE,
    });

    logQuery(statement, parameters);
    let result = await pool.query(statement, parameters);
    return result;
  }
};

// module.exports = {
//   async dbQuery(statement, ...parameters) {
//     let client = new Client({ database: process.env.DATABASE });
//     await client.connect();
//     logQuery(statement, parameters);
//     let result = await client.query(statement, parameters);
//     await client.end();

//     return result;
//   }
// };