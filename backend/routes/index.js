const express = require('express');
const router = express.Router();
const jwt = require('express-jwt');
const auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload'
})

const recipeControllers = require('../controllers/recipe-controllers');
const ctrlAuth = require('../controllers/authentication');

router.get('/get-all-recipes', recipeControllers.getAllRecipes);
router.post('/add-new-recipe', auth, recipeControllers.addNewRecipe);
router.put('/add-new-verion', auth, recipeControllers.addNewVersion);
router.delete('/delete/recipe/:recipeId/version/:versionId', auth, recipeControllers.deleteItem);

//authentication
router.post('/sign-up', ctrlAuth.register);
router.post('/sign-in', ctrlAuth.login);

module.exports = router;
