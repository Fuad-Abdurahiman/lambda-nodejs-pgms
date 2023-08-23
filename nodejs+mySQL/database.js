const express = require('express');
const {createPool} = require('mysql')

const app = express();
const port=3000;
app.listen(port, () => {
        console.log((`Server started at ${port}`))
})


const pool = createPool({
        host: "localhost",
        user: "root",
        password: "Pumex@123",
        connectionLimit: 10

})

app.post('/data', (req, res) => {
        const { EmpId, FirstName, LastName, Salary } = req.body; // change these to match your table's columns
        connection.query(
          'INSERT INTO your-mysql-table (EmpId, FirstName, LastName, Salary) VALUES (4, Fuad , Abdu rahiman, 50000)',
          [EmpId, FirstName, LastName, Salary],
          (err, result) => {
            if (err) {
              console.error('Error inserting data into MySQL database: ', err);
              res.status(500).send('Internal server error');
              return;
            }
            res.send('Data inserted into MySQL database');
          }
        );
      });
      

app.get('/data', (req,res) => {
      pool.query('SELECT * FROM employee.`employee details; ',(err, rows) => {
        if (err) {
          console.error('Error querying MySQL database: ', err);
          res.status(500).send('Internal server error');
          return;
        }
        res.json(rows);
      });
        return console.log(res)

})


