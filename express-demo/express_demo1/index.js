const express = require('express')
const app = express()
const port = 5000

app.get('/', (req, res) => {
  console.log(req.params)
  res.send('Its working!')
})

app.post("/",(req,res) => {
  res.send("your data is posted")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})