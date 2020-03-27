const reciresListLoaded = (recipesList) => {
    return {
        type: 'FETCH_LIST_SUCCESS',
        payload: recipesList
    };
}
const recipesListError = (err) => {
    console.log('error ocured', err);
    return {
        type: 'FETCH_LIST_FAILURE',
        payload: err
    };
}
const getCurrentVersion = (parentId, updatedDate) => {
    return {
        type: 'CURRENT_VERSION_SUCCESS',
        payload: [parentId, updatedDate]
    };
}
const newRecipeAdded = (response) => {
    return {
        type: 'ADD_NEW_RECIPE_SUCCESS',
        payload: response
    }
}
const addNewVersion = (cookbookService) => (title, imageUrl, descr, recipeId) => () => {
    console.log('recipeId', recipeId);
    cookbookService.addNewVersion(title, imageUrl, descr, recipeId);
}
const deleteItemVersion = (parentId, updatedDate) => {
    return {
        type: 'DELETE_VERSION_SUCCESS',
        payload: [parentId, updatedDate]
    };
}
const addNewRecipe = (cookbookService, dispatch) => (title, imageUrl, descr) => () => {
    const promise = cookbookService.addNewRecipe(title, imageUrl, descr)
    dispatch(newRecipeAdded(promise))

}
const fetchRecipes = (cookbookService, dispatch) => () => {
    cookbookService.getRecipesList()
        .then(body => {
            console.log('body', body);
            if (body.status == 200) dispatch(reciresListLoaded(body.data))
        })
        .catch(err => dispatch(recipesListError(err)))
}

export {
    fetchRecipes,
    getCurrentVersion,
    addNewVersion,
    addNewRecipe,
    deleteItemVersion
}
