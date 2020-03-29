import { IBaseEntity } from './base-entity.model.i';

export interface IActivatableEntity extends IBaseEntity {
    active: boolean;
}
