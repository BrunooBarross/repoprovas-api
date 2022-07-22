import prisma from "../db.js";
import { Tests } from "@prisma/client"; 

export type TestData = Omit<Tests, "id">
export type TestInsertData = Omit<Tests, "id"> & {categoryName: string}

export async function getTeacherDiscipline(id: number){
    const result = await prisma.teacherDisciplines.findFirst({
        where:{
            id
        }
    });
    return result;
}

export async function insertTestBd(data: TestData){
    await prisma.tests.create({
        data:{
            ...data
        }
    });
}