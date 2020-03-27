const mongoose = require('mongoose');
const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');

const router = require('./routes');

const API_PORT = 3001;
const app = express();
app.use(cors());

// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// append /api to our http requests
app.use('/api', router);

const dbRoute = 'mongodb+srv://nikshevtsov6:Fifafe96@cluster0-zx4dp.mongodb.net/test?retryWrites=true&w=majority';

// connects backend code with the database
mongoose.connect(dbRoute, { useUnifiedTopology: true, useNewUrlParser: true });

let db = mongoose.connection;
db.once('open', () => console.log('connected to the database'))

// check if connection with db is successfully
db.on('error', () => console.error.bind(console, 'MongoDB connection error:'));





// this method fetches all available data in our db
// router.get('/getData', (req, res) => {
//     Recipe
//     .find()
//     .exec((err, data) => {
//         if (err) return res.json({ success: false, error: err });
//         console.log('get data done!');
//         return res.json({ success: true, data: data });
//     })
// });
//
// // this method adds new data in our database
// router.post('/putData', (req, res) => {
//     // const recipe = new Recipe();
//     //
//     // const { id, publishedDate, newVersion } = req.body;
//     //
//     // if (!id || !publishedDate){
//     //     return res.json({
//     //         success: false,
//     //         error: 'INVALID_INPUTS'
//     //     });
//     // }
//     // recipe.id = id;
//     // recipe.publishedDate = publishedDate;
//     // recipe.versions.push(newVersion)
//     // recipe.save((err) => {
//     //     if (err) return res.json({ success: false, error: err });
//     //     console.log('add data done!');
//     //     return res.json({ success: true });
//     // });
//     const { id, publishedDate, newVersion } = req.body;
//     const newRecipe = {
//         id: id,
//         publishedDate: publishedDate,
//         versions: newVersion
//     }
//     Recipe.create(newRecipe, (err, recipe) => {
//         if (err) return res.json({ success: false, error: err });
//         console.log('add data done!');
//         return res.json({ success: true });
//     })
// });
//
// // this method overwrites existing data in our database
// router.post('/updatedData', (req, res) => {
//     const { id, newVersion } = req.body;
//     Recipe
//         .findOne({id: id})
//         .exec(
//             (err, recipe) => {
//                 if (err) return res.json({ success: false, error: err });
//                 recipe.versions.unshift(newVersion);
//                 recipe.save(
//                     (err) => {
//                         if (err) return res.json({ success: false, error: err });
//                         console.log('updated done!');
//                         return res.json({ success: true });
//                     }
//                 );
//             }
//         )
// });
//
// // this method removes existing data in our database
// router.delete('/deleteData', (req, res) => {
//     const { id } = req.body;
//     Recipe.findByIdAndRemove(id, (err) => {
//         if (err) return res.send(err);
//         return res.json({ success: true });
//     });
// });



// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING_ON_PORT_${API_PORT}`));





















/////////////////////////////
