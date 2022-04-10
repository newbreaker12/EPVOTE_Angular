import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerUsersCreateComponent } from './manager-users-create.component';

describe('ManagerUsersCreateComponent', () => {
  let component: ManagerUsersCreateComponent;
  let fixture: ComponentFixture<ManagerUsersCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerUsersCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerUsersCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
