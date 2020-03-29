import { IActivatableEntity } from './activatable-entity.model.i';
import { UserRole } from './user-role.model';

export interface IUser extends IActivatableEntity {
    firstName?: string;
    lastName?: string;
    email: string;
    password?: string;
    role: UserRole;
    retailerId?: string;
}
