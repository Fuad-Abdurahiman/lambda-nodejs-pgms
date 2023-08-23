const Joi = require('joi')
const express = require('express')
const app = express()
const mysql = require('mysql2');

app.use(express.json())



// const pool = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "Pumex@123",
//     database: "employee"
// })

const courses =[
    { id:1 ,name: "Maths"  },
    { id: 2,name: "AI"   },
    { id:3, name: "Frontend"},
]

app.get("/", (req,res) => {
    res.send("Its working....!!!")
})

app.get("/api/courses", (req,res) =>{
    res.send(courses)
})

app.post("/api/courses", (req,res) =>{
   const schema = {
    name: Joi.string().min(3).required()
   }

   const result = Joi.validate(req.body , schema )   // returns an object and storing in result
   //console.log(result)                              // The object will have 4 elements : error, value,then,catch

   if (result.error)
    {    //400 bad request
        res.status(404).send(result.error.details[0].message)
        return;
    } 

//    if (!req.body.name || req.body.name.length < 3)
//     {    //400 bad request
//         res.status(404).send("The name is required or the minimum length is 3")
//         return;
//     }

   const course= {
    id: courses.length +1 ,
    name : req.body.name
   }
   courses.push(course)
   res.send(course)
})

// app.get("/api/courses/:id", (req,res) => {
//     res.send(req.params.id)
// })

app.get("/api/courses/:id", (req,res) => {
    const course = courses.find( c => c.id=== parseInt(req.params.id))
    if(!course)
        res.status(404).send('The course with this given ID not found :( ')
    res.send(course)
})

app.get("/api/posts/:year/:month/:day", (req,res) => {
    res.send(req.params)
})

app.put("/api/courses/:id", (req,res) =>{
    //Look up the course
    // If not existing, return 404 error
    const course = courses.find( c => c.id=== parseInt(req.params.id))
    if(!course)
        res.status(404).send('The course with this given ID not found :( ')
    res.send(course)
    

    //Validate
    // If invalid , return  404 - bad request

    //Update the course
    //return the  updated course
})

const port = process.env.PORT || 3000 ;
app.listen(port , () => console.log(`The server is listening on port ${port}...`))



// pool.query('SELECT * FROM employee.`employee details`;', (err, rows) => {
//     if (err) {
//       console.error('Error querying MySQL database: ', err);
//       return;
//     }
//     console.log('Data received from MySQL database: ', rows);
//   });


  

