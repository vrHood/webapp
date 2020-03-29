import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailerOverviewPage } from './retailer-overview.page';

describe('RetailerOverviewPage', () => {
    let component: RetailerOverviewPage;
    let fixture: ComponentFixture<RetailerOverviewPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ RetailerOverviewPage ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RetailerOverviewPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
