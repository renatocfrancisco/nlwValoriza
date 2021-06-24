import { compare, hash } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { getCustomRepository } from "typeorm"
import { UsersRepositories } from "../repositories/UsersRepositories"

interface IAuthenticateRequest{
    email: string;
    password: string;
}

class AuthenticateUserService{
    async execute({email, password}: IAuthenticateRequest){
        const usersRepositories = getCustomRepository(UsersRepositories);
        
        //verificar se e-mail existe
        const user = await usersRepositories.findOne({
            email
        });

        if(!user){
            throw new Error("Email or Password Incorrect");
        }

        //verificar se senha está correta
        const passwordMatch = await compare(password, user.password)

        if(!passwordMatch){
            throw new Error("Email or Password Incorrect");
        }

        //gerar token
        const token = sign({
            email: user.email
        }, "157c4e7b178ab4db366136d60ec4809c",{
            subject: user.id,
            expiresIn: "1d",
        });

        return token;
    }
}

export {AuthenticateUserService}