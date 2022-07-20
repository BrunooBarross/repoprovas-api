import * as userRepository from "../repositories/userRepository.js"
import { UserInsertData } from "../repositories/userRepository.js";
import bcrypt from "bcrypt";

export async function createUser(userData: UserInsertData) {
    await verifyExistUser(userData.email);
    const password = encryptedPassword(userData.password);
    await userRepository.insertUser({ email: userData.email, password });
}

function encryptedPassword(password: string) {
    return bcrypt.hashSync(password, 10);
}

async function verifyExistUser(email: string){
    const existUser = await userRepository.findByEmail(email);
    if (existUser) {
        throw { type: "conflict", message: `email ${email} is already in use`}
    }
}