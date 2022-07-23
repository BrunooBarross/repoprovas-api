import prisma from "../db.js";
import { Tests } from "@prisma/client";

export type TestData = Omit<Tests, "id">
export type TestInsertData = Omit<Tests, "id"> & { categoryName: string, disciplineId: number, teacherId: number }

export async function getTeacherDiscipline(teacherId: number, disciplineId: number) {
    const result = await prisma.teacherDisciplines.findFirst({
        where: {
            teacherId,
            disciplineId
        }
    });
    return result;
}

export async function insertTestBd(data: TestData) {
    await prisma.tests.create({
        data: {
            ...data
        }
    });
}