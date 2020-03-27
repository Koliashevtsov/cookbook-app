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
    const { publishedDate, newVersion } = req.body;
    const recipe = new Recipe();
    if(!publishedDate || !newVersion){
        return sendJsonResponse(res, 404, {
            "message": 'requested parameters was not found'
        });
    }
    recipe.publishedDate = publishedDate;
    recipe.versions.push(newVersion);
    recipe.save((err, recipe) => {
        if(err) return sendJsonResponse(res, 400, err);
        return sendJsonResponse(res, 201, recipe);
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
        .findById(id)
        .exec((err, recipe) => {
            if(err) return sendJsonResponse(res, 400, err);
            recipe.versions.unshift(newVersion);
            recipe.save((err, recipe) => {
                if(err) return sendJsonResponse(res, 400, err);
                return sendJsonResponse(res, 200, recipe);
            })
        })
}

module.exports.deleteItem = function (req, res) {
    const { recipeId, versionId } = req.params;
    Recipe
        .findById(recipeId)
        .exec((err, recipe) => {
            if(err) return sendJsonResponse(res, 404, {
                "message": "recipeId was not found"
            });
            if(!recipe.versions.id(versionId)) return sendJsonResponse(res, 404, {
                "message": "versionId was not found"
            });
            if(recipe.versions.length == 1){
                recipe.remove((err, recipe) => {
                    return sendJsonResponse(res, 204, null);
                })
            } else {
                recipe.versions.id(versionId).remove()
                recipe.save((err, recipe) => {
                    if(err) return sendJsonResponse(res, 404, err)
                    return sendJsonResponse(res, 200, recipe);
                })
            }
        })
}
















///
