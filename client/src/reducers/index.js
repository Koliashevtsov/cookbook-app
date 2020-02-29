const getRandomId = (min, max) => {
    const int = Math.floor(Math.random() * (max - min + 1)) + min;
    return int.toString(36);
}

const getCurrentVersion = (state, action) => {
    const list = state.listRecipes;
    const recipeId = action.payload[0]
    const updatedDate = action.payload[1];

    const itemRecipe = list.find(item => item.id == recipeId);
    const itemVersion = itemRecipe.listVersions.find(item => {
        return item.updatedDate == updatedDate
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

const addNewVersion = (state, action) => {
    const parentId = state.currentVersion.parentId;
    const updatedDate = Date.now();
    const newVersion = {
        parentId: parentId,
        updatedDate: updatedDate,
        title: action.payload[0],
        imageUrl: action.payload[1],
        descriptions: action.payload[2]
    }
    const idCurrentRecipe = parentId;
    const idxCurrentRecipe = state.listRecipes.findIndex(item => item.id === idCurrentRecipe);
    const currentRecipe = state.listRecipes[idxCurrentRecipe];
    const newListVersions = currentRecipe.listVersions.unshift(newVersion)
    const newRecipe = {
        ...currentRecipe,
        newListVersions
    }
    const newListRecipes = [
        ...state.listRecipes.slice(0, idxCurrentRecipe),
        newRecipe,
        ...state.listRecipes.slice(idxCurrentRecipe + 1)
    ]
    return newListRecipes
}
const addNewRecipe = (state, action) => {
    const list = state.listRecipes;
    const id = getRandomId(0, 1000000);
    const publishedDate = Date.now();
    const updatedDate = publishedDate;
    const newVersion = {
        parentId: id,
        updatedDate: updatedDate,
        title: action.payload[0],
        imageUrl: action.payload[1],
        descriptions: action.payload[2]
    }
    const newRecipe = {
        id: id,
        publishedDate: publishedDate,
        listVersions: [newVersion]
    }
    const newListRecipes = [
        ...list,
        newRecipe
    ]
    return newListRecipes;
}

const deleteItemVersion = (state, action) => {
    const list = state.listRecipes;
    console.log(list);
    const recipeId = action.payload[0]
    const updatedDate = action.payload[1];
    const idxCurrentRecipe = list.findIndex(item => item.id == recipeId);
    console.log("idxCurrentRecipe", idxCurrentRecipe);
    const currentRecipe = list[idxCurrentRecipe];
    const listVersions = currentRecipe.listVersions;

    const idxDeletedVersion = listVersions.findIndex(item => {
        return item.updatedDate == updatedDate;
    })
    const newListVersions = [
        ...listVersions.slice(0, idxDeletedVersion),
        ...listVersions.slice(idxDeletedVersion + 1)
    ]

    const newCurrentRecipe = {
        ...currentRecipe,
        listVersions: newListVersions
    }

    // data write to store
    const newListRecipes = [
        ...list.slice(0, idxCurrentRecipe),
        newCurrentRecipe,
        ...list.slice(idxCurrentRecipe + 1)
    ]
    // since i deleted currentVersion i must rewrite
    // currentVersion and previousVersions to state
    const newCurrentVersion = newListVersions[idxDeletedVersion];
    const newPreviousVersions = newListVersions.slice(idxDeletedVersion + 1)

    if(newListVersions.length === 0){
        const newListRecipes = [
            ...list.slice(0, idxCurrentRecipe),
            ...list.slice(idxCurrentRecipe + 1)
        ]
        return {
            ...state,
            listRecipes: newListRecipes,
            currentVersion: newCurrentVersion,
            previousVersions: newPreviousVersions
        };
    }
    return {
        ...state,
        listRecipes: newListRecipes,
        currentVersion: newCurrentVersion,
        previousVersions: newPreviousVersions
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
        case 'CURRENT_VERSION_SUCCESS':
            return getCurrentVersion(state, action)
        case 'ADD_NEW_VERSION_SUCCESS':
            return {
                ...state,
                listRecipes: addNewVersion(state, action)
            };
        case 'ADD_NEW_RECIPE_SUCCESS':
            return {
                ...state,
                listRecipes: addNewRecipe(state, action)
            };
        case 'DELETE_VERSION_SUCCESS':
            return deleteItemVersion(state, action);
        default:
            return state;
    }
}

export default reducer;
