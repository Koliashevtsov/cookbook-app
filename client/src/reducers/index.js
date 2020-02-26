const getCurrentVersion = (state, action) => {
    const list = state.listRecipes;
    const recipeId = action.payload[0]
    const date = action.payload[1];

    const itemRecipe = list.find(item => item.id === recipeId)

    const itemVersion = itemRecipe.listVersions.find(item => {
        return item.updatedDate === date
    })
    const idxVersion = itemRecipe.listVersions.findIndex(item => {
        return item.updatedDate === itemVersion.updatedDate;
    })
    
    const prevVersions = itemRecipe.listVersions.slice(idxVersion + 1);
    return {
        ...state,
        currentVersion: itemVersion,
        previousVersions: prevVersions
    };
}

const reducer = (state, action) => {
    console.log(action.type);
    if (state === undefined){
        return {
            listRecipes: [],
            currentVersion: {},
            previousVersions: []
        };
    }

    switch (action.type) {
        case 'FETCH_LIST_SUCCESS':
            return {
                ...state,
                listRecipes: action.payload
            };
        case 'FETCH_LIST_FAILURE':
            console.log('ERROR');
        case 'CURRENT_RECIPE_SUCCESS':
            return getCurrentVersion(state, action)
        default:
            return state;
    }
}

export default reducer;
