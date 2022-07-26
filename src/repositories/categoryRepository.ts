import prisma from "../db.js";

export async function selectAllCategories(){
    const result = await prisma.categories.findMany();
    return result;
}

export async function findCategoryByName(name: string){
    const result = await prisma.categories.findFirst({
        where:{
            name:{
                startsWith: name,
                mode: 'insensitive'
            }
        }
    });
    return result;
}

export async function createCategory(name: string){
    const result = await prisma.categories.create({
        data:{
            name
        }
    });
    return result;
}