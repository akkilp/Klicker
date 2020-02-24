// ENTRY POINT FOR BACKEND

// Express for request handling
const express = require('express')
const app = express()

const port = 3500
// Cors to handle API request from different origin
var cors = require('cors')
const bodyParser = require('body-parser');

// Require routes
var routes = require('./routes.js')

// Bodyparser middleware and cors configuration
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Make app use routes
app.use('/', routes)

// Listen server
app.listen(port, () => console.log(`Klicker listening on port ${port}!`))