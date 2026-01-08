import type {Request,Response,NextFunction} from 'express';


const iamMiddleware = (req:Request,res:Response,next:NextFunction) => {
    console.log('from middeware')
    next();
}


export {iamMiddleware}