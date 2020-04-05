import { HookContext, Params } from '@feathersjs/feathers';
import { SyncPredicateFn } from 'feathers-hooks-common';
import { defaults as _defaults, get as _get, has as _has, includes as _includes, set as _set } from 'lodash';
import { CurrentDataHooks } from '../hooks/current-data/current-data.hooks';
import { CurrentData, MultipleCurrentData } from '../hooks/current-data/models/current-data.model';

import { HookType } from '../types/hook-type';
import { ServiceMethod } from '../types/service-method';

export namespace HookUtils {

    export function restrictToMethod(context: HookContext, ...methods: ServiceMethod[]) {
        if (!context || !_includes(methods, context.method)) {
            throw new Error(`Hook not allowed for method ${context.method}`);
        }
    }

    export function restrictToType(context: HookContext, ...types: HookType[]) {
        if (!context || !_includes(types, context.type)) {
            throw new Error(`Hook not allowed for type ${context.type}`);
        }
    }

    export function isMethod<METHOD extends ServiceMethod>(context: HookContext,
                                                           method: METHOD): context is HookContext & { method: METHOD } {
        return context && method === context.method as ServiceMethod;
    }

    export function isAnyMethod(context: HookContext, ...methods: ServiceMethod[]): context is HookContext {
        return context && _includes(methods, context.method);
    }

    export function isType<TYPE extends HookType>(context: HookContext, type: TYPE): context is HookContext & { type: TYPE } {
        return context && context.type === type;
    }

    export function hasCurrentData(options?: Partial<CurrentDataHooks.ILoadOptions>): SyncPredicateFn {
        const safeOptions: CurrentDataHooks.ILoadOptions = _defaults(options, CurrentDataHooks.DEFAULT_LOAD_OPTIONS) as CurrentDataHooks.ILoadOptions;
        return (context: HookContext) => _has(context, safeOptions.contextProperty);
    }

    export async function getCurrentData<T>(context: HookContext<T>, options?: Partial<CurrentDataHooks.ILoadOptions>): Promise<T | T[]>;
    export async function getCurrentData<T>(context: HookContext<T>, options: CurrentDataHooks.ILoadOptions, optionsAreSafe: true): Promise<T | T[]>;
    export async function getCurrentData<T>(context: HookContext<T>, options?: Partial<CurrentDataHooks.ILoadOptions>, optionsAreSafe?: boolean): Promise<T | T[]> {
        const safeOptions: CurrentDataHooks.ILoadOptions = (optionsAreSafe ? options : _defaults(options, CurrentDataHooks.DEFAULT_LOAD_OPTIONS)) as CurrentDataHooks.ILoadOptions;

        if (!safeOptions.forceLoad && _has(context, safeOptions.contextProperty)) {
            const currentData = _get(context, safeOptions.contextProperty);

            if (currentData instanceof CurrentData) {
                return currentData.originalValue;
            }
        }

        const { id, params, service } = context;

        if (id != null) {
            const currentData = await service.get(id, params);

            _set(context, safeOptions.contextProperty, new CurrentData(currentData));
            return currentData;
        } else {
            const currentData: T[] = await service.find({
                ...params,
                paginate: false
            }) as T[];

            _set(context, safeOptions.contextProperty, new MultipleCurrentData(currentData, safeOptions.idField));
            return currentData;
        }
    }

}
