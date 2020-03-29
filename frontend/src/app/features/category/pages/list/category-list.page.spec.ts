import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryListPage } from './category-list.page';

describe('CategoryListPage', () => {
    let component: CategoryListPage;
    let fixture: ComponentFixture<CategoryListPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ CategoryListPage ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CategoryListPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
