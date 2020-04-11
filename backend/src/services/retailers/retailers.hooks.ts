import { iff, isProvider, paramsFromClient } from 'feathers-hooks-common';
import { get as _get } from 'lodash';

import { AuthHooks } from '../../hooks/auth.hooks';
import { Provider } from '../../types/provider';

import { RetailerHooks } from './hooks/retailer-hooks';
// Don't remove this comment. It's needed to format import lines nicely.

export default {
    before: {
        all: [
            AuthHooks.tryAuthenticate('jwt'),
            iff(
                isProvider(Provider.EXTERNAL),
                (context) => console.log(`${context.type} ${context.method}, ${context.path} query before permissions`, context.params.query),
                AuthHooks.checkPermissions(),
                (context) => console.log(`${context.type} ${context.method}, ${context.path} query after permissions`, context.params.query)
            ),
            paramsFromClient('fastJoin')
        ],
        find: [],
        get: [],
        create: [ AuthHooks.requireAuthenticated() ],
        update: [ AuthHooks.requireAuthenticated() ],
        patch: [ AuthHooks.requireAuthenticated() ],
        remove: [ AuthHooks.requireAuthenticated() ]
    },

    after: {
        all: [],
        find: [
            RetailerHooks.fastJoin((context) => {
                return _get(context, 'params.fastJoin', {
                    mainCategory: [ true ]
                })
            }),
            iff(
                isProvider(Provider.EXTERNAL),
                AuthHooks.protectFields()
            )
        ],
        get: [
            RetailerHooks.fastJoin((context) => {
                return _get(context, 'params.fastJoin', {
                    mainCategory: [ true ],
                    additionalCategories: [ [ true ] ]
                })
            }),
            iff(
                isProvider(Provider.EXTERNAL),
                AuthHooks.protectFields()
            )
        ],
        create: [
            RetailerHooks.fastJoin((context) => {
                return _get(context, 'params.fastJoin', {
                    mainCategory: [ true ]
                })
            }),
            iff(
                isProvider(Provider.EXTERNAL),
                AuthHooks.protectFields()
            )
        ],
        update: [

            RetailerHooks.fastJoin((context) => {
                return _get(context, 'params.fastJoin', {
                    mainCategory: [ true ]
                })
            }),
            iff(
                isProvider(Provider.EXTERNAL),
                AuthHooks.protectFields()
            )
        ],
        patch: [

            RetailerHooks.fastJoin((context) => {
                return _get(context, 'params.fastJoin', {
                    mainCategory: [ true ]
                })
            }),
            iff(
                isProvider(Provider.EXTERNAL),
                AuthHooks.protectFields()
            )
        ],
        remove: [
            iff(
                isProvider(Provider.EXTERNAL),
                AuthHooks.protectFields()
            )
        ]
    },

    error: {
        all: [],
        find: [],
        get: [],
        create: [],
        update: [],
        patch: [],
        remove: []
    }
};
