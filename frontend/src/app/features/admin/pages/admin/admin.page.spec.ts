import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPage } from './admin.page';

describe('AdminComponent', () => {
  let component: AdminPage;
  let fixture: ComponentFixture<AdminPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
