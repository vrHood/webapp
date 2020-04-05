import { TypeUtils } from '../../../utils/type.utils';

export class CurrentData<T> {

    constructor(readonly originalValue: T) {
        Object.freeze(this.originalValue);
    }
}

export class MultipleCurrentData<T> extends CurrentData<T[]> {

    private readonly _data: Map<string, T>;

    constructor(originalValue: T[], private readonly _idField: string = '_id') {
        super(originalValue);

        this._data = new Map<string, T>((originalValue || [])
            .map((value: T) => [ TypeUtils.objectIdToString(value, _idField), value ] as [ string, T ]));
    }

    get(id: T | string) {
        return this._data.get(TypeUtils.objectIdToString(id, this._idField));
    }
}
