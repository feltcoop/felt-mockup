export type Json =
	| string
	| number
	| boolean
	| null
	| { [prop: string]: Json }
	| Json[];

export type JsonType =
	| 'string'
	| 'number'
	| 'boolean'
	| 'null'
	| 'object'
	| 'array';

export const getJsonType = (x: Json): JsonType => {
	const xType = typeof x;
	switch (xType) {
		case 'string':
		case 'number':
		case 'boolean':
			return xType;
		case 'object': {
			if (x === null) {
				return 'null';
			} else if (Array.isArray(x)) {
				return 'array';
			} else {
				return 'object';
			}
		}
		default: {
			// "bigint" | "symbol" | "undefined" | "function"
			throw Error(`Invalid json value type "${xType}"`);
		}
	}
};
