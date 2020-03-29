import { includes as _includes } from 'lodash';

import { UserRole } from '../models/user-role.model';
import { IUser } from '../models/user.model.i';

export namespace UserUtils {

    export function hasRole<ROLE extends UserRole>(user: IUser, role: ROLE): user is IUser & { role: ROLE } {
        return user != null && role === user.role;
    }

    export function hasAnyRole(user: IUser, roleOrArray: UserRole | UserRole[]): boolean {
        return user && (Array.isArray(roleOrArray) ? _includes(roleOrArray, user.role) : roleOrArray === user.role);
    }
}
