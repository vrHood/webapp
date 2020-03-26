import { IBaseEntity } from './base-entity.model.i';

export interface ICategory extends IBaseEntity {
    name: string;
    icon: string;
    color: string;
}
