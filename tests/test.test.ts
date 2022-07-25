import supertest from "supertest";
import app from "../src/app.js";
import prisma from "../src/db.js"
import { selectTest, testBody } from "./factories/testFactory.js"
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
    const findTest = await selectTest(body);
    const status = result.status;
    expect(status).toEqual(201);
    expect(findTest).not.toBeNull();
  });
});

describe("GET /test", () => {
  it("Returns 200 if you search for tests by subjects", async () => {
    const bodyUser = userBody();
    await insertUser(bodyUser);
    const resultUser = await supertest(app).post("/sign-in").send(bodyUser);
    
    const body = await testBody();
    const result = await supertest(app).get("/tests?groupBy=disciplines").set('Authorization', resultUser.body.token).send(body);
    const status = result.status;
    expect(status).toEqual(200);
    expect(result.body.tests.length).toBeGreaterThan(0);
  });

  it("Returns 200 if you search for tests by teachers", async () => {
    const bodyUser = userBody();
    await insertUser(bodyUser);
    const resultUser = await supertest(app).post("/sign-in").send(bodyUser);
    
    const body = await testBody();
    const result = await supertest(app).get("/tests?groupBy=teachers").set('Authorization', resultUser.body.token).send(body);
    const status = result.status;
    expect(status).toEqual(200);
    expect(result.body.tests.length).toBeGreaterThan(0);
  });

  it("Returns 422 when group by is incorrec", async () => {
    const bodyUser = userBody();
    await insertUser(bodyUser);
    const resultUser = await supertest(app).post("/sign-in").send(bodyUser);
    
    const body = await testBody();
    const result = await supertest(app).get("/tests?groupBy=fghfgh").set('Authorization', resultUser.body.token).send(body);
    const status = result.status;
    expect(status).toEqual(422);
  });
})