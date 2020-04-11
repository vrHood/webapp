import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailerInfoComponent } from './retailer-info.component';

describe('RetailerInfoComponent', () => {
  let component: RetailerInfoComponent;
  let fixture: ComponentFixture<RetailerInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetailerInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetailerInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
