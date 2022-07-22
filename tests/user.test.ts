import supertest from "supertest";
import app from "../src/app.js";
import prisma from "../src/db.js"
import { userBody, insertUser } from "./factories/userFactory.js"

beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE users;`;
});
afterAll(async () => {
    await prisma.$disconnect();
});
  

describe("POST /sign-up", () => {
  it("returns 201 for valid create user", async () => {
    const body = userBody();
    const result = await supertest(app).post("/sign-up").send(body);
    const status = result.status;
    const user = await prisma.users.findUnique({
        where: { email: body.email }
    });
    expect(status).toEqual(201);
    expect(user).not.toBeNull();
  });

  it("returns 422 for invalid create user with wrong password", async () => {
    const body = userBody();
    const result = await supertest(app).post("/sign-up").send({...body, "passwordConfirmation":"algumPasword"});
    const status = result.status;
    const user = await prisma.users.findUnique({
        where: { email: body.email }
    });
    expect(status).toEqual(422);
    expect(user).toBeNull();
  });

  it("returns 409 if there is already a user in the database", async () => {
    const body = userBody();
    const result = await supertest(app).post("/sign-up").send(body);
    const newResult = await supertest(app).post("/sign-up").send(body);
    const status = newResult.status;
    const user = await prisma.users.findUnique({
        where: { email: body.email }
    });
    expect(status).toEqual(409);
    expect(user).not.toBeNull();
  });
});

describe ("POST /sign-in", ()=>{
  it("return status 200 and token for response", async()=>{
    const body = userBody();
    console.log(body);
    await insertUser(body);

    const response = await supertest(app).post('/sign-in').send(body);
    const status = response.status;

    expect(status).toEqual(200);
    expect(typeof response.body.token).toEqual('string');
    expect(response.body.token.length).toBeGreaterThan(0);
  
  })
  it("return status 404 if there is no user with registered email", async()=>{
    const body = userBody();
    const response = await supertest(app).post('/sign-in').send(body);
    const status = response.status;

    expect(status).toEqual(404);
  })
  it("return status 422 if request body is not correct", async()=>{
    const body = {};
    const response = await supertest(app).post('/sign-in').send(body);
    const status = response.status;

    expect(status).toEqual(422);
  })
})