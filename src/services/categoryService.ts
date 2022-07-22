import * as categoryRepository from "../repositories/categoryRepository.js"

export async function getCategories(){
    const categories = await categoryRepository.selectAllCategories();
    return categories;
}