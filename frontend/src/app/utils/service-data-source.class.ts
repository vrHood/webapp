import { CollectionViewer, DataSource, ListRange } from '@angular/cdk/collections';
import { ChangeDetectorRef } from '@angular/core';
import { Paginated } from '@feathersjs/feathers';
import { BehaviorSubject, Observable, of, Subject, Subscription } from 'rxjs';
import { pluck, share, shareReplay, startWith, switchMap, tap } from 'rxjs/operators';

import { DataService } from '../services/data/data-service.class';

// TODO WIP!
export class ServiceDataSource<T> extends DataSource<T> {

    public total: number;

    readonly total$: Observable<number>;

    private readonly _listRangeSubject = new Subject<ListRange>();
    private readonly _collectionViewerSubject = new Subject<CollectionViewer>();
    private readonly _listRange$: Observable<ListRange> = this._collectionViewerSubject.pipe(
        tap((collectionViewer) => console.log('ServiceDataSource collectionViewer', collectionViewer)),
        switchMap((collectionViewer) => collectionViewer.viewChange),
        tap((viewChange) => console.log('ServiceDataSource viewChange', viewChange)),
        shareReplay()
    );
    private readonly _stream$: Observable<Paginated<T>>;
    private readonly dataSubject = new BehaviorSubject<Paginated<T>>({
        skip: 0,
        limit: 0,
        total: 0,
        data: []
    });
    private _subscription: Subscription;

    constructor(private readonly _service: DataService<T>,
                private readonly _query$: Observable<any> = of({}),
                private readonly _changeDetector: ChangeDetectorRef) {
        super();

        this._stream$ = this._listRangeSubject.pipe(
            startWith({ start: 0, end: 10 }),
            switchMap((listRange) => {
                let query = null;

                if (!query) {
                    query = {};
                }

                return this._service.find({
                    query: {
                        ...query,
                        $skip: listRange.start,
                        $limit: listRange.end - listRange.start
                    }
                }) as Observable<Paginated<T>>;
            }),
            share()
        );

        this.total$ = this._stream$.pipe(pluck('total'));
    }

    connect(collectionViewer: CollectionViewer): Observable<T[]> {
        this._collectionViewerSubject.next(collectionViewer);
        if (!this._subscription) {
            this._subscription = this._stream$.subscribe(
                (next) => {
                    this.total = next ? next.total : 0;
                    this.dataSubject.next(next);
                    this._changeDetector.detectChanges();
                },
                (error) => {
                    this.dataSubject.error(error);
                },
                () => {
                    this.dataSubject.complete();
                }
            );
        }

        return this._stream$.pipe(
            pluck('data')
        );
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.dataSubject.complete();

        if (this._subscription != null) {
            this._subscription.unsubscribe();
        }
    }

    load(listRange: ListRange) {
        this._listRangeSubject.next(listRange);
    }

}
