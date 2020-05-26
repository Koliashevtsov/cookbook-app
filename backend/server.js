const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const Data = require('./data');

const API_PORT = 3001;
const app = express();
app.use(cors());
const router = express.Router();

const dbRoute = 'mongodb+srv://nikshevtsov6:Fifafe96@cluster0-zx4dp.mongodb.net/test?retryWrites=true&w=majority';


// connects backend code with the database
mongoose.connect(dbRoute, { useUnifiedTopology: true, useNewUrlParser: true });

let db = mongoose.connection;
db.once('open', () => console.log('connected to the database'))

// check if connection with db is successfully
db.on('error', () => console.error.bind(console, 'MongoDB connection error:'));

// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// this method fetches all available data in our db
router.get('/getData', (req, res) => {
    Data.find((err, data) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: data });
    });
});

// this method overwrites existing data in our database
router.post('/updatedData', (req, res) => {
    const { id, update } = req.body;
    Data.findByIdAndUpdate(id, update, (err) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});

// this method removes existing data in our database
router.delete('/deleteData', (req, res) => {
    const { id } = req.body;
    Data.findByIdAndRemove(id, (err) => {
        if (err) return res.send(err);
        return res.json({ success: true });
    });
});



    if ((!id && id !== 0) || !message){
        return res.json({
            success: false,
            error: 'INVALID_INPUTS'
        });
    }
    data.message = message;
    data.id = id;
    data.save((err) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});

// append /api to our http requests
app.use('/api', router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING_ON_PORT_${API_PORT}`));





















/////////////////////////////
