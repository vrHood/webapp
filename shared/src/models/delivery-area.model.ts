import { SelectValues } from '../types/select-values';
import { TranslateValues } from '../types/translate-values';

export enum DeliveryArea {
    CITY = 'city',
    COUNTY = 'country',
    NATIONAL = 'national',
    OTHER = 'other'
}

export const DELIVERY_AREA_SELECT_VALUES: SelectValues<DeliveryArea> = [
    { value: DeliveryArea.CITY, label: 'MODEL.DELIVERY_AREA.VALUE.CITY' },
    { value: DeliveryArea.COUNTY, label: 'MODEL.DELIVERY_AREA.VALUE.COUNTY' },
    { value: DeliveryArea.NATIONAL, label: 'MODEL.DELIVERY_AREA.VALUE.NATIONAL' },
    { value: DeliveryArea.OTHER, label: 'MODEL.DELIVERY_AREA.VALUE.OTHER' }
];

export const DELIVERY_AREA_TRANSLATE_VALUES: TranslateValues<DeliveryArea> = {
    [DeliveryArea.CITY]: 'MODEL.DELIVERY_AREA.VALUE.CITY',
    [DeliveryArea.COUNTY]: 'MODEL.DELIVERY_AREA.VALUE.COUNTY',
    [DeliveryArea.NATIONAL]: 'MODEL.DELIVERY_AREA.VALUE.NATIONAL',
    [DeliveryArea.OTHER]: 'MODEL.DELIVERY_AREA.VALUE.OTHER'
};
