import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerGroupsComponent } from './manager-groups.component';

describe('ManagerGroupsComponent', () => {
  let component: ManagerGroupsComponent;
  let fixture: ComponentFixture<ManagerGroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerGroupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
