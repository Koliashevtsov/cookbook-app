const getRandomId = (min, max) => {
    const int = Math.floor(Math.random() * (max - min + 1)) + min;
    return int.toString(36);
}

const getCurrentVersion = (state, action) => {
    const list = state.listRecipes;
    console.log(list);
    const recipeId = action.payload[0];
    console.log(recipeId);
    const updatedDate = action.payload[1];

    const itemRecipe = list.find(item => item.id == recipeId);
    const itemVersion = itemRecipe.versions.find(item => {
        return item.updatedDate == updatedDate
    })
    const idxVersion = itemRecipe.versions.findIndex(item => {
        return item.updatedDate == itemVersion.updatedDate;
    })
    console.log(idxVersion);
    const prevVersions = itemRecipe.versions.slice(idxVersion + 1);
    console.log(prevVersions);
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
    const newListVersions = currentRecipe.versions.unshift(newVersion)
    const newRecipe = {
        ...currentRecipe,
        newListVersions
    }
    const newListRecipes = [
        ...state.listRecipes.slice(0, idxCurrentRecipe),
        newRecipe,
        ...state.listRecipes.slice(idxCurrentRecipe + 1)
    ]
    const newPreviousVersions = newListVersions.slice(1)
    return {
        ...state,
        listRecipes: newListRecipes,
        currentVersion: newVersion,
        previousVersions: newPreviousVersions
    }
}
// const addNewRecipe = (state, action) => {
//     const list = state.listRecipes;
//     const id = getRandomId(0, 1000000);
//     const publishedDate = Date.now();
//     const updatedDate = publishedDate;
//     const newVersion = {
//         parentId: id,
//         updatedDate: updatedDate,
//         title: action.payload[0],
//         imageUrl: action.payload[1],
//         descriptions: action.payload[2]
//     }
//     const newRecipe = {
//         id: id,
//         publishedDate: publishedDate,
//         versions: [newVersion]
//     }
//     const newListRecipes = [
//         ...list,
//         newRecipe
//     ]
//     return newListRecipes;
// }

const deleteItemVersion = (state, action) => {
    const list = state.listRecipes;
    console.log(list);
    const recipeId = action.payload[0]
    const updatedDate = action.payload[1];
    const idxCurrentRecipe = list.findIndex(item => item.id == recipeId);
    console.log("idxCurrentRecipe", idxCurrentRecipe);
    const currentRecipe = list[idxCurrentRecipe];
    const versions = currentRecipe.versions;

    const idxDeletedVersion = versions.findIndex(item => {
        return item.updatedDate == updatedDate;
    })
    const newListVersions = [
        ...versions.slice(0, idxDeletedVersion),
        ...versions.slice(idxDeletedVersion + 1)
    ]

    const newCurrentRecipe = {
        ...currentRecipe,
        versions: newListVersions
    }

    // data write to store
    const newListRecipes = [
        ...list.slice(0, idxCurrentRecipe),
        newCurrentRecipe,
        ...list.slice(idxCurrentRecipe + 1)
    ]
    // since i deleted currentVersion i must rewrite
    // currentVersion and previousVersions to state
    const newCurrentVersion = newListVersions[0];
    console.log('newCurrentVersion', newCurrentVersion);
    const newPreviousVersions = newListVersions.slice(1)

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
            previousVersions: [],
            postAddRecipeResult: {}
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
        case 'CURRENT_VERSION_SUCCESS':
            return getCurrentVersion(state, action)
        case 'ADD_NEW_VERSION_SUCCESS':
            return addNewVersion(state, action);
        case 'ADD_NEW_RECIPE_SUCCESS':
            return {
                ...state,
                postAddRecipeResult: action.payload
            };
        case 'DELETE_VERSION_SUCCESS':
            return deleteItemVersion(state, action);
        default:
            return state;
    }
}

export default reducer;
