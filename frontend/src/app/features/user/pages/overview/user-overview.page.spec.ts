import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserOverviewPage } from './user-overview.page';

describe('UserOverviewPage', () => {
    let component: UserOverviewPage;
    let fixture: ComponentFixture<UserOverviewPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ UserOverviewPage ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UserOverviewPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
