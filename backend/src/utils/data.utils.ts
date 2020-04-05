import { Paginated } from '@feathersjs/feathers';
import { omit as _omit, pick as _pick } from 'lodash';
import sift from 'sift';

import { TypeUtils } from './type.utils';

export namespace DataUtils {

    export function omitFactory(...fields: string[]): any {
        return (current: any) => {
            if (typeof current !== 'object' || Array.isArray(current)) {
                // prevent changes to other structures such as array of custom services
                return current;
            }
            const data = 'function' === typeof current.toJSON ? current.toJSON() : current;
            return _omit(data, fields);
        }
    }

    export function pickFactory(...fields: string[]): any {
        return (current: any) => {
            if (typeof current !== 'object' || Array.isArray(current)) {
                // prevent changes to other structures such as array of custom services
                return current;
            }
            const data = 'function' === typeof current.toJSON ? current.toJSON() : current;
            return _pick(data, fields);
        }
    }

    export function map<T, S>(value: T, mapFn: (element: T, index: number, array: T[]) => S): S;
    export function map<T, S>(value: T[], mapFn: (element: T, index: number, array: T[]) => S): S[];
    export function map<T, S>(value: Paginated<T>, mapFn: (element: T, index: number, array: T[]) => S): Paginated<S>;
    export function map<T, S>(value: T | T[] | Paginated<T>, mapFn: (element: T, index: number, array: T[]) => S): S | S[] | Paginated<S> {
        if (Array.isArray(value)) {
            return value.map(mapFn);
        } else if (TypeUtils.isPaginatedLike(value)) {
            return {
                ...value,
                data: value.data.map(mapFn)
            };
        }

        return mapFn(value, 0, [ value ]);
    }

    export function forEach<T, S>(value: T | T[] | Paginated<T>, mapFn: (element: T, index: number, array: T[]) => any): void {
        if (Array.isArray(value)) {
            value.forEach(mapFn);
        } else if (TypeUtils.isPaginatedLike(value)) {
            value.data.forEach(mapFn);
        } else {
            mapFn(value, 0, [ value ]);
        }
    }

    export async function forEachAsync<T, S>(value: T | T[] | Paginated<T>,
                                             mapFn: (element: T, index: number, array: T[]) => Promise<any>): Promise<void> {
        if (Array.isArray(value)) {
            for (const [ index, element ] of value.entries()) {
                await mapFn(element, index, value);
            }
        } else if (TypeUtils.isPaginatedLike(value)) {
            for (const [ index, element ] of value.data.entries()) {
                await mapFn(element, index, value.data);
            }
        } else {
            await mapFn(value, 0, [ value ]);
        }
    }

    export function isValid(data: any, query: any) {
        const matcher = sift(query);
        return matcher(data);
    }
}
