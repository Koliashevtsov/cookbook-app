import axios from 'axios';

class CookbookService {

    async getRecipesList() {
        const res = await axios.get('http://localhost:3001/api/get-all-recipes');
        const body = res
        console.log('getRecipesList ===>>>', body);
        return body;
    }

    addNewRecipe(title, imageUrl, descr) {
        const publishedDate = Date.now();
        const updatedDate = publishedDate;
        const newVersion = {
            title: title,
            imageUrl: imageUrl,
            descriptions: descr,
            updatedDate: updatedDate
        }

        const newRecipe = {
            publishedDate: publishedDate,
            newVersion: newVersion
        }
        return axios.post('http://localhost:3001/api/add-new-recipe', newRecipe)

    }

    addNewVersion(title, imageUrl, descr, recipeId) {
        const id = recipeId;
        const updatedDate = Date.now();
        const newVersion = {
            title: title,
            imageUrl: imageUrl,
            descriptions: descr,
            updatedDate: updatedDate
        }
        return axios.put('http://localhost:3001/api/add-new-verion', {
            id: id,
            newVersion: newVersion
        })
    }

    deleteItem(recipeId, versionId){
        const url = `http://localhost:3001/api/delete/recipe/${recipeId}/version/${versionId}`
        return axios.delete(url);
    }

}
export default CookbookService;
