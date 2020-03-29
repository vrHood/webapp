import { SelectValues } from '../types/select-values';
import { TranslateValues } from '../types/translate-values';

export enum PaymentType {
    INVOICE = 'invoice',
    PREPAYMENT = 'prepayment',
    DIRECT_TRANSFER = 'directTransfer',
    CREDIT_CARD = 'creditCard',
    PAY_PAL = 'payPal',
    GOOGLE_PAY = 'googlePay',
    APPLE_PAY = 'applePay',
    OTHER = 'other'
}
export const PAYMENT_TYPE_SELECT_VALUES: SelectValues<PaymentType> = [
    { value: PaymentType.INVOICE, label: 'MODEL.PAYMENT_TYPE.VALUE.INVOICE' },
    { value: PaymentType.PREPAYMENT, label: 'MODEL.PAYMENT_TYPE.VALUE.PREPAYMENT' },
    { value: PaymentType.DIRECT_TRANSFER, label: 'MODEL.PAYMENT_TYPE.VALUE.DIRECT_TRANSFER' },
    { value: PaymentType.CREDIT_CARD, label: 'MODEL.PAYMENT_TYPE.VALUE.CREDIT_CARD' },
    { value: PaymentType.PAY_PAL, label: 'MODEL.PAYMENT_TYPE.VALUE.PAY_PAL' },
    { value: PaymentType.GOOGLE_PAY, label: 'MODEL.PAYMENT_TYPE.VALUE.GOOGLE_PAY' },
    { value: PaymentType.APPLE_PAY, label: 'MODEL.PAYMENT_TYPE.VALUE.APPLE_PAY' },
    { value: PaymentType.OTHER, label: 'MODEL.PAYMENT_TYPE.VALUE.OTHER' }
];

export const PAYMENT_TYPE_TRANSLATE_VALUES: TranslateValues<PaymentType> = {
    [PaymentType.INVOICE]: 'MODEL.PAYMENT_TYPE.VALUE.INVOICE',
    [PaymentType.PREPAYMENT]: 'MODEL.PAYMENT_TYPE.VALUE.PREPAYMENT',
    [PaymentType.DIRECT_TRANSFER]: 'MODEL.PAYMENT_TYPE.VALUE.DIRECT_TRANSFER',
    [PaymentType.CREDIT_CARD]: 'MODEL.PAYMENT_TYPE.VALUE.CREDIT_CARD',
    [PaymentType.PAY_PAL]: 'MODEL.PAYMENT_TYPE.VALUE.PAY_PAL',
    [PaymentType.GOOGLE_PAY]: 'MODEL.PAYMENT_TYPE.VALUE.GOOGLE_PAY',
    [PaymentType.APPLE_PAY]: 'MODEL.PAYMENT_TYPE.VALUE.APPLE_PAY',
    [PaymentType.OTHER]: 'MODEL.PAYMENT_TYPE.VALUE.OTHER'
};
