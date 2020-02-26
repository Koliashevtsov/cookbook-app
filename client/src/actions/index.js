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
const fetchRecipes = (cookbookService, dispatch) => () => {
    cookbookService.getRecipesList()
        .then(data => dispatch(reciresListLoaded(data)))
        .catch(err => dispatch(recipesListError(err)))
}

export {
    fetchRecipes,
    getCurrentVersion
}
