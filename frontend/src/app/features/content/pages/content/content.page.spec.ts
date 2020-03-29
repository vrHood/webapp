import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentPage } from './content.page';

describe('ContentPage', () => {
    let component: ContentPage;
    let fixture: ComponentFixture<ContentPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ ContentPage ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ContentPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
