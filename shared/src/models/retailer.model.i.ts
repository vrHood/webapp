import { IActivatableEntity } from './activatable-entity.model.i';
import { ICategory } from './category.model.i';
import { DeliveryArea } from './delivery-area.model';
import { IFileReference } from './file-reference.model.i';
import { ILocation } from './location.model.i';
import { OrderType } from './order-type.model';
import { PaymentType } from './payment-type.model';

export interface IRetailer extends IActivatableEntity {
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
    orderTypes: OrderType[];
    otherOrderType?: string;
    paymentTypes: PaymentType[];
    otherPaymentType?: string;
    deliveryAreas: DeliveryArea[];
    otherDeliveryArea?: string;
    active: boolean;
}

export interface IPopulatedRetailer extends IRetailer {
    mainCategory?: ICategory;
    additionalCategories?: ICategory[];
}
