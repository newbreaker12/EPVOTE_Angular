import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerGroupCreateComponent } from './manager-group-create.component';

describe('ManagerGroupCreateComponent', () => {
  let component: ManagerGroupCreateComponent;
  let fixture: ComponentFixture<ManagerGroupCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerGroupCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerGroupCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
