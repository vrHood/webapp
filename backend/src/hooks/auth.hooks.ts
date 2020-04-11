import { Ability } from '@casl/ability';
import { permittedFieldsOf } from '@casl/ability/extra';
import { authenticate as feathersAuthenticate } from '@feathersjs/authentication';
import * as local from '@feathersjs/authentication-local';
import { HashPasswordOptions } from '@feathersjs/authentication-local/lib/hooks/hash-password';
import { AuthenticateHookSettings } from '@feathersjs/authentication/src/hooks/authenticate';
import { Forbidden } from '@feathersjs/errors';
import { Hook, HookContext } from '@feathersjs/feathers';
import { UserRole, UserUtils } from '@vrhood/shared';
import { iff, combine, SyncPredicateFn, isNot, isProvider, every } from 'feathers-hooks-common';
import { get as _get } from 'lodash';

import { IActiveUser } from '../declarations';
import { HookType } from '../types/hook-type';
import { PermissionAction } from '../types/permission-action';
import { ServiceMethod } from '../types/service-method';
import { DataUtils } from '../utils/data.utils';
import { HookUtils } from '../utils/hook.utils';
import { PermissionUtils } from '../utils/permission.utils';
import { QueryUtils } from '../utils/query.utils';
import { CommonHooks } from './common.hooks';

export namespace AuthHooks {

    export function authenticate(originalSettings: string | AuthenticateHookSettings, ...originalStrategies: string[]) {
        return feathersAuthenticate(originalSettings, ...originalStrategies);
    }

    export function tryAuthenticate(originalSettings: string | AuthenticateHookSettings, ...originalStrategies: string[]) {
        return async (context: HookContext) => {

            try {
                return await feathersAuthenticate(originalSettings, ...originalStrategies)(context);
            } catch (e) {
                return context;
            }
        };
    }

    export function hashPassword(field: string, options?: HashPasswordOptions): Hook {
        return local.hooks.hashPassword(field, options);
    }

    export function hasAnyRole(...roles: UserRole[]): SyncPredicateFn {
        return (context: HookContext) => {
            const { params } = context;
            const { user } = params;

            return user && UserUtils.hasAnyRole(user, roles);
        };
    }

    export function notHasRole(...roles: UserRole[]): SyncPredicateFn {
        return (context: HookContext) => {
            const { params } = context;
            const { user } = params;

            return !user || !UserUtils.hasAnyRole(user, roles);
        };
    }

    export function requireRole(...roles: UserRole[]): Hook {
        return iff(
            notHasRole(...roles),
            AuthHooks.forbidden()
        );
    }

    export function isAuthenticated(): SyncPredicateFn {
        return (context: HookContext) => {
            const { params } = context;

            return params && params.authenticated && params.user != null;
        }
    }

    export function isNotAuthenticated(): SyncPredicateFn {
        return (context: HookContext) => {
            const { params } = context;

            return !params || !params.authenticated || params.user == null;
        }
    }

    export function requireAuthenticated() {
        return iff(
            every(
                isProvider('external'),
                isNotAuthenticated()
            ),
            () => {
                throw new Forbidden('Not authenticated!');
            }
        )
    }

    export function checkPermissions(throwIfNoUser: boolean = false): Hook {
        return (context: HookContext) => {
            const { data, method, params, path } = context;

            if (!params.provider) {
                return;
            }

            const activeUser: IActiveUser = params.user;

            if (!activeUser && throwIfNoUser) {
                throw new Forbidden('You do not have the correct permissions');
            }

            const ability: Ability = PermissionUtils.getAbility(context);

            if (!ability || !ability.can(method, path)) {
                throw new Forbidden('You do not have the correct permissions');
            }

            if (ServiceMethod.CREATE === method) {
                if (!DataUtils.isValid(data, PermissionUtils.toQuery(ability, method, path))) {
                    throw new Forbidden('You do not have the correct permissions');
                }
            } else {
                params.query = QueryUtils.mergeQueries(params.query, PermissionUtils.toQuery(ability, method, path));
            }
        };
    }

    export function checkDataPermissions(throwIfNoUser: boolean = false): Hook {
        return (context: HookContext) => {
            HookUtils.restrictToType(context, HookType.BEFORE);

            if (!HookUtils.isAnyMethod(context, ServiceMethod.CREATE, ServiceMethod.UPDATE, ServiceMethod.PATCH)) {
                return;
            }

            const { data, method, params, path } = context;

            if (!params.provider) {
                return;
            }

            const activeUser: IActiveUser = params.user;

            if (!activeUser && throwIfNoUser) {
                throw new Forbidden('You do not have the correct permissions');
            }

            const ability: Ability = PermissionUtils.getAbility(context);

            const action = `${method}.data`;

            if (!ability || !ability.can(action, path)) {
                throw new Forbidden('You do not have the correct permissions');
            }

            if (!DataUtils.isValid(data, PermissionUtils.toQuery(ability, method, path))) {
                throw new Forbidden('You do not have the correct permissions');
            }
        };
    }

    export function protectFields(): Hook {
        return (context: HookContext) => {
            const { id, service, path } = context;

            // assuming the service is a mongoose service!!
            const properties = service.fields || Object.keys(_get(service, 'Model.schema.paths'));

            if (!properties) {
                return;
            }

            const ability = PermissionUtils.getAbility(context);

            const action = id ? PermissionAction.GET : PermissionAction.FIND;
            return CommonHooks.protectAllBut(...permittedFieldsOf(ability, action, path, {
                fieldsFrom: (rule) => {
                    console.log('AuthHooks.protectFields', { id, path, ruleFields: rule.fields, properties });
                    return rule.fields || properties || [];
                }
            }))(context);
        };
    }

    export function forbidden(): Hook {
        return () => {
            throw new Forbidden('Method not allowed!');
        };
    }
}
