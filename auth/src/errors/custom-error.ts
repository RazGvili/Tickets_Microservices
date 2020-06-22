// Use abstract class
/** 
 * Cannot be instantiated
 * Used to setup requirements for subclasses
 * Allow the use of 'instanceof' in JS 
 */

export abstract class CustomError extends Error {
    abstract statusCode: number

    // message property in constructor for logging  
    constructor(message: string) {
        super(message)

        // Add when extending a built in JS class
        Object.setPrototypeOf(this, CustomError.prototype)
    }

    abstract serializeErrors(): { message: string; field?: string }[]
}