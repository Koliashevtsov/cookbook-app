const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DataSchema = new Schema(
    {
        id: String,
        publishedDate: Number,
        listVersions: Array
    }
)

module.exports = mongoose.model("Data", DataSchema);
