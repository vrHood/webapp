import { Application, Paginated, Service } from '@feathersjs/feathers';
import { IBaseEntity } from '@vrhood/shared';
import { remove as _remove, omit as _omit } from 'lodash';
import { fromEvent, merge, Observable, of } from 'rxjs';
import { fromPromise } from 'rxjs/internal-compatibility';
import { filter, map, mergeMap, scan, shareReplay, startWith, switchMap, takeUntil } from 'rxjs/operators';
import sift from 'sift';

import { DataService } from './data-service.class';

const TOP_LEVEL_OPERATORS = [ '$skip', '$limit', '$client' ];

enum EventType {
    CREATED = 'created',
    CHANGED = 'changed',
    REMOVED = 'removed'
}

interface Event<T> {
    type: EventType;
    data: T;
}

export class FeathersDataService<T extends IBaseEntity> extends DataService<T> {

    private readonly _service: Service<T>;

    constructor(private readonly _app: Application, private readonly _path: string) {
        super();
        this._service = _app.service(_path);
    }

    get(id: string, params?: any): Observable<T> {
        const filterQuery = params && params.query ? sift(_omit(params.query, TOP_LEVEL_OPERATORS)) : (() => true);

        function filterData(data: T): boolean {
            if (!data || id !== id) {
                return false;
            }

            return filterQuery(data);
        }

        const changed$ = merge(
            fromEvent(this._service, 'updated'),
            fromEvent(this._service, 'patched')
        )
            .pipe(filter(filterData));

        const removed$ = fromEvent(this._service, 'removed')
            .pipe(filter(filterData));

        return merge(fromPromise(this._service.get(id, params)), changed$)
            .pipe(
                takeUntil(removed$),
                shareReplay(1)
            );
    }

    find(params?: any): Observable<T[]> | Observable<Paginated<T>> {

        const filterQuery = params && params.query ? sift(_omit(params.query, TOP_LEVEL_OPERATORS)) : (() => true);

        function unPack(data: T | T[]): Observable<T> {
            if (Array.isArray(data)) {
                return of(...data);
            }

            return of(data);
        }

        function filterData(data: T): boolean {
            if (!data) {
                return false;
            }

            return filterQuery(data);
        }

        const changed$: Observable<Event<T>> = merge(
            fromEvent(this._service, 'updated'),
            fromEvent(this._service, 'patched')
        )
            .pipe(
                mergeMap(unPack),
                filter(filterData),
                map((data: T) => ({ type: EventType.CHANGED, data }))
            );

        const created$: Observable<Event<T>> = fromEvent(this._service, 'created')
            .pipe(
                mergeMap(unPack),
                filter(filterData),
                map((data: T) => ({ type: EventType.CREATED, data }))
            );

        const removed$: Observable<Event<T>> = fromEvent(this._service, 'removed')
            .pipe(
                mergeMap(unPack),
                filter(filterData),
                map((data: T) => ({ type: EventType.REMOVED, data }))
            );

        const events$ = merge(changed$, created$, removed$);

        return merge(fromPromise(this._service.find(params)), events$)
            .pipe(
                switchMap((result: T[] | Paginated<T>) => {
                    if (Array.isArray(result)) {
                        return events$.pipe(
                            scan((result: T[], next: Event<T>) => this._applyEvent(result, next), result),
                            startWith(result)
                        );
                    }

                    return events$.pipe(
                        scan((acc: Paginated<T>, next: Event<T>) => {
                            const data = this._applyEvent(acc.data, next);

                            switch (next.type) {
                                case EventType.CREATED:
                                    return {
                                        ...acc,
                                        data,
                                        total: acc.total + 1
                                    };
                                case EventType.CHANGED:
                                    return {
                                        ...acc,
                                        data
                                    };
                                case EventType.REMOVED:
                                    return {
                                        ...acc,
                                        data,
                                        total: acc.total - 1
                                    };
                            }

                            return acc;
                        }, result),
                        startWith(result)
                    );
                })
            ) as Observable<T[]> | Observable<Paginated<T>>;
    }

    create(data: Partial<T>, params?: any): Promise<T>;
    create(data: Partial<T>[], params?: any): Promise<T[]>;
    create(data: Partial<T> | Partial<T>[], params?: any): any {
        return this._service.create(data, params);
    }

    update(id: string, data: T, params?: any): Promise<T>;
    update(id: null, data: T, params?: any): Promise<T[]>;
    update(id: string | null, data: T, params?: any): any {
        return this._service.update(id, data, params);
    }

    patch(id: string, data: Partial<T>, params?: any): Promise<T>;
    patch(id: null, data: Partial<T>, params?: any): Promise<T[]>;
    patch(id: string | null, data: Partial<T>, params?: any): any {
        return this._service.patch(id, data, params);
    }

    remove(id: string, params?: any): Promise<T>;
    remove(id: null, params?: any): Promise<T[]>;
    remove(id: string | null, params?: any): any {
        return this._service.remove(id, params);
    }

    private _applyEvent(array: T[], event: Event<T>): T[] {
        switch (event.type) {
            case EventType.CREATED:
                return [ event.data, ...array ];
            case EventType.CHANGED:
                const index = array.findIndex((element: T) => element._id === event.data._id);
                const cloned1 = [ ...array ];
                cloned1[index] = event.data;
                return cloned1;
            case EventType.REMOVED:
                const cloned2 = [ ...array ];
                _remove(cloned2, (element: T) => element._id === event.data._id);
                return cloned2;
        }
    }

}
