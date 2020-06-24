import mongoose from 'mongoose'

import { app } from './app'

const port = 3000

const startServerAsync = async () => {

    // Assure the JWT_KEY env was defined in the cluster
        // Secret is defined imperatively with "kubectl create secret generic"
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


