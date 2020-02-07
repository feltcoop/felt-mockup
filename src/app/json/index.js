export const getJsonType = (x) => {
    const xType = typeof x;
    switch (xType) {
        case 'string':
        case 'number':
        case 'boolean':
            return xType;
        case 'object': {
            if (x === null) {
                return 'null';
            }
            else if (Array.isArray(x)) {
                return 'array';
            }
            else {
                return 'object';
            }
        }
        default: {
            // "bigint" | "symbol" | "undefined" | "function"
            throw Error(`Invalid json value type "${xType}"`);
        }
    }
};
