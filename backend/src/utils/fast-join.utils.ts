import BatchLoader from '@feathers-plus/batch-loader';
import { HookContext } from '@feathersjs/feathers';
import { ServiceName } from '@vrhood/shared';
import { makeCallingParams} from 'feathers-hooks-common';
import { uniq as _uniq } from 'lodash';

export namespace FastJoinUtils {

    export function createLoader<T>(context: HookContext<T>, serviceName: ServiceName): BatchLoader<any, any, HookContext<T>> {
        const service = context.app.service(serviceName);

        return BatchLoader.loaderFactory(service, '_id', false)(context);

        /*return new BatchLoader<string, T, HookContext>(async (keys, context) => {
            console.log('FastJoinUtils.createLoader keys:', keys);

            const result = await service.find(
                makeCallingParams(context, { _id: { $in: _uniq(keys) } }, undefined, {
                    paginate: false
                })
            );

            console.log('FastJoinUtils.createLoader result:', keys, result);
            return BatchLoader.getResultsByKey(keys, result, user => user.id, '') as unknown as T[];
        });*/
    }

}
