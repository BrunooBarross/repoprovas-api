import prisma from "../../src/db.js"

export async function testBody() {
    return {
        name: 'Prova teste',
        pdfUrl: 'http://www.google.com.br',
        categoryName: 'Feita',
        disciplineId: 1,
        teacherId: 1
    }
}

export async function selectTest(data: any){
    const result = await prisma.tests.findFirst({
        where:{
            name: data.name,
            pdfUrl: data.pdfUrl,
            categoryId: data.categoryId,
            teacherDisciplineId: data.teacherDisciplineId
        }
    });
    return result;
}