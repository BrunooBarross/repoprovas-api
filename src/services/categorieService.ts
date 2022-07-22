import * as categorieRepository from "../repositories/categorieRepository.js"

export async function getCategories(){
    const categories = await categorieRepository.selectAllCategories();
    return categories;
}