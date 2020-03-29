import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailerRegistrationPage } from './retailer-registration.page';

describe('RetailerRegistrationComponent', () => {
    let component: RetailerRegistrationPage;
    let fixture: ComponentFixture<RetailerRegistrationPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RetailerRegistrationPage]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RetailerRegistrationPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
