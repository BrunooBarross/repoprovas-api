import * as userRepository from "../repositories/userRepository.js"
import { UserInsertData } from "../repositories/userRepository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

export async function login(userData: UserInsertData){
    const user =  await getUser(userData.email);
    comparePassword(userData.password, user.password);
    const data = { userId: user.id };
    const config = { expiresIn: 60 * 60 * 72};
    const token = jwt.sign(data, process.env.JWT_SECRET, config);
    return { token: token};
}

async function getUser(email: string){
    const user = await userRepository.findByEmail(email);
    if (!user) {
        throw { type: "not_Found", message: `email ${email} not found`}
    }
    return user;
}

function comparePassword(password: string, encryptedPassword: string){
    if (!bcrypt.compareSync(password, encryptedPassword)){
        throw { type: "unauthorized", message: "incorrect password"}
    }
}