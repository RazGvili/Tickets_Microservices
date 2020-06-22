import express, { Request, Response } from 'express'
import { body, validationResult } from 'express-validator'
import jwt from "jsonwebtoken"

import { User } from '../models/user'

import { validateRequest } from "../middlewares/validate-request"

import { RequestValidationError } from '../errors/request-validation-error'
import { BadRequestError } from '../errors/bad-request-error'

const router = express.Router()

// Use express-validator as middleware 
router.post(
    '/api/users/signup', 
    [
        body('email')
            .isEmail()
            .withMessage('Email must be valid')
        ,
        body('password')
            // Assure no spaces 
            .trim()
            .isLength({min: 7, max: 20})
            .withMessage('Password must be valid')
    ],
    validateRequest,

    async (req: Request, res: Response) => {

        const { email, password } = req.body

        const existingUser = await User.findOne({email})

        if (existingUser) { 
            throw new BadRequestError("Email in use");
        }

        const user = User.build({email, password})
        await user.save()

        // Generate JWT 
        const userJwt = jwt.sign({
            id: user.id,
            email: user.email
        }, process.env.JWT_KEY!)

        // Store JWT on session object 
        // @ts-ignore
        req.session = { 
            jwt: userJwt
        }

        res.status(201).send(user)
    }
)

export { router as signUpRouter }
