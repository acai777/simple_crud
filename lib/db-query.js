const { Client, Pool } = require("pg");

const logQuery = (statement, parameters) => {
  let timeStamp = new Date();
  let formattedTimeStamp = timeStamp.toString().substring(4, 24);
  console.log(formattedTimeStamp, statement, parameters);
};

module.exports = {
  async dbQuery(statement, ...parameters) {
    //let client = new Client({ database: "simple_crud" });
    let pool = new Pool({
      user: 'acai',
      password: 'my_password',
      host: 'localhost',
      port: 3001,
      database: 'simple_crud',
    });

    //await client.connect();
    logQuery(statement, parameters);
    //let result = await client.query(statement, parameters);
    let result = await pool.query(statement, parameters);
    //await client.end();

    return result;
  }
};
