import supertest from "supertest";
import app from "../src/app.js";
import prisma from "../src/db.js"
import { testBody } from "./factories/testFactory.js"
import { userBody, insertUser } from "./factories/userFactory.js"

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE tests;`;
});
afterAll(async () => {
  await prisma.$disconnect();
});

describe("POST /test", () => {
  it("returns 401 if not sent a token", async () => {
    const body = {};
    const result = await supertest(app).post("/test").send(body);
    const status = result.status;
    expect(status).toEqual(401);
  });

  it("returns 422 if the body is not correct", async () => {
    const bodyUser = userBody();
    await insertUser(bodyUser);
    const resultUser = await supertest(app).post("/sign-in").send(bodyUser);
    const statusUser = resultUser.status;

    const body = { "teste": "teste" };
    const result = await supertest(app).post("/test").set('Authorization', resultUser.body.token).send(body);
    const status = result.status;
    expect(statusUser).toEqual(200);
    expect(status).toEqual(422);
    expect(resultUser.body.token.length).toBeGreaterThan(0);
  });

  it("returns 401 if there is no teacher or subject id", async () => {
    const bodyUser = userBody();
    await insertUser(bodyUser);
    const resultUser = await supertest(app).post("/sign-in").send(bodyUser);

    const body = await testBody();
    body.teacherId = 1000;

    const result = await supertest(app).post("/test").set('Authorization', resultUser.body.token).send(body);
    const status = result.status;
    expect(status).toEqual(401);
  });

  it("Return 201 if created test", async () => {
    const bodyUser = userBody();
    await insertUser(bodyUser);
    const resultUser = await supertest(app).post("/sign-in").send(bodyUser);

    const body = await testBody();
    const result = await supertest(app).post("/test").set('Authorization', resultUser.body.token).send(body);
    const status = result.status;
    expect(status).toEqual(201);
  });
});