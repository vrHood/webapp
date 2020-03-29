import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailerRegistrationFormComponent } from './retailer-registration-form.component';

describe('RetailerRegistrationFormComponent', () => {
    let component: RetailerRegistrationFormComponent;
    let fixture: ComponentFixture<RetailerRegistrationFormComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RetailerRegistrationFormComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RetailerRegistrationFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
