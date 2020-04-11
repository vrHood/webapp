import { coerceBooleanProperty } from '@angular/cdk/coercion';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    HostBinding,
    Input,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import { ICategory } from '@vrhood/shared';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { shareReplay, switchAll, takeUntil } from 'rxjs/operators';

import { CategoryService } from '../../services/category.service';

@Component({
    selector: 'app-category-badge',
    templateUrl: './category-badge.component.html',
    styleUrls: [ './category-badge.component.scss' ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'app-category-badge'
    }
})
export class CategoryBadgeComponent implements OnInit, OnDestroy {

    resolvedCategory: ICategory;

    readonly category$: Observable<ICategory>;

    private _iconOnly: boolean;
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
    @HostBinding('class.app-category-badge--icon-only')
    set iconOnly(value: boolean) {
        this._iconOnly = coerceBooleanProperty(value);
        this._changeDetector.detectChanges();
    }

    get iconOnly(): boolean {
        return this._iconOnly;
    }

    @Input()
    set category(category: string | ICategory) {
        this._categoryStreamSubject.next('string' === typeof category ? this._categoryService.get(category) : of(category));
    }

    @HostBinding('style.--badge-color')
    get badgeColor(): string {
        return this.resolvedCategory ? this.resolvedCategory.color : '';
    }

    ngOnInit() {

    }

    ngOnDestroy() {
        this._onDestroy.next();
        this._onDestroy.complete();
    }

}
