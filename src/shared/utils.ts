import { jwtDecode, JwtPayload } from 'jwt-decode';
import { camelCase, snakeCase } from 'lodash';

export function decodeToken(token: string): JwtPayload {
    return jwtDecode(token);
}

export function deepMapKeys(
    obj: any,
    transformer: (key: string) => string,
): any {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    if (Array.isArray(obj)) {
        return obj.map((val) => deepMapKeys(val, transformer));
    }

    if (obj instanceof Date || obj instanceof RegExp || obj instanceof Buffer) {
        return obj;
    }

    const result: Record<string, any> = {};

    for (const key of Object.keys(obj)) {
        const transformedKey = transformer(key);
        result[transformedKey] = deepMapKeys(obj[key], transformer);
    }

    return result;
}

export const toCamel = (obj: any) => deepMapKeys(obj, camelCase);
export const toSnake = (obj: any) => deepMapKeys(obj, snakeCase);
