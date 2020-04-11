import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorBadgeComponent } from './color-badge.component';

describe('ColorBadgeComponent', () => {
  let component: ColorBadgeComponent;
  let fixture: ComponentFixture<ColorBadgeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColorBadgeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
