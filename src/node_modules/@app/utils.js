export class UnreachableError extends Error {
    constructor(value, message = `Unreachable case: ${value}`) {
        super(message);
    }
}
