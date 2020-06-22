import { CustomError } from "./custom-error"

export class DatabaseConnectionError extends CustomError {

    reason = "Error connecting to the DB"
    statusCode = 500

    constructor() {
        super("Error connecting to the DB")

        // Add when extending a built in JS class
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype)
    }

    serializeErrors() {
        return [{message: this.reason}]
    }

}