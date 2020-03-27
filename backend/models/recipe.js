const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const versionSchema = new Schema(
    {
        title: String,
        imageUrl: String,
        descriptions: String,
        updatedDate: Number
    }
)

const recipeSchema = new Schema(
    {
        id: { type: String, unique: true },
        publishedDate: Number,
        versions: [versionSchema]
    }
)

module.exports = mongoose.model("Recipe", recipeSchema);
