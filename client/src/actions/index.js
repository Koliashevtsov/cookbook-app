const reciresListLoaded = (recipesList) => {
    return {
        type: 'FETCH_LIST_SUCCESS',
        payload: recipesList
    };
}
const recipesListError = (err) => {
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
const addNewVersion = (title, imageUrl, descr) => {
    return {
        type: 'ADD_NEW_VERSION_SUCCESS',
        payload: [title, imageUrl, descr]
    };
}
const deleteItemVersion = (parentId, updatedDate) => {
    return {
        type: 'DELETE_VERSION_SUCCESS',
        payload: [parentId, updatedDate]
    };
}
const addNewRecipe = (cookbookService) => (title, imageUrl, descr) => () => {
    cookbookService.addNewRecipe(title, imageUrl, descr);
}
const fetchRecipes = (cookbookService, dispatch) => () => {
    cookbookService.getRecipesList()
        .then(data => {
            console.log('data', data);
            dispatch(reciresListLoaded(data))
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
