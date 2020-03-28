import { Paginated } from '@feathersjs/feathers';
import { Observable } from 'rxjs';

import { DataService } from './data-service.class';

export class DataServiceAdapter<T> extends DataService<T> {

    constructor(private readonly _delegate: DataService<T>) {
        super();
    }

    get(id: string, params?: any): Observable<T> {
        return this._delegate.get(id, params);
    }

    find(params?: any): Observable<T[]> | Observable<Paginated<T>> {
        return this._delegate.find(params);
    }

    create(data: Partial<T>, params?: any): Promise<T>;
    create(data: Partial<T>[], params?: any): Promise<T[]>;
    create(data: Partial<T> | Partial<T>[], params?: any): any {
        return this._delegate.create(data as any, params);
    }

    update(id: string, data: T, params?: any): Promise<T>;
    update(id: null, data: T, params?: any): Promise<T[]>;
    update(id: string | null, data: T, params?: any): any {
        return this._delegate.update(id, data, params);
    }

    patch(id: string, data: Partial<T>, params?: any): Promise<T>;
    patch(id: null, data: Partial<T>, params?: any): Promise<T[]>;
    patch(id: string | null, data: Partial<T>, params?: any): any {
        return this._delegate.patch(id, data, params);
    }

    remove(id: string, params?: any): Promise<T>;
    remove(id: null, params?: any): Promise<T[]>;
    remove(id: string | null, params?: any): any {
        return this._delegate.remove(id, params);
    }

}
