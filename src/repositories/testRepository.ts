import prisma from "../db.js";
import { Tests } from "@prisma/client";

export type TestData = Omit<Tests, "id">
export type TestInsertData = Omit<Tests, "id"> & { categoryName: string, disciplineId: number, teacherId: number }

export async function getTeacherDiscipline(teacherId: number, disciplineId: number) {
    const result = await prisma.teachersDisciplines.findFirst({
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

export async function getAllTestsByDiscipline(){
    const result = await prisma.terms.findMany({
        include: {
            disciplines: {
                include: {
                    teacherDisciplines: {
                        select: {
                            teacher: true,
                            tests: {
                                select: {
                                    id: true,
                                    name: true,
                                    pdfUrl: true,
                                    category: {
                                        select: {
                                            id: true,
                                            name: true
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    });
    return result;
}

export async function getAllTestsByTeachers(){
    const result = await prisma.teachersDisciplines.findMany({
        include:{
            discipline:{
                include:{
                    terms: true
                }
            },
            teacher:true,
            tests:{
                include:{
                    category: true
                }
            }
        }
    })

    return result;
}