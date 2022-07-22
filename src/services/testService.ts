import { TestInsertData } from "../repositories/testRepository.js";
import * as testRepository from "../repositories/testRepository.js"
import * as categoryRepository from "../repositories/categoryRepository.js"
import * as categoryService from "../services/categoryService.js"

export async function createTests(data: TestInsertData){
    await verifyExistsTeachersDisciplines(data.teacherDisciplineId);
    const categoryId = await verifyExistsCategory(data.categoryName);
    await testRepository.insertTestBd({
        name: data.name,
        pdfUrl: data.pdfUrl,
        categoryId,
        teacherDisciplineId: data.teacherDisciplineId
    });
}

async function verifyExistsTeachersDisciplines(teacherDisciplineId: number){
    const consult = await testRepository.getTeacherDiscipline(teacherDisciplineId);
    if (!consult) {
        throw { type: "unauthorized", message: `there is no teacher and subject linked to the provided ids`}
    }
}

async function verifyExistsCategory(categoryName: string){
    const category = await categoryRepository.findCategoryByName(categoryName);
    if(category){
        return category.id;
    }
    const insertCategory = await categoryRepository.createCategory(categoryName);
    return insertCategory.id;
}