import { IBaseEntity } from './base-entity.model.i';
import { UserRole } from './user-role.model';

export interface IUser extends IBaseEntity {
    email: string;
    password?: string;
    role: UserRole;
    retailerId?: string;
}
