import { IUser, ServiceName, UserRole, UserUtils } from '@vrhood/shared';
import { without as _without } from 'lodash';

import { Application } from '../../declarations';
import { CanDsl } from '../../types/can-dsl';
import { PermissionAction } from '../../types/permission-action';
import { TypeUtils } from '../../utils/type.utils';

export function addRetailerPermissions(app: Application, activeUser: IUser, can: CanDsl): void {
    const service = app.service(ServiceName.RETAILERS);
    const properties: string[] = service.fields;

    if (activeUser != null && activeUser.active) {
        if (UserUtils.hasRole(activeUser, UserRole.ADMIN)) {
            can(PermissionAction.MANAGE, ServiceName.RETAILERS);
            return;
        } else if (UserUtils.hasRole(activeUser, UserRole.RETAILER)) {
            can(PermissionAction.PATCH, ServiceName.RETAILERS, _without(properties, '_id', 'active'), {
                _id: TypeUtils.objectIdToString(activeUser.retailerId),
                active: true
            });
        }
    }

    can(PermissionAction.READ, ServiceName.RETAILERS, _without(properties, 'active'), { active: true });
}
