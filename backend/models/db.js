const mongoose = require('mongoose');

const dbRoute = 'mongodb+srv://nikshevtsov6:Fifafe96@cluster0-zx4dp.mongodb.net/test?retryWrites=true&w=majority';

// connects backend code with the database
mongoose.connect(dbRoute, { useUnifiedTopology: true, useNewUrlParser: true });

let db = mongoose.connection;
db.once('open', () => console.log('connected to the database'))

// check if connection with db is successfully
db.on('error', () => console.error.bind(console, 'MongoDB connection error:'));
require('./recipes');
require('./users');
