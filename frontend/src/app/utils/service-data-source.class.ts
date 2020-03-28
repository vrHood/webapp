import { CollectionViewer, DataSource, ListRange } from '@angular/cdk/collections';
import { ChangeDetectorRef } from '@angular/core';
import { Paginated } from '@feathersjs/feathers';
import { BehaviorSubject, Observable, of, Subject, Subscription } from 'rxjs';
import { map, multicast, shareReplay, startWith, switchMap, tap } from 'rxjs/operators';

import { DataService } from '../services/data/data-service.class';

export class ServiceDataSource<T> extends DataSource<T> {

    private readonly _collectionViewerSubject = new Subject<CollectionViewer>();
    private readonly _listRange$: Observable<ListRange> = this._collectionViewerSubject.pipe(
        tap((collectionViewer) => console.log('ServiceDataSource collectionViewer', collectionViewer)),
        switchMap((collectionViewer) => collectionViewer.viewChange),
        tap((collectionViewer) => console.log('ServiceDataSource viewChange', viewChange)),
        shareReplay()
    );

    private readonly _stream$: Observable<Paginated<T>>;

    private readonly dataSubject = new BehaviorSubject<Paginated<T>>({
        skip: 0,
        limit: 0,
        total: 0,
        data: []
    });

    public total: number;
    readonly total$: Observable<number>;

    private _subscription: Subscription;

    constructor(private readonly _service: DataService<T>,
                private readonly _query$: Observable<any> = of({}),
                private readonly _changeDetector: ChangeDetectorRef) {
        super();

        this._stream$ = this._listRange$.pipe(
            startWith({ start: 0, end: 10 }),
            switchMap((listRange) => {
                let query = null;
                console.log('ServiceDataSource _stream$', { listRange, query });
                if (!query) {
                    query = {};
                }

                return this._service.find({
                    query: {
                        ...query,
                        $skip: listRange.start,
                        $limit: listRange.end - listRange.start
                    }
                });
            })
        );

        this.total$ = this.dataSubject.pipe((result) => result ? result.total : 0);
    }

    connect(collectionViewer: CollectionViewer): Observable<T[]> {
        console.log('ServiceDataSource connect', collectionViewer);
        this._collectionViewerSubject.next(collectionViewer);
        if (!this._subscription) {
            console.log('ServiceDataSource subscribe');
            this._subscription = this._stream$.subscribe(
                (next) => {
                    console.log('ServiceDataSource next', next);
                    this.total = next ? next.total : 0;
                    this.dataSubject.next(next);
                    this._changeDetector.detectChanges();
                },
                (error) => {
                    console.log('ServiceDataSource error', error);
                    this.dataSubject.error(error);
                },
                () => {
                    console.log('ServiceDataSource complete');
                    this.dataSubject.complete();
                }
            );
        }

        return this.dataSubject.pipe(
            map((result: T[] | Paginated<T>) => {
                console.log('ServiceDataSource result', result);
                if (Array.isArray(result)) {
                    return result;
                } else if (result && result.hasOwnProperty('data') && Array.isArray(result.data)) {
                    return result.data;
                }

                return [];
            })
        );
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.dataSubject.complete();

        if (this._subscription != null) {
            this._subscription.unsubscribe();
        }
    }

}
