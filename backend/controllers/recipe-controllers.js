const Recipe = require('../models/recipe');

const sendJsonResponse = function (res, status, content) {
    res.status(status);
    res.json(content);
}

module.exports.getAllRecipes = function (req, res) {
    Recipe
        .find()
        .exec((err, recipes) => {
            if(err) return sendJsonResponse(res, 404, err);
            return sendJsonResponse(res, 200, recipes);
        })
}

module.exports.addNewRecipe = function (req, res) {
    const { id, publishedDate, newVersion } = req.body;
    const recipe = new Recipe();
    if(!id || !publishedDate || !newVersion){
        return sendJsonResponse(res, 404, {
            "message": 'requested parameters was not found'
        });
    }
    recipe.id = id;
    recipe.publishedDate = publishedDate;
    recipe.versions.push(newVersion);
    recipe.save((err, recipe) => {
        if(err) return sendJsonResponse(res, 400, err);
        return sendJsonResponse(res, 200, recipe);
    })
}

module.exports.addNewVersion = function (req, res) {
    const { id, newVersion } = req.body;
    if(!id || !newVersion){
        return sendJsonResponse(res, 404, {
            "message": 'requested parameters was not found'
        });
    };
    Recipe
        .findOne({id: id})
        .exec((err, recipe) => {
            if(err) return sendJsonResponse(res, 400, err);
            recipe.versions.unshift(newVersion);
            recipe.save((err, recipe) => {
                if(err) return sendJsonResponse(res, 400, err);
                return sendJsonResponse(res, 200, recipe);
            })
        })
}
