export class UnreachableError extends Error {
	constructor(value: never, message = `Unreachable case: ${value}`) {
		super(message);
	}
}
