const { readFileSync, writeFileSync } = require('fs')

const express = require('express')
const app = express();

app.get('/', (req,res) =>{
    const count = readFileSync('./count.txt' , 'utf-8')
    console.log("Count :",count)

    const newCount = parseInt(count) +1
    writeFileSync('./count.txt' , newCount.toString())
    console.log(this)


    res.send(`
        <!DOCTYPE html>
        <html lang ="en">
        <head>
            <meta charset='utf-8' />
            <meta name  name="viewport" content="width=device-width, initial-scale=1" />
            <title>I hosted a website</title>
        </head>
        <body>
            <h1>Welcome to my website!!!</h1>
            <p>This page has been viewed ${newCount} times!</p>
        </body>
        </html>
    `)

})

app.listen(5000, ()=> console.log('http://localhost:5000/') )