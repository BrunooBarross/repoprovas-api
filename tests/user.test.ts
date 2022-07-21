import supertest from "supertest";
import app from "../src/app.js";
import prisma from "../src/db.js"
import { userBody } from "./factories/userFactory.js"

beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE users;`;
});
afterAll(async () => {
    await prisma.$disconnect();
});
  

describe("POST /sign-up", () => {
  it("returns 201 for valid create user", async () => {
    const body = userBody();
    console.log(body)
    const result = await supertest(app).post("/sign-up").send(body);
    const status = result.status;
      
    const user = await prisma.users.findUnique({
        where: { email: body.email }
    });
    expect(status).toEqual(201);
	expect(user).not.toBeNull();
  });
});