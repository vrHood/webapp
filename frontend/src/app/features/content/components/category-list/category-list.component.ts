import { ChangeDetectionStrategy, Component, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { Paginated } from '@feathersjs/feathers';
import { Observable, Subject } from 'rxjs';
import { first, map } from 'rxjs/operators';

import { ICategory } from '../../../../../../../shared/lib/models/category.model.i';
import { CategoryService } from '../../../../services/category.service';

@Component({
    selector: 'app-category-list',
    templateUrl: './category-list.component.html',
    styleUrls: [ './category-list.component.scss' ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'app-category-list'
    }
})
export class CategoryListComponent implements OnInit {

    readonly categories$: Observable<ICategory[]>;

    allCategories: string[] = [];

    @Input()
    selectedCategories: string[] = [];

    @Output()
    selectedCategoriesChange = new Subject<string[]>();

    constructor(private readonly _categoryService: CategoryService) {
        this.categories$ = _categoryService.find({ query: { active: true } })
            .pipe(
                // @ts-ignore
                map((result: ICategory[] | Paginated<ICategory>) => {
                    return Array.isArray(result) ? result : result.data;
                })
            );

        this.categories$.pipe(
            first()
        ).subscribe((categories) => {
            this.allCategories = this.selectedCategories = categories.map((category) => category._id);
            this.selectedCategoriesChange.next(this.selectedCategories);
        });
    }

    ngOnInit(): void {

    }

    onCategoryClick(category: ICategory) {
        if (this.selectedCategories.includes(category._id) && this.selectedCategories.length === 1) {
            this.selectedCategories = [ ...this.allCategories ];
        } else {
            this.selectedCategories = [ category._id ];
        }

        /*if (this.selectedCategories.includes(category._id)) {
            this.selectedCategories = _without(this.selectedCategories, category._id);
        } else {
            this.selectedCategories = [ ...this.selectedCategories, category._id ];
        }*/

        console.log('ContentPage updateSelection =>', this.selectedCategories);
        this.selectedCategoriesChange.next(this.selectedCategories);
    }

}
