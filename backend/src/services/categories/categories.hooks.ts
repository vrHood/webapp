import { iff, iffElse } from 'feathers-hooks-common';

import { AuthHooks } from '../../hooks/auth.hooks';
import { CommonHooks } from '../../hooks/common.hooks';
// Don't remove this comment. It's needed to format import lines nicely.

export default {
    before: {
        all: [
            AuthHooks.tryAuthenticate('jwt'),
            iffElse(
                AuthHooks.isAuthenticated(),
                [
                    AuthHooks.checkPermissions(),
                    AuthHooks.checkDataPermissions()
                ],
                CommonHooks.extendQuery({ active: true })
            )
        ],
        find: [],
        get: [],
        create: [ AuthHooks.requireAuthenticated() ],
        update: [ AuthHooks.requireAuthenticated() ],
        patch: [ AuthHooks.requireAuthenticated() ],
        remove: [ AuthHooks.requireAuthenticated() ]
    },

    after: {
        all: [
            iff(
                AuthHooks.isNotAuthenticated(),
                CommonHooks.protect('active')
            )
        ],
        find: [],
        get: [],
        create: [],
        update: [],
        patch: [],
        remove: []
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
