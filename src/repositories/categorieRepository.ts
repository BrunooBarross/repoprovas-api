import prisma from "../db.js";
import { Categories } from "@prisma/client"; 

export async function selectAllCategories(){
    const result = await prisma.categories.findMany();
    return result;
}