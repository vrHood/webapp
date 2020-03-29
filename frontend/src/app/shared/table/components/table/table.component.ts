import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    Input,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import { Observable } from 'rxjs';

import { DataService } from '../../../../services/data/data-service.class';
import { ServiceDataSource } from '../../../../utils/service-data-source.class';

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: [ './table.component.scss' ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'app-table'
    }
})
export class TableComponent<T = any> implements OnInit, AfterViewInit {

    readonly defaultPageSize = 10;
    readonly defaultPageIndex = 0;

    @ContentChild(MatTable)
    table: MatTable<T>;

    @Input()
    dataSource: ServiceDataSource<T>;

    @Input()
    query: Observable<any>;

    @Input()
    displayedColumns: string[];

    constructor(private readonly _changeDetector: ChangeDetectorRef) {

    }

    @Input()
    set service(value: DataService<T>) {
        this.dataSource = new ServiceDataSource(value, this.query, this._changeDetector);

        if (this.table) {
            this.table.dataSource = this.dataSource;
        }

        this._changeDetector.detectChanges();
    }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
        if (this.table) {
            this.table.dataSource = this.dataSource;
        }

        this.onPageChanged({
            pageIndex: this.defaultPageIndex,
            pageSize: this.defaultPageSize,
            length: 0,
            previousPageIndex: 0
        });
    }

    onPageChanged($event: PageEvent) {
        const start = $event.pageIndex * $event.pageSize;
        const end = start + $event.pageSize;

        this.dataSource.load({ start, end });
    }
}
