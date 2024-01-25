let pool = new Pool({
  user: 'arnocai',
  password: 'my_password',
  host: 'localhost',
  port: 3001,
  database: 'simple_crud',
});

async function test() {
  try {
    const response = await pool.query('SELECT * FROM users');
    users = response['rows'];
    console.log(users)
    return users // returning an array of objects
  } catch (err) {
    console.error(err);
  }
}

