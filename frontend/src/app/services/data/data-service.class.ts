import { Paginated } from '@feathersjs/feathers';
import { Observable } from 'rxjs';

export abstract class DataService<T> {

    abstract get(id: string, params?: any): Observable<T>;

    abstract find(params?: any): Observable<T[]> | Observable<Paginated<T>>;

    abstract create(data: Partial<T>, params?: any): Promise<T>;
    abstract create(data: Partial<T>[], params?: any): Promise<T[]>;

    abstract update(id: string, data: T, params?: any): Promise<T>;
    abstract update(id: null, data: T, params?: any): Promise<T[]>;

    abstract patch(id: string, data: Partial<T>, params?: any): Promise<T>;
    abstract patch(id: null, data: Partial<T>, params?: any): Promise<T[]>;

    abstract remove(id: string, params?: any): Promise<T>;
    abstract remove(id: null, params?: any): Promise<T[]>;
}
