const loadingStarted = () => {
    return {
        type: 'LOADING_STARTED'
    };
}
const loadingFinished = () => {
    return {
        type: 'LOADING_FINISHED'
    };
}
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
const getCurrentVersion = (recipeId, updatedDate) => {
    return {
        type: 'CURRENT_VERSION_SUCCESS',
        payload: [recipeId, updatedDate]
    };
}

const addNewVersion = (cookbookService) => (title, imageUrl, descr, recipeId) => (dispatch) => {
    dispatch(loadingStarted());
    cookbookService.addNewVersion(title, imageUrl, descr, recipeId)
        .then(body => {
            if(body.status == 200) dispatch(loadingFinished())
        })
}

const addNewRecipe = (cookbookService) => (title, imageUrl, descr) => (dispatch) => {
    dispatch(loadingStarted());
    cookbookService.addNewRecipe(title, imageUrl, descr)
        .then(body => {
            if(body.status == 201) dispatch(loadingFinished())
        })

}
const fetchRecipes = (cookbookService, dispatch) => () => {
    cookbookService.getRecipesList()
        .then(body => {
            if (body.status == 200) dispatch(reciresListLoaded(body.data))
        })
        .catch(err => dispatch(recipesListError(err)))
}
const deleteItemVersion = (cookbookService) => (recipeId, versionId) => (dispatch) => {
    cookbookService.deleteItem(recipeId, versionId)
        .then(body => {
            if(body.status == 204) console.log('recipe_deleted');
            if(body.status == 200) console.log(body.data)
        })
}

export {
    fetchRecipes,
    getCurrentVersion,
    addNewVersion,
    addNewRecipe,
    deleteItemVersion
}
