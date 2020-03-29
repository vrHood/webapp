export interface SelectValue<T> {
    value: T;
    label: string;
    hint?: string;
}

export type SelectValues<T> = SelectValue<T>[];
