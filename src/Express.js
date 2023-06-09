const express = require('express')
const { exec } = require('child_process')

const app = express()

const cors = require('cors')

const whitelist = [
    'http://localhost:8080',
    'http://localhost:8081'
]
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(null, true)
        }
    }
}

app.use(cors(corsOptions))

app.get('/neural', (req, res) => {
    exec('python main.py', {encoding: "utf-8"},(error, stdout) => {
        console.log(stdout)
        if (error) {
            console.error(`exec error: ${error}`)
            res.status(500).send(error.message)
            return
        }
        res.send(stdout)
    })
})

app.get('/lenta', (req, res) => {
    const fs = require('fs');
    fs.readFile('../rss.txt', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(data);
        res.send(data);
    });
})


app.listen(3000, () => {
    console.log('Server started on port 3000')
})

