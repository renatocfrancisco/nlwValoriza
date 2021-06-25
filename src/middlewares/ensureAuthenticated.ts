import { Request, Response, NextFunction} from "express";
import { verify } from "jsonwebtoken";

interface IPayLoad {
    sub: string;
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction){
    
    //Receber Token
    const authToken = request.headers.authorization;

    //Validar se Token está preenchido
    if(!authToken){
        return response.status(401).end();
    }

    const [,token] = authToken.split(" "); // ["Bearer", "token"]

    try {
        //Validar se Token é valído
        const { sub } = verify(token, "157c4e7b178ab4db366136d60ec4809c") as IPayLoad;
        
        //Recuperar Informações do Usuário
        request.user_id = sub;
        
        return next();
        
    }catch(err){
        return response.status(401).end();
    }

}