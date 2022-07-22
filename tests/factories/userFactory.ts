import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";
import prisma from "../../src/db.js";
import { UserInsertData } from "../../src/repositories/userRepository.js";

export function userBody(): UserInsertData {
  return {
    email: faker.internet.email(),
    password: faker.internet.password()
  };
}

export async function insertUser(data: UserInsertData){
  await prisma.users.create({
    data:{
        email: data.email,
        password: bcrypt.hashSync(data.password, 10)
    }
  })
}

const userFactory = {
  userBody,
  insertUser
}

export default userFactory;