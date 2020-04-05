import { iff } from 'feathers-hooks-common';

import { AuthHooks } from '../../hooks/auth.hooks';
import { CommonHooks } from '../../hooks/common.hooks';
// Don't remove this comment. It's needed to format import lines nicely.

export default {
    before: {
        all: [],
        find: [
            AuthHooks.authenticate('jwt'),
            AuthHooks.checkPermissions()
        ],
        get: [
            AuthHooks.authenticate('jwt'),
            AuthHooks.checkPermissions()
        ],
        create: [
            AuthHooks.hashPassword('password'),
            // TODO: for now, we don't want an open registration!
            AuthHooks.authenticate('jwt'),
            AuthHooks.checkPermissions(),
            AuthHooks.checkDataPermissions()
        ],
        update: [
            AuthHooks.hashPassword('password'),
            AuthHooks.authenticate('jwt'),
            AuthHooks.checkPermissions(),
            AuthHooks.checkDataPermissions()
        ],
        patch: [
            AuthHooks.hashPassword('password'),
            AuthHooks.authenticate('jwt'),
            AuthHooks.checkPermissions(),
            AuthHooks.checkDataPermissions()
        ],
        remove: [
            AuthHooks.authenticate('jwt'),
            AuthHooks.checkPermissions()
        ]
    },

    after: {
        all: [
            // Make sure the password field is never sent to the client
            // Always must be the last hook
            CommonHooks.protect('password'),
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
