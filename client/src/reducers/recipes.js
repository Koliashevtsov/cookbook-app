const getCurrentRecipe = (state, action) => {
    const list = state.listRecipes;
    const recipeId = action.payload;
    const itemRecipe = list.find(item => item._id == recipeId);
    return itemRecipe
}
const getCurrentVersion = (state, action) => {
    const currentRecipe = state.currentRecipe;
    const versionId = action.payload;
    const itemVersion = currentRecipe.versions.find(item => item._id == versionId);
    const idxItemVersion = currentRecipe.versions.findIndex(item => item._id == itemVersion._id);
    const prevVersions = currentRecipe.versions.slice(idxItemVersion + 1);
    return {
        ...state,
        currentVersion: itemVersion,
        previousVersions: prevVersions
    };
}
const deleteItem = (state, action) => {
    const itemRecipe = action.payload;
    return {
        ...state,
        currentRecipe: itemRecipe
    };
}

const recipes = (state, action) => {
    console.log(action.type);
    if (state === undefined){
        return {
            listRecipes: [],
            currentRecipe: {},
            currentVersion: {},
            previousVersions: [],
            loadingIndicator: false,
        };
    }

    switch (action.type) {
        case 'FETCH_LIST_SUCCESS':
            return {
                ...state,
                listRecipes: action.payload
            };
        case 'FETCH_LIST_FAILURE':
            console.log(`ERROR throw FETCH_LIST_FAILURE, ${action.payload}`);
        case 'CURRENT_RECIPE_GOT':
            return {
                ...state,
                currentRecipe: getCurrentRecipe(state, action)
            };
        case 'CURRENT_VERSION_GOT':
            return getCurrentVersion(state, action);
        case 'ITEM_DELETED_SUCCESS':
            return deleteItem(state, action);
        case 'LOADING_STARTED':
            return {
                ...state,
                loadingIndicator: true
            };
        case 'LOADING_FINISHED':
            return {
                ...state,
                loadingIndicator: false
            };
        default:
            return state;
    }
}

export default recipes;
