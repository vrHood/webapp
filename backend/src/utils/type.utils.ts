import { Paginated } from '@feathersjs/feathers';
import { Types } from 'mongoose';

export namespace TypeUtils {

    export function isPaginatedLike<T>(value: any): value is Paginated<T> {
        return value && value.hasOwnProperty('data') && Array.isArray(value.data);
    }

    export function isPaginated<T>(value: any): value is Paginated<T> {
        return isPaginatedLike(value)
            && value.hasOwnProperty('skip') && 'number' === typeof value.skip
            && value.hasOwnProperty('limit') && 'number' === typeof value.limit
            && value.hasOwnProperty('total') && 'number' === typeof value.total;
    }

    export function objectIdToString(objectOrId: string | any): string;
    export function objectIdToString<T, K extends string = '_id'>(objectOrId: T, idField: K): string;
    export function objectIdToString(objectOrId: object | string, idField = '_id'): string | null {
        const { ObjectId } = require('mongoose').mongo;

        let id = null;

        if (objectOrId instanceof ObjectId) {
            id = objectOrId.toString();
        } else if ('string' === typeof objectOrId) {
            id = objectOrId;
        } else if (objectOrId && 'object' === typeof objectOrId && objectOrId.hasOwnProperty(idField)) {
            id = objectIdToString((objectOrId as any)[idField]);
        }

        return id;
    }

    export function objectIdEquals(a: string | number | Types.ObjectId, b: string | number | Types.ObjectId): boolean {
        return objectIdToString(a) === objectIdToString(b);
    }
}
