import axios from 'axios';

class CookbookService {


    // getRecipesList(){
    //     return new Promise(
    //         (resolve, rejected) => {
    //             setTimeout(() => {
    //                 resolve(this.list)
    //             }, 1000)
    //         }
    //     );
    // }
    getRandomId(min, max){
        const int = Math.floor(Math.random() * (max - min + 1)) + min;
        return int.toString(36);
    }

    getRecipesList(){
        const body = fetch('http://localhost:3001/api/getData')
                        .then(res => res.json())
        return body;
    }

    addNewRecipe(title, imageUrl, descr){
        const newVersion = {
            title: title,
            imageUrl: imageUrl,
            descriptions: descr
        }
        const id = this.getRandomId(0, 1000000);
        const publishedDate = Date.now();
        const updatedDate = publishedDate;

        const newData = {
            id: id,
            publishedDate: publishedDate,
            listVersions: [
                newVersion
            ]
        }
        console.log('yes or no');
        axios.post('http://localhost:3001/api/putData', newData)
        
    }

}
export default CookbookService;
