import recipesList from './recipes-list';

class CookbookService {
    constructor(){
        this.list = recipesList
    }

    getRecipesList(){
        return new Promise(
            (resolve, rejected) => {
                setTimeout(() => {
                    resolve(this.list)
                }, 1000)
            }
        );
    }

}
export default CookbookService;
