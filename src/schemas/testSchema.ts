import joi from "joi";
import { TestInsertData } from "../repositories/testRepository";

const testSchema = joi.object<TestInsertData>({
    name: joi.string().required(),
    pdfUrl: joi.string().uri().required(),
    categoryName: joi.string().required(),
    teacherDisciplineId: joi.number().integer().required()
});

export { testSchema };