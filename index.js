const express = require('express');
const connection = require('./confPerso');

const app = express();
const port = 3001;

// respond to requests on `/api/employees`
app.get('/api/employees', (req, res) => {
  // send an SQL query to get all employees
  connection.query('SELECT * FROM employee', (err, results) => {
    if (err) {
      // If an error has occurred, then the client is informed of the error
      res.status(500).send(`An error occurred: ${err.message}`);
    } else {
      // If everything went well, we send the result of the SQL query as JSON
      res.json(results);
    }
  });
});

// respond to requests on `/api/employees`
app.get('/api/employees/:id', (req, res) => {
  const idEmployee = req.params.id

  connection.query('SELECT * FROM employee WHERE id=?', [idEmployee],(err, results) => {
    if (err) {
      // If an error has occurred, then the client is informed of the error
      res.status(500).send(`An error occurred: ${err.message}`);
       // An empty results array means no employee has the requested id
    }
    if (results.length === 0) {
        return res.status(404).send('Employee not found');
      }
      // If everything went well, we send the result of the SQL query as JSON
    return res.json(results[0]);
  });
});

app.get('/api/employees', (req, res) => {
  let sql = 'SELECT * FROM employee';
  const sqlValues = [];
  if (req.query.department) {
    sql += ' WHERE department = ?';
    sqlValues.push(req.query.department);
  }
  // send an SQL query to get all employees
  connection.query(sql, sqlValues, (err, results) => {
    if (err) {
      // If an error has occurred, then the client is informed of the error
      res.status(500).send(`An error occurred: ${err.message}`);
    } else {
      // If everything went well, we send the result of the SQL query as JSON
      res.json(results);
    }
  });
});


app.get

app.listen(port, (err) => {
  if (err) {
    throw new Error('Something bad happened...');
  }

  console.log(`Server is listening on ${port}`);
});
