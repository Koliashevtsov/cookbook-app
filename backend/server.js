require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');

require('./models/db');
require('./config/passport');
const router = require('./routes');


const API_PORT = 3001;


const app = express();
app.use(cors());
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// append /api to our http requests
app.use(passport.initialize());
app.use('/api', router);


// Catch unauthorised errors
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({"message" : err.name + ": " + err.message});
  }
});


// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING_ON_PORT_${API_PORT}`));
