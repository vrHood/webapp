import { coerceBooleanProperty } from '@angular/cdk/coercion';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    HostBinding,
    Input,
    OnDestroy,
    OnInit,
    Output,
    ViewEncapsulation
} from '@angular/core';
import { TinyColor } from '@ctrl/tinycolor';
import { ICategory } from '@vrhood/shared';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { shareReplay, switchAll, takeUntil } from 'rxjs/operators';

import { CategoryService } from '../../../../services/category.service';

@Component({
    selector: 'app-category-list-item',
    templateUrl: './category-list-item.component.html',
    styleUrls: [ './category-list-item.component.scss' ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'app-category-list-item'
    }
})
export class CategoryListItemComponent implements OnInit, OnDestroy {

    resolvedCategory: ICategory;

    readonly category$: Observable<ICategory>;

    @Output()
    readonly selectedChange = new Subject<boolean>();

    private _selected: boolean = false;
    private _categoryStreamSubject = new BehaviorSubject<Observable<ICategory>>(of(null));
    private _onDestroy = new Subject();

    constructor(private readonly _categoryService: CategoryService, private readonly _changeDetector: ChangeDetectorRef) {
        this.category$ = this._categoryStreamSubject.pipe(
            switchAll(),
            shareReplay(),
            takeUntil(this._onDestroy)
        );

        this.category$.subscribe((category) => {
            this.resolvedCategory = category;
            _changeDetector.markForCheck();
        });
    }

    @Input()
    set selected(value: boolean) {
        const oldSelected = this._selected;
        this._selected = coerceBooleanProperty(value);

        if (oldSelected !== this._selected) {
            this.selectedChange.next(this._selected);
        }
    }

    get selected(): boolean {
        return this._selected;
    }

    @Input()
    set category(category: string | ICategory) {
        this._categoryStreamSubject.next('string' === typeof category ? this._categoryService.get(category) : of(category));
    }

    @HostBinding('style.--badge-color')
    get badgeColor(): string {
        if (!this._selected) {
            return 'white';
        }

        return this.resolvedCategory ? this.resolvedCategory.color : '';
    }

    @HostBinding('style.--badge-contrast-color')
    get badgeContrastColor(): string {
        if (!this._selected) {
            return this.resolvedCategory ? this.resolvedCategory.color : '';
        }

        return this.getContrastColor(this.resolvedCategory ? this.resolvedCategory.color : null);
    }

    ngOnInit() {

    }

    ngOnDestroy() {
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    getContrastColor(color: string): string {
        return (!color || new TinyColor(color).isLight()) ? 'rgba(0, 0, 0, 0.87)' : 'white';
    }

}
