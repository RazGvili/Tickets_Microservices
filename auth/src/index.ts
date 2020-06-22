import express from 'express'

// express doesn't add a .catch handler to the Promise returned by middleware
import 'express-async-errors'

import { json } from 'body-parser'
import mongoose from 'mongoose'
import cookieSession from "cookie-session"

import { currentUserRouter } from './routes/current-user'
import { signInRouter } from './routes/signin'
import { signOutRouter } from './routes/signout'
import { signUpRouter } from './routes/signup'
import { errorHandler } from './middlewares/error-handler'
import { NotFoundError } from "./errors/not-found-error"

const port = 3000

const app = express()

// Running behind the nginx-ingress
app.set('trust proxy', true)

app.use(json())
app.use(
    cookieSession({
        // Cancel encryption       
        signed: false,
        secure: true
    })
)


// routes
app.use(currentUserRouter)
app.use(signInRouter)
app.use(signOutRouter)
app.use(signUpRouter)


// 404
app.all('*', () => {
    throw new NotFoundError()
})

app.use(errorHandler)


const startServerAsync = async () => {

    // Assure the JWT_KEY env was defined in the cluster
    if(!process.env.JWT_KEY) {
        throw new Error("JWT_KEY must be defined!");
    }

    try {
        // Connect to the mongo container via the ClusterIP
        // auth is the name of the DB
        await mongoose.connect('mongodb://auth-mongo-service:27017/auth', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        console.log("Connected to MongoDB")
        
    } catch (error) {
        console.error(error);
    }

    app.listen(port, () =>
        console.log(`Example app listening at http://localhost:${port}`)
    )
}

startServerAsync()


