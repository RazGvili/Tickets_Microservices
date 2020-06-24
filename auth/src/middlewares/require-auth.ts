import { Request, Response, NextFunction } from 'express'
import { NotAuthorizedError } from '../errors/not-authorized-error';


// Goal: Block access to auth protected routes / resources 
    // *! Assuming require-auth middleware is AFTER current-user middleware

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    
    if (!req.currentUser) {
        throw new NotAuthorizedError()
    }

    next()
    
}