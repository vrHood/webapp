import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailPage } from './user-detail.page';

describe('RetailerDetailComponent', () => {
    let component: UserDetailPage;
    let fixture: ComponentFixture<UserDetailPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ UserDetailPage ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UserDetailPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
