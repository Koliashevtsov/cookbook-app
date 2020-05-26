import axios from 'axios';

class CookbookService {

    async getRecipesList() {
        const res = await axios.get('http://localhost:3001/api/get-all-recipes');
        const body = res
        console.log('getRecipesList ===>>>', body);
        return body;
    }

    addNewRecipe(title, imageUrl, descr) {
        const localStrInJSON = window.localStorage.getItem('redux');
        const token = JSON.parse(localStrInJSON).auth.jwtToken;
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
        return axios.post('http://localhost:3001/api/add-new-recipe', newRecipe,
            {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            }
        )

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

    register(data){
        const { username, email, password } = data;
        return axios.post('http://localhost:3001/api/sign-up', {
            username,
            email,
            password
        });
    }
    login(data){
        const { email, password } = data;
        return axios.post('http://localhost:3001/api/sign-in', {
            email,
            password
        })
    }

}
export default CookbookService;
