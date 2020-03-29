import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailerEditDialogComponent } from './retailer-edit-dialog.component';

describe('RetailerEditDialogComponent', () => {
    let component: RetailerEditDialogComponent;
    let fixture: ComponentFixture<RetailerEditDialogComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ RetailerEditDialogComponent ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RetailerEditDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
