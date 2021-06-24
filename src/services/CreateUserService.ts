//import { User } from "../entities/User";
import {getCustomRepository} from "typeorm";
import {UsersRepositories } from "../repositories/UsersRepositories";
import {hash} from "bcryptjs";

interface IUserRequest{
    name: string;
    email: string;
    password: string;
    admin?: boolean;
}

class CreateUserService{
    async execute( {name, email, password, admin = false} : IUserRequest){
        const usersRepository = getCustomRepository(UsersRepositories) //new UsersRepositories();

        if(!email){
            throw new Error("Email Required");
        }

        const userAlreadyExists = await usersRepository.findOne({
            email,
        });

        if(userAlreadyExists){
            throw new Error("User Already Exists");
        }

        //Hash
        const passwordHash = await hash(password, 8);

        const user = usersRepository.create({
            name,
            email, 
            password: passwordHash, 
            admin,
        })

        await usersRepository.save(user);

        return user;
    }
}

export {CreateUserService};