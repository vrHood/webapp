import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { GoogleMap, MapInfoWindow } from '@angular/google-maps';
import { DomSanitizer } from '@angular/platform-browser';
import { Paginated } from '@feathersjs/feathers';
import { IPopulatedRetailer, IRetailer } from '@vrhood/shared';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { CategoryService } from '../../../../services/category.service';
import { RetailerService } from '../../../../services/retailer.service';
import { RetailerUtils } from '../../../../utils/retailer.utils';

import { MAP_STYLE } from './map-style';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: [ './map.component.scss' ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'app-map'
    }
})
export class MapComponent implements OnInit {

    @ViewChild(GoogleMap, { static: false })
    map: GoogleMap;

    @Output()
    retailerClick = new Subject<IRetailer>();

    @Output()
    mapClick = new Subject<google.maps.MouseEvent | google.maps.IconMouseEvent>();

    readonly mapOptions: google.maps.MapOptions = {
        styles: MAP_STYLE,
        center: new google.maps.LatLng(49.013432, 12.101624),
        zoom: 12,
        minZoom: 11,
        streetViewControl: false,
        fullscreenControl: false
    };

    readonly retailers$: Observable<IPopulatedRetailer[]>;

    private _selectedCategories: string[] = [];
    private _activeRetailer: IRetailer;

    constructor(retailerService: RetailerService,
                private readonly _categoryService: CategoryService,
                private readonly _changeDetector: ChangeDetectorRef,
                private readonly _sanitizer: DomSanitizer) {

        this.retailers$ = retailerService.find({
            query: {
                active: true,
                'location.latitude': { $ne: null },
                'location.longitude': { $ne: null },
                $client: {
                    fastJoin: {
                        mainCategory: [ true ]
                    }
                }
            }
        }).pipe(
            // @ts-ignore
            map((result: IRetailer[] | Paginated<IRetailer>) => {
                return Array.isArray(result) ? result : result.data as IRetailer[];
            })
        );
    }

    @Input()
    set activeRetailer(value: IRetailer) {
        console.log('MapComponent set activeRetailer', value);
        this._activeRetailer = value;

        if (this._activeRetailer != null) {
            this.map.panTo(this.getLatLng(this._activeRetailer));
        }

        this._changeDetector.detectChanges();
    }

    get activeRetailer(): IRetailer {
        return this._activeRetailer;
    }

    @Input()
    set selectedCategories(value: string[]) {
        console.log('MapComponent selectedCategories', value);
        this._selectedCategories = value || [];
        this._changeDetector.markForCheck();
    }

    get selectedCategories(): string[] {
        return this._selectedCategories;
    }

    ngOnInit() {

    }

    ngAfterViewInit() {
        this.map.mapTypeId = google.maps.MapTypeId.ROADMAP;
    }

    getMarkerOptions(retailer: IPopulatedRetailer): google.maps.MarkerOptions {
        const isActive = this._activeRetailer != null && this._activeRetailer._id === retailer._id;

        return {
            draggable: false,
            opacity: (isActive || RetailerUtils.hasAnyCategory(retailer, this.selectedCategories)) ? 1 : 0.5,
            label: {
                fontFamily: 'vrhood',
                text: retailer.mainCategory.icon,
                color: 'white',
                fontSize: isActive ? '1.875em' : '1.5em'
            },
            icon: {
                path: 'M17.8 49C17.8 49 34.6 33.2 34.6 17.8C34.6 8.49999 27.1 1 17.8 1C8.49999 1 1 8.49999 1 17.8C1 33.1 17.8 49 17.8 49Z',
                fillColor: retailer.mainCategory.color || 'black',
                fillOpacity: 1,
                strokeOpacity: 0,
                labelOrigin: new google.maps.Point(18, 20),
                anchor: new google.maps.Point(18, 50),
                scale: isActive ? 1 : 0.8
            }
            // TODO: use the pins once provided!
            // icon: retailer.mainCategory ? IconUtils.getIconUrl(retailer.mainCategory.icon as Icon) : null
        };
    }

    getLatLng(retailer: IRetailer): google.maps.LatLngLiteral {
        console.log('MapComponent getLatLng', retailer);
        if (!retailer || !retailer.location) {
            return null;
        }

        return { lat: retailer.location.latitude, lng: retailer.location.longitude };
    }

    onRetailerClick(retailer: IRetailer) {
        this.retailerClick.next(retailer);
    }

    onMapClick($event: google.maps.MouseEvent | google.maps.IconMouseEvent) {
        this.mapClick.next($event);
    }

}
