import supertest from "supertest";
import app from "../src/app.js";
import { userBody, insertUser } from "./factories/userFactory.js"

describe("GET /categories", () => {
    it("returns status 200 with categories in response body", async () => {
        const bodyUser = userBody();
        await insertUser(bodyUser);
        const resultUser = await supertest(app).post("/sign-in").send(bodyUser);
        
        const result = await supertest(app).get("/categories").set('Authorization', resultUser.body.token).send();
        const status = result.status;
        expect(status).toEqual(200);
        expect(result.body.categories.length).toBeGreaterThan(0);
    });

    it("returns 401 if not sent a token", async () => {
        const result = await supertest(app).get("/categories").send();
        const status = result.status;
        expect(status).toEqual(401);
    });
});