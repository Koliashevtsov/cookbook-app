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
const getCurrentRecipe = (recipeId) => {
    return {
        type: 'CURRENT_RECIPE_GOT',
        payload: recipeId
    };
}
const getCurrentVersion = (versionId) => {
    return {
        type: 'CURRENT_VERSION_GOT',
        payload: versionId
    };
}
const itemDeleted = (itemRecipe) => {
    return {
        type: 'ITEM_DELETED_SUCCESS',
        payload: itemRecipe
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
            if (body.status == 200) dispatch(reciresListLoaded(body.data));
        })
        .catch(err => dispatch(recipesListError(err)));
}
const deleteItemVersion = (cookbookService) => (recipeId, versionId) => (dispatch) => {
    dispatch(loadingStarted());
    cookbookService.deleteItem(recipeId, versionId)
        .then(body => {
            if(body.status == 200 || body.status == 204){
                dispatch(itemDeleted(body.data));
            }
            dispatch(loadingFinished());
        })
}


export {
    fetchRecipes,
    getCurrentRecipe,
    getCurrentVersion,
    addNewVersion,
    addNewRecipe,
    deleteItemVersion
}
