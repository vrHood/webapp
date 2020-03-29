import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveToggleComponent } from './active-toggle.component';

describe('ActiveToggleComponent', () => {
    let component: ActiveToggleComponent;
    let fixture: ComponentFixture<ActiveToggleComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ ActiveToggleComponent ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ActiveToggleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
