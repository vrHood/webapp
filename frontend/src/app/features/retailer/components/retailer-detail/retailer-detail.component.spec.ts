import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailerDetailComponent } from './retailer-detail.component';

describe('RetailerDetailComponent', () => {
  let component: RetailerDetailComponent;
  let fixture: ComponentFixture<RetailerDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetailerDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetailerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
