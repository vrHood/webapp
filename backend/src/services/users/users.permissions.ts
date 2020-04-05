import { IUser, ServiceName, UserRole, UserUtils } from '@vrhood/shared';
import { without as _without } from 'lodash';

import { Application } from '../../declarations';
import { CanDsl } from '../../types/can-dsl';
import { PermissionAction, PermissionDataAction } from '../../types/permission-action';
import { DataUtils } from '../../utils/data.utils';
import { TypeUtils } from '../../utils/type.utils';

export function addUserPermissions(app: Application, activeUser: IUser, can: CanDsl) {
    const service = app.service(ServiceName.CATEGORIES);

    if (activeUser == null || !activeUser.active) {
        return;
    }

    const properties: string[] = Object.keys(service.Model.schema.paths);

    if (UserUtils.hasRole(activeUser, UserRole.ADMIN)) {
        can(PermissionAction.READ, ServiceName.USERS, _without(properties, 'password'));
        can(PermissionAction.CREATE, ServiceName.USERS);
        can(PermissionDataAction.CREATE_DATA, ServiceName.USERS);
        can(PermissionAction.CHANGE, ServiceName.USERS);
        can(PermissionDataAction.CHANGE_DATA, ServiceName.USERS);
        can(PermissionAction.REMOVE, ServiceName.USERS);
    } else if (UserUtils.hasRole(activeUser, UserRole.RETAILER)) {
        can(PermissionAction.READ, ServiceName.USERS, _without(properties, 'password', 'active'), {
            retailerId: TypeUtils.objectIdToString(activeUser.retailerId),
            active: true
        });
        can(PermissionAction.PATCH, ServiceName.USERS, _without(properties, '_id', 'retailerId', 'active'), { _id: TypeUtils.objectIdToString(activeUser._id) });
    }
}
