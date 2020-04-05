import { IUser, ServiceName, UserRole, UserUtils } from '@vrhood/shared';
import { without as _without } from 'lodash';

import { Application } from '../../declarations';
import { CanDsl } from '../../types/can-dsl';
import { PermissionAction } from '../../types/permission-action';

export function addCategoryPermissions(app: Application, activeUser: IUser, can: CanDsl) {
    const service = app.service(ServiceName.CATEGORIES);
    const properties: string[] = Object.keys(service.Model.schema.paths);

    if (activeUser != null && activeUser.active) {
        if (UserUtils.hasRole(activeUser, UserRole.ADMIN)) {
            can(PermissionAction.MANAGE, ServiceName.CATEGORIES);
            return;
        }
    }

    can(PermissionAction.READ, ServiceName.CATEGORIES, _without(properties, 'active'), { active: true });
}
