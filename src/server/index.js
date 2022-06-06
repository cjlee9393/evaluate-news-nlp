var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const cors = require('cors');

const app = express()

app.use(express.static('dist'))

// middleware
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

// cross-origin allowance
app.use(cors());

console.log(__dirname)

app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    // res.sendFile(path.resolve('dist/index.html'))
    res.sendFile(path.resolve('index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

app.post('/add', (req, res) => {
    console.log('post route');

    const data = req.body;

    console.log(data);

    res.json(data);
})
