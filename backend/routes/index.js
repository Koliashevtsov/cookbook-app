const express = require('express');
const router = express.Router();

const recipeControllers = require('../controllers/recipe-controllers');

router.get('/get-all-recipes', recipeControllers.getAllRecipes);
router.post('/add-new-recipe', recipeControllers.addNewRecipe);
router.put('/add-new-verion', recipeControllers.addNewVersion);

module.exports = router;
