import { Injectable, Injector, Type } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { get as _get } from 'lodash';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

import { DataService } from '../services/data/data-service.class';

interface EntityResolverOptions<T> {
    idField?: string;
    service: Type<DataService<T>>;
    params?: any;
}

const DEFAULT_ID_FIELD = 'params.id';

@Injectable({
    providedIn: 'root'
})
export class EntityResolver<T> implements Resolve<T> {

    constructor(private readonly _injector: Injector) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<T> | Promise<T> | T {
        const options: EntityResolverOptions<T> = route.data.entityResolver;

        const service = this._injector.get(options.service);

        if (!service) {
            throw new Error('No service found!');
        }

        return service.get(_get(route, options.idField || DEFAULT_ID_FIELD), options.params).pipe(first());
    }

}
