import { TestInsertData } from "../repositories/testRepository.js";
import * as testRepository from "../repositories/testRepository.js"
import * as categoryRepository from "../repositories/categoryRepository.js"

export async function createTests(data: TestInsertData) {
    const teacherDisciplineId = await verifyExistsTeachersDisciplines(data.disciplineId, data.teacherId);
    const categoryId = await verifyExistsCategory(data.categoryName);
    await testRepository.insertTestBd({
        name: data.name,
        pdfUrl: data.pdfUrl,
        categoryId,
        teacherDisciplineId
    });
}

async function verifyExistsTeachersDisciplines(teacherId: number, disciplineId: number) {
    const consult = await testRepository.getTeacherDiscipline(teacherId, disciplineId);
    if (!consult) {
        throw { type: "unauthorized", message: `there is no teacher and subject linked to the provided ids` }
    }
    return consult.id
}

async function verifyExistsCategory(categoryName: string) {
    const category = await categoryRepository.findCategoryByName(categoryName);
    if (category) {
        return category.id;
    }
    const insertCategory = await categoryRepository.createCategory(categoryName);
    return insertCategory.id;
}