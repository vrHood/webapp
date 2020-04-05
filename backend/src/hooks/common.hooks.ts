import { Hook, HookContext } from '@feathersjs/feathers';
import { AsyncContextFunction, AsyncPredicateFn, PredicateFn, SyncContextFunction, SyncPredicateFn } from 'feathers-hooks-common';
import { get as _get, isFunction as _isFunction, omit as _omit, set as _set } from 'lodash';
import sift from 'sift';

import { WritableKeys } from '../types/common-types';
import { DataUtils } from '../utils/data.utils';
import { QueryUtils } from '../utils/query.utils';

export namespace CommonHooks {

    /**
     * Compares the param at path to a value.
     * @param path
     * @param valueOrFn
     */
    export function checkParam(path: string, valueOrFn: any | ((param: any) => boolean | Promise<boolean>)): PredicateFn {
        return (context: HookContext) => {
            if (_isFunction(valueOrFn)) {
                return valueOrFn(_get(context.params, path));
            }

            return _get(context.params, path) === valueOrFn;
        };
    }

    /**
     * Gets the param at path from the context.
     * @param path
     * @param transformFn
     */
    export function getParam<T>(path: string, transformFn?: (param: any) => T | Promise<T>):
        T extends boolean ? PredicateFn : SyncContextFunction<T> | AsyncContextFunction<T>;
    export function getParam<T>(path: string, transformFn?: (param: any) => T | Promise<T>): SyncContextFunction<T | Promise<T>> {
        return (context: HookContext) => {
            if (_isFunction(transformFn)) {
                return transformFn(_get(context.params, path)) as T | Promise<T>;
            }

            return _get(context.params, path) as T;
        };
    }

    /**
     * Checks whether the param at path exists. Accepts an optional function to check for existence
     * @param path
     * @param existsFn
     */
    export function exists(path: string, existsFn?: ((param: any) => boolean | Promise<boolean>)): AsyncPredicateFn {
        return async (context: HookContext) => {
            if (_isFunction(existsFn)) {
                return existsFn(_get(context.params, path));
            }

            return _get(context.params, path) != null;
        };
    }

    /**
     * Omits fields from a certain context property, e.g. 'data' or 'result'
     * @param property
     * @param fields
     */
    export function omit(property: WritableKeys<HookContext>, ...fields: string[]): Hook {

        return (context: HookContext) => {
            const data = context[property];

            if (!data) {
                return context;
            }

            context[property] = DataUtils.map(data, DataUtils.omitFactory(...fields));

            return context;
        };
    }

    /**
     * Picks fields from a certain context property, e.g. 'data' or 'result'
     * @param property
     * @param fields
     */
    export function pick(property: WritableKeys<HookContext>, ...fields: string[]): Hook {

        return (context: HookContext) => {
            const data = context[property];

            if (!data) {
                return context;
            }

            context[property] = DataUtils.map(data, DataUtils.pickFactory(...fields));

            return context;
        };
    }

    /**
     * Omits fields from the 'dispatch' or 'result' property and sets the transformed object to 'dispatch'
     * (also to 'result' for external calls)
     * An optional param 'copyProtectedDataIntoResult' may be passed in the params to always
     * @param fields
     */
    export function protect(...fields: string[]): Hook {

        return (context: HookContext) => {
            const result = context.dispatch || context.result;

            if (!result) {
                return context;
            }

            context.dispatch = DataUtils.map(result, DataUtils.omitFactory(...fields));

            if (context.params && context.params.provider || context.params.copyProtectedDataIntoResult) {
                context.result = context.dispatch;
            }

            return context;
        };
    }

    /**
     * Omits fields from the 'dispatch' or 'result' property and sets the transformed object to 'dispatch'
     * (also to 'result' for external calls)
     * An optional param 'copyProtectedDataIntoResult' may be passed in the params to always
     * @param fields
     */
    export function protectAllBut(...fields: string[]): Hook {

        return (context: HookContext) => {
            const result = context.dispatch || context.result;

            if (!result) {
                return context;
            }

            context.dispatch = DataUtils.map(result, DataUtils.pickFactory(...fields));

            if (context.params && context.params.provider || context.params.copyProtectedDataIntoResult) {
                context.result = context.dispatch;
            }

            return context;
        };
    }

    /**
     * Matches the value stored in the context at the specified path against a query
     * @param path the path of the value to match against the query
     * @param queryOrFn the query or a function returning a query
     */
    export function matches(path: string, queryOrFn: any | ((context: HookContext) => any)): SyncPredicateFn {
        return (context: HookContext) => {
            const data = _get(context, path);

            const query = _isFunction(queryOrFn) ? queryOrFn(context) : queryOrFn;
            const matcher = sift(query);

            return matcher(data);
        };
    }

    export function extendQuery(query: any): Hook {
        return (context: HookContext) => {
            _set(context, 'params.query', QueryUtils.mergeQueries(_get(context, 'params.query'), query));

            return context;
        }
    }

}
