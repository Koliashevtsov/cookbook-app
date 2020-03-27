import axios from 'axios';

class CookbookService {

    getRandomId(min, max) {
        const int = Math.floor(Math.random() * (max - min + 1)) + min;
        return int.toString(36);
    }

    async getRecipesList() {
        const res = await axios.get('http://localhost:3001/api/get-all-recipes');
        const body = res
        console.log('getRecipesList ===>>>', body);
        return body;
    }

    addNewRecipe(title, imageUrl, descr) {
        const id = this.getRandomId(0, 1000000);
        const publishedDate = Date.now();
        const updatedDate = publishedDate;
        const newVersion = {
            title: title,
            imageUrl: imageUrl,
            descriptions: descr,
            updatedDate: updatedDate
        }

        const newRecipe = {
            id: id,
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
        axios.put('http://localhost:3001/api/add-new-verion', {
            id: id,
            newVersion: newVersion
        })
    }

}
export default CookbookService;
