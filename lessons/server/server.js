const express = require('express')
const {students} = require('./students')
const PORT = process.env.PORT || 3000

const app = express()

app.listen(PORT, () => {
    console.log("Express server listening on " + PORT)
})

app.get('/', (req, res) => {
    res.send("Hello World")
})

// app.get('/user/:name', (req, res) => {
//     res.send('A user: ' + req.params.name)
// })

app.get('/students/:name', (req, res) => {
    const studentName =
        req.params.name.charAt(0).toUpperCase() + req.params.name.slice(1).toLowerCase();
    if (students.includes(studentName)) {
        res.send(`${req.params.name} is in our class`)
    }
 else {
    res.send(`Who is ${req.params.name}?`)
}
    })


app.get('/year/:year', (req, res) => {
    if(req.params.year === '2019'){
        res.send(req.params.year + ' is the current year.')
    }
    else if (req.params.year === '2012'){
        res.send(req.params.year + ' was five years ago.')
    }
    else if (req.params.year === '2021'){
        res.send(req.params.year + ' is in two years')
    } else {
        res.send('Nope ' + req.params.year + ' is not a year.')
    }
})
