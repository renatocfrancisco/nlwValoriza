//import { User } from "../entities/User";
import {getCustomRepository} from "typeorm";
import {UsersRepositories } from "../repositories/UsersRepositories";

interface IUserRequest{
    name: string;
    email: string;
    password: string;
    admin?: boolean;
}

class CreateUserService{
    async execute( {name, email, password, admin} : IUserRequest){
        const usersRepository = getCustomRepository(UsersRepositories) //new UsersRepositories();

        if(!email){
            throw new Error("Email incorrect");
        }

        const userAlreadyExists = await usersRepository.findOne({
            email,
        });

        if(userAlreadyExists){
            throw new Error("User Already Exists");
        }

        const user = usersRepository.create({
            name, email, password, admin
        })

        await usersRepository.save(user);

        return user;
    }
}

export {CreateUserService};