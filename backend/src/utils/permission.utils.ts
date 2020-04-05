import { Ability, AbilityBuilder, Rule } from '@casl/ability';
import { rulesToQuery } from '@casl/ability/extra';
import { HookContext } from '@feathersjs/feathers';
import { RealTimeConnection } from '@feathersjs/transport-commons/lib/channels/channel/base';
import { IUser } from '@vrhood/shared';

import { Application } from '../declarations';
import { addCategoryPermissions } from '../services/categories/categories.permissions';
import { addRetailerPermissions } from '../services/retailers/retailers.permissions';
import { addUserPermissions } from '../services/users/users.permissions';
import { CanDsl } from '../types/can-dsl';
import { PermissionAction, PermissionDataAction } from '../types/permission-action';

Ability.addAlias(PermissionAction.READ, [ PermissionAction.FIND, PermissionAction.GET ]);
Ability.addAlias(PermissionAction.CHANGE, [ PermissionAction.UPDATE, PermissionAction.PATCH ]);

Ability.addAlias(PermissionDataAction.MANAGE_DATA, [ PermissionDataAction.CREATE_DATA, PermissionDataAction.UPDATE_DATA, PermissionDataAction.PATCH_DATA ]);
Ability.addAlias(PermissionDataAction.CHANGE_DATA, [ PermissionDataAction.UPDATE_DATA, PermissionDataAction.PATCH_DATA ]);

export namespace PermissionUtils {

    function convertToQuery(rule: Rule) {
        return rule.inverted ? { $nor: [ rule.conditions ] } : rule.conditions;
    }

    export function toQuery(ability: Ability, action: string, subject: any) {
        return rulesToQuery(ability, action, subject, convertToQuery);
    }

    export function getAbility(context: HookContext): Ability {
        const { app, params } = context;
        const user: IUser = params.user;
        const connection = params.connection;

        if (connection) {
            if (!connection._ability) {
                return connection._ability = createAbility(app as Application, user);
            }

            return connection._ability;
        }

        return createAbility(app as Application, user);
    }

    export function updateAbility(app: Application, connection: RealTimeConnection) {
        if (!connection) {
            return;
        }

        connection._ability = createAbility(app, connection.user);
    }

    export function removeAbility(connection: RealTimeConnection) {
        if (!connection) {
            return;
        }

        delete connection._ability;
    }

    export function createAbility(app: Application, activeUser: IUser): Ability | null {
        return AbilityBuilder.define((can: CanDsl) => {
            addCategoryPermissions(app, activeUser, can);
            addRetailerPermissions(app, activeUser, can);
            addUserPermissions(app, activeUser, can);
        });
    }

}
