import { iff, iffElse, isNot, isProvider } from 'feathers-hooks-common';

import { AuthHooks } from '../../hooks/auth.hooks';
import { CommonHooks } from '../../hooks/common.hooks';
import { Provider } from '../../types/provider';
// Don't remove this comment. It's needed to format import lines nicely.

export default {
    before: {
        all: [
            AuthHooks.tryAuthenticate('jwt'),
            iff(
                isProvider(Provider.EXTERNAL),
                AuthHooks.checkPermissions()
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
                isProvider(Provider.EXTERNAL),
                AuthHooks.protectFields()
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
