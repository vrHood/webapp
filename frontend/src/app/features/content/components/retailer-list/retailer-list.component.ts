import { Component, OnInit } from '@angular/core';
import { Paginated } from '@feathersjs/feathers';
import { IRetailer } from '@vrhood/shared';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { RetailerService } from '../../../../services/retailer.service';

@Component({
    selector: 'app-retailer-list',
    templateUrl: './retailer-list.component.html',
    styleUrls: [ './retailer-list.component.scss' ]
})
export class RetailerListComponent implements OnInit {

    readonly retailers$: Observable<IRetailer[]>;

    constructor(private readonly _retailerService: RetailerService) {
        this.retailers$ = _retailerService.find({ query: { active: true } })
            .pipe(
                // @ts-ignore
                map((result: IRetailer[] | Paginated<IRetailer>) => {
                    return Array.isArray(result) ? result : result.data;
                })
            );
    }

    ngOnInit(): void {
    }

}
