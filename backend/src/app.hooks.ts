// Application hooks that run for every service
// Don't remove this comment. It's needed to format import lines nicely.

import { errors } from '@feathersjs/errors';
import { HookContext } from './declarations';

export default {
    before: {
        all: [],
        find: [],
        get: [],
        create: [],
        update: [],
        patch: [],
        remove: []
    },

    after: {
        all: [],
        find: [],
        get: [],
        create: [],
        update: [],
        patch: [],
        remove: []
    },

    error: {
        all: [
            (context: HookContext) => {
                if(context.id) {
                    console.error(`[${context.path}] [${context.method}] [${context.id}] error:`, context.error)
                } else {
                    console.error(`[${context.path}] [${context.method}] error:`, context.error)
                }
            }
        ],
        find: [],
        get: [],
        create: [],
        update: [],
        patch: [],
        remove: []
    }
};
