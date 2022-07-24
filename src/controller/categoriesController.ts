import { Request, Response } from "express";
import * as categoryService from "../services/categoryService.js";

export async function getAllCategories(req: Request, res: Response){
    const categories = await categoryService.getCategories();
    res.status(200).send({categories});
}

export async function test(req: Request, res: Response){
    res.status(200).send(
        {
            "tests": [
              {
                "id": 1,
                "number": 1,
                "disciplines": [
                  {
                    "id": 1,
                    "name": "HTML e CSS",
                    "termId": 1,
                    "teacherDisciplines": [
                      {
                        "teacher": {
                          "id": 1,
                          "name": "Diego Pinho"
                        },
                        "tests": [
                          {
                            "id": 1,
                            "name": "um nome qq",
                            "pdfUrl": "http://encurtador.com.br/gyZ18",
                            "category": {
                              "id": 1,
                              "name": "Projeto"
                            }
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "id": 4,
                    "name": "Humildade",
                    "termId": 1,
                    "teacherDisciplines": [
                      {
                        "teacher": {
                          "id": 2,
                          "name": "Bruna Hamori"
                        },
                        "tests": []
                      }
                    ]
                  }
                ]
              },
              {
                "id": 2,
                "number": 2,
                "disciplines": [
                  {
                    "id": 2,
                    "name": "JavaScript",
                    "termId": 2,
                    "teacherDisciplines": [
                      {
                        "teacher": {
                          "id": 1,
                          "name": "Diego Pinho"
                        },
                        "tests": []
                      }
                    ]
                  },
                  {
                    "id": 5,
                    "name": "Planejamento",
                    "termId": 2,
                    "teacherDisciplines": [
                      {
                        "teacher": {
                          "id": 2,
                          "name": "Bruna Hamori"
                        },
                        "tests": []
                      }
                    ]
                  }
                ]
              },
              {
                "id": 3,
                "number": 3,
                "disciplines": [
                  {
                    "id": 3,
                    "name": "React",
                    "termId": 3,
                    "teacherDisciplines": [
                      {
                        "teacher": {
                          "id": 1,
                          "name": "Diego Pinho"
                        },
                        "tests": []
                      }
                    ]
                  },
                  {
                    "id": 6,
                    "name": "Autoconfiança",
                    "termId": 3,
                    "teacherDisciplines": [
                      {
                        "teacher": {
                          "id": 2,
                          "name": "Bruna Hamori"
                        },
                        "tests": []
                      }
                    ]
                  }
                ]
              },
              {
                "id": 4,
                "number": 4,
                "disciplines": []
              },
              {
                "id": 5,
                "number": 5,
                "disciplines": []
              },
              {
                "id": 6,
                "number": 6,
                "disciplines": []
              }
            ]
          }
    );
}