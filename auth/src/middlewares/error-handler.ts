import { Request, Response, NextFunction } from 'express'
import { CustomError } from "../errors/custom-error"


// Goal: consistent errors from all services
export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    
    if (err instanceof CustomError) {
        return res.status(err.statusCode).send({errors: err.serializeErrors()})
    }
    
    res.status(400).send({errors: [{message: 'Oops!'}]})
}