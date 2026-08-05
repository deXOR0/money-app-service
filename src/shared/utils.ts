import { camelCase, snakeCase } from 'lodash';

export function deepMapKeys(
    obj: any,
    transformer: (key: string) => string,
): any {
    // 1. Handle primitive values, null, and undefined
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    // 2. Handle arrays smoothly
    if (Array.isArray(obj)) {
        return obj.map((val) => deepMapKeys(val, transformer));
    }

    // 3. Prevent rewriting special built-in object instances
    if (obj instanceof Date || obj instanceof RegExp || obj instanceof Buffer) {
        return obj;
    }

    // 4. Safely extract keys from raw JSON, DTO classes, and DB entities
    const result: Record<string, any> = {};

    for (const key of Object.keys(obj)) {
        const transformedKey = transformer(key);
        result[transformedKey] = deepMapKeys(obj[key], transformer);
    }

    return result;
}

export const toCamel = (obj: any) => deepMapKeys(obj, camelCase);
export const toSnake = (obj: any) => deepMapKeys(obj, snakeCase);
