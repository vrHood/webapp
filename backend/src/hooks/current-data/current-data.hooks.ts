import { Hook, HookContext } from '@feathersjs/feathers';
import { defaults as _defaults, get as _get } from 'lodash';

import { HookType } from '../../types/hook-type';
import { ServiceMethod } from '../../types/service-method';
import { DataUtils } from '../../utils/data.utils';
import { HookUtils } from '../../utils/hook.utils';

import { CurrentData, MultipleCurrentData } from './models/current-data.model';

export namespace CurrentDataHooks {
    export interface ILoadOptions {
        idField: string;
        forceLoad: boolean;
        contextProperty: string;
    }

    export interface IAddToResultOptions {
        idField: string;
        contextProperty: string;
        resultProperty: string;
    }

    export const DEFAULT_LOAD_OPTIONS: Partial<ILoadOptions> = {
        idField: '_id',
        forceLoad: false,
        contextProperty: 'currentData'
    };

    export const DEFAULT_ADD_TO_RESULT_OPTIONS: Partial<IAddToResultOptions> = {
        idField: '_id',
        contextProperty: 'currentData',
        resultProperty: '__previous'
    };

    export function load<T>(options?: Partial<ILoadOptions>): Hook {
        const safeOptions: ILoadOptions = _defaults(options, DEFAULT_LOAD_OPTIONS) as ILoadOptions;

        return async (context: HookContext<T>) => {
            HookUtils.restrictToType(context, HookType.BEFORE);
            HookUtils.restrictToMethod(context, ServiceMethod.UPDATE, ServiceMethod.PATCH, ServiceMethod.REMOVE);

            await HookUtils.getCurrentData(context, safeOptions, true);

            return context;
        };
    }

    export function addToResult<T>(options?: Partial<IAddToResultOptions>): Hook {
        const safeOptions: IAddToResultOptions = _defaults(options, DEFAULT_ADD_TO_RESULT_OPTIONS) as IAddToResultOptions;

        function addCurrentData(data: T, currentData?: T): T {
            return {
                ...data as unknown as object,
                [safeOptions.resultProperty]: currentData
            } as unknown as T;
        }

        return (context: HookContext<T>) => {

            HookUtils.restrictToType(context, HookType.AFTER);
            HookUtils.restrictToMethod(context, ServiceMethod.UPDATE, ServiceMethod.PATCH, ServiceMethod.REMOVE);

            const { id, result, dispatch } = context;

            if (id != null) {
                const currentData: CurrentData<T> = _get(context, safeOptions.contextProperty);

                if (dispatch != null) {
                    context.dispatch = addCurrentData(dispatch, currentData.originalValue);
                } else if (result != null) {
                    context.result = addCurrentData(result, currentData.originalValue);
                }
            } else {
                const currentData: MultipleCurrentData<T> = _get(context, safeOptions.contextProperty);

                if (dispatch != null) {
                    context.dispatch = DataUtils.map(dispatch, (value: T) => addCurrentData(value, currentData.get(value as T)));
                } else if (result != null) {
                    context.result = DataUtils.map(result, (value: T) => addCurrentData(value, currentData.get(value as T)));
                }
            }

            return context;
        };
    }
}
