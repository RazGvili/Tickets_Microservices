import mongoose from 'mongoose'

import { Password } from '../helpers/password'

// User creation interface
interface UserAttrs {
    email: string
    password: string
}

// User doc interface
// List all additional attr
interface UserDoc extends mongoose.Document {
    email: string
    password: string
}

// User model interface
interface UserModel extends mongoose.Model<UserDoc> {

    // A User creation output is UserDoc
    build(attrs: UserAttrs): UserDoc
}

const userSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }

}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id
            delete ret._id
            delete ret.password,
            delete ret.__v
        }
    }
})


// Custom constructor for user model, added to use Typescript capabilities(type checking).
userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs)
}

// Middleware for saving the password securely 
// Access to the user doc via this 
userSchema.pre('save', async function(done) {

    // Hash the password only if new user
    if(this.isModified('password')) {
        const hashedPassword = await Password.toHash(this.get('password'))
        this.set('password', hashedPassword)
    }

    // mongoose hook for next function
    done()

})

const User = mongoose.model<UserDoc, UserModel>('User', userSchema)

export { User }
