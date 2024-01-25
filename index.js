const express = require('express');
const app = express();
const { dbQuery } = require("./lib/db-query");

app.use(express.json()); // allows us to access data in the HTTP request body


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









// Index page
app.get('/', (request, response) => {
  response.send('<p>Hi! Welcome to the API :)</p>');
})

// Read ALL data points 
app.get('/names', async (request, response) => {
  // const GET_NAMES = "SELECT * FROM users";
  // let result = await dbQuery(GET_NAMES);
  // let names = result.rows; 

  let names = await test();
  response.json(names);
})

// Read one data point
app.get('/names/:id', async (request, response) => {
  const id = +request.params.id;
  const GET_NAME = "SELECT * FROM users WHERE id = $1";
  let result = await dbQuery(GET_NAME, id);
  let name = result.rows; 
  let rowCount = result.rowCount;

  if (rowCount === 0) {
    response.send('<p>There were no folks with that id...</p>');
  } else {
    response.json(name);
  }
})

// Create a data point
app.post('/names', async (request, response) => {
  const body = request.body;

  // validate the name 
  if (!body.name) {
    response.send('<p>Please enter a name...</p>');
  } 

  const ADD_NAME = "INSERT INTO users" + 
  " (name) VALUES" + 
  " ($1)"; 
  
  let result = await dbQuery(ADD_NAME, body.name);

  if (result.rowCount > 0) {
    response.send('<p>Success. Name added successfully</p>');
  } else {
    response.send("<p>Failed. Name couldn't be added.</p>");
  }
})

// Delete a data point
app.delete('/names/:id', async (request, response) => {
  const id = +request.params.id;
  const DELETE_NAME = "DELETE FROM users WHERE id = $1";
  let result = await dbQuery(DELETE_NAME, id);

  if (result.rowCount > 0) {
    response.send('<p>Success. Name deleted successfully</p>');
  } else {
    response.send("<p>Failed. Name couldn't be deleted. Check that the id is valid.</p>");
  }
})

// Update a data point
app.put('/names', async (request, response) => {
  const id = +request.body.id;
  const newName = request.body.name;

  if (!newName || !id) {
    response.send('<p>You must give an updated name and id of the person.</p>');
    return;
  }

  const CHANGES = "UPDATE users " + 
  "SET name = $1 " +
  "WHERE id = $2";
  let result = await dbQuery(CHANGES, newName, id);

  if (result.rowCount > 0) {
    response.send('<p>Success. Name updated successfully</p>');
  } else {
    response.send("<p>Failed. Name couldn't be updated. Check that the id is valid.</p>");
  }
})


// Error handler (render a custom view for errors)
app.use((err, req, res, next) => {
  console.log(err);
  res.status(404).render("error", {
    err
  });
});

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})