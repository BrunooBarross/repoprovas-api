import { faker } from "@faker-js/faker";

export async function testBody() {
    return {
        name: 'Prova teste',
        pdfUrl: 'http://www.google.com.br',
        categoryName: 'Feita',
        disciplineId: 1,
        teacherId: 1
    }
}