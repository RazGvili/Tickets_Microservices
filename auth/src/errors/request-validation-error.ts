import { ValidationError } from 'express-validator'
import { CustomError } from "./custom-error"

export class RequestValidationError extends CustomError {

    statusCode = 400

    // ValidationError will return an array of errors. 
    constructor( public errors: ValidationError[] ) {
        super("Invalid req params")

        // Add when extending a built in JS class
        Object.setPrototypeOf(this, RequestValidationError.prototype)
    }

    serializeErrors() {
        return this.errors.map(err => {
            return { message: err.msg, field: err.param }
        })
    }
}