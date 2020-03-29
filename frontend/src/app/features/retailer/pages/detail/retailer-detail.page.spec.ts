import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailerDetailPage } from './retailer-detail.page';

describe('RetailerDetailPage', () => {
    let component: RetailerDetailPage;
    let fixture: ComponentFixture<RetailerDetailPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ RetailerDetailPage ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RetailerDetailPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
