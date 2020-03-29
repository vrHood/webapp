import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailerDeleteDialogComponent } from './retailer-delete-dialog.component';

describe('RetailerEditDialogComponent', () => {
    let component: RetailerDeleteDialogComponent;
    let fixture: ComponentFixture<RetailerDeleteDialogComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ RetailerDeleteDialogComponent ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RetailerDeleteDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
