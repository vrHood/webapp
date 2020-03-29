import { SelectValues } from '../types/select-values';
import { TranslateValues } from '../types/translate-values';

export enum OrderType {
    PHONE = 'phone',
    EMAIL = 'email',
    ONLINE_SHOP = 'onlineShop',
    SOCIAL_MEDIA = 'socialMedia',
    WHATS_APP = 'whatsApp',
    OTHER = 'other'
}

export const ORDER_TYPE_SELECT_VALUES: SelectValues<OrderType> = [
    { value: OrderType.PHONE, label: 'MODEL.ORDER_TYPE.VALUE.PHONE' },
    { value: OrderType.EMAIL, label: 'MODEL.ORDER_TYPE.VALUE.EMAIL' },
    { value: OrderType.ONLINE_SHOP, label: 'MODEL.ORDER_TYPE.VALUE.ONLINE_SHOP' },
    { value: OrderType.SOCIAL_MEDIA, label: 'MODEL.ORDER_TYPE.VALUE.SOCIAL_MEDIA' },
    { value: OrderType.WHATS_APP, label: 'MODEL.ORDER_TYPE.VALUE.WHATS_APP' },
    { value: OrderType.OTHER, label: 'MODEL.ORDER_TYPE.VALUE.OTHER' }
];

export const ORDER_TYPE_TRANSLATE_VALUES: TranslateValues<OrderType> = {
    [OrderType.PHONE]: 'MODEL.ORDER_TYPE.VALUE.PHONE',
    [OrderType.EMAIL]: 'MODEL.ORDER_TYPE.VALUE.EMAIL',
    [OrderType.ONLINE_SHOP]: 'MODEL.ORDER_TYPE.VALUE.ONLINE_SHOP',
    [OrderType.SOCIAL_MEDIA]: 'MODEL.ORDER_TYPE.VALUE.SOCIAL_MEDIA',
    [OrderType.WHATS_APP]: 'MODEL.ORDER_TYPE.VALUE.WHATS_APP',
    [OrderType.OTHER]: 'MODEL.ORDER_TYPE.VALUE.OTHER'
};
