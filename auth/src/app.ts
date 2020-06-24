// *? Export express app on a diff file to allow multiple services testing in parallel with supertest

import express from 'express'

// express doesn't add a .catch handler to the Promise returned by middleware
import 'express-async-errors'

import { json } from 'body-parser'
import cookieSession from "cookie-session"

import { currentUserRouter } from './routes/current-user'
import { signInRouter } from './routes/signin'
import { signOutRouter } from './routes/signout'
import { signUpRouter } from './routes/signup'
import { errorHandler } from './middlewares/error-handler'
import { NotFoundError } from "./errors/not-found-error"

const app = express()

// Running behind the nginx-ingress
app.set('trust proxy', true)

app.use(json())

// Exposes the req.session attr in the req object 
app.use(
    cookieSession({
        // Cancel encryption       
        signed: false,

        // Add cookie only if request is HTTPS 
        secure: process.env.NODE_ENV === 'test' ? false : true
    })
)


// routes
app.use(currentUserRouter)
app.use(signInRouter)
app.use(signUpRouter)
app.use(signOutRouter)


// 404
app.all('*', () => {
    throw new NotFoundError()
})

app.use(errorHandler)

export { app }