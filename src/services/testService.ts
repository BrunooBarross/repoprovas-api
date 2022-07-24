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
        throw { type: "unauthorized", message: `there is no teacher and subject linked to the provided ids` };
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

export async function getTestsByQueryParams(queryParams: string) {
    if (queryParams === 'disciplines') {
        const tests = await testRepository.getAllTestsByDiscipline();
        return tests;
    }

    if (queryParams === 'teachers') {
        const tests = await testRepository.getAllTestsByTeachers();
        return tests;
    }

    throw { type: "unprocessable_entity", message: `it is necessary to send a query parameter with the value groupBy=disciplines or groupBy=teachers` };
}