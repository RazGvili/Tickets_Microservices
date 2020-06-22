import { CustomError } from "./custom-error"

export class BadRequestError extends CustomError {

    statusCode = 400
    
    constructor(message: string) {
        super(message)

        // Add when extending a built in JS class
        Object.setPrototypeOf(this, BadRequestError.prototype)
    }

    serializeErrors() {
        return [{message: this.message}]
    }
}