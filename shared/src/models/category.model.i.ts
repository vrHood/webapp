import { IActivatableEntity } from './activatable-entity.model.i';

export interface ICategory extends IActivatableEntity {
    name: string;
    icon: string;
    color: string;
}
