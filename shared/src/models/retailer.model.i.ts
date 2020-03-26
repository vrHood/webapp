import { IBaseEntity } from './base-entity.model.i';
import { ICategory } from './category.model.i';
import { IFileReference } from './file-reference.model.i';
import { ILocation } from './location.model.i';

export interface IRetailer extends IBaseEntity {
    name: string;
    location: ILocation;
    mainCategoryId: string;
    additionalCategoryIds: string[];
    tags?: string;
    email: string;
    phone: string;
    mobile: string;
    fax: string;
    website: string;
    facebook: string;
    instagram: string;
    youtube: string;
    offer: string;
    description: string;
    logo: IFileReference;
    introVideo: IFileReference;
}

export interface IPopulatedRetailer extends IRetailer {
    mainCategory?: ICategory;
    additionalCategories?: ICategory[];
}
