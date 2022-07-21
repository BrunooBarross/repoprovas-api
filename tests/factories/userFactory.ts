import { faker } from "@faker-js/faker";
import { UserInsertData } from "../../src/repositories/userRepository.js";

export function userBody(): UserInsertData {
  return {
    email: faker.internet.email(),
    password: faker.internet.password()
  };
}

const userFactory = {
  userBody
}

export default userFactory;